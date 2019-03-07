import LanguagesSection from './languages-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import * as sharedSpecs from './property-list-section.specs.js';

const expectedItemType = 'Language';

let languagesSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await LanguagesSection.define();
});

beforeEach(() => {
  languagesSection = new LanguagesSection();
  TestCustomElements.initializeSection(languagesSection);
  languagesSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    languagesSection.showElements.section.click();

    let item = languagesSection.editElements.propertyList.findItem('Common');
    item.remove();
  });

  it('should switch to edit mode and focus on the text field', () => {
    expect(languagesSection).toBeInMode('edit');
    expect(languagesSection.editElements.input).toHaveFocus();
  });

  describe('and the input field is set, the add button is clicked, and the edit section is submitted', () => {
    it('should add a suggested item, and the show section should have the item', () => {
      const itemText = 'Deep Speech';
      sharedSpecs.shouldAddASuggestedItem(languagesSection, itemText);
    });

    it('should add a custom item, and the show section should have the item', () => {
      const itemText = 'understands all languages it knew in life but can\'t speak';
      sharedSpecs.shouldAddACustomItem(languagesSection, itemText);
    });

    it('should add many items, and the show section should have the items', () => {
      const itemTexts = ['Undercommon', 'Swahili', 'Thieves\' Cant', 'English'];
      sharedSpecs.shouldAddManyItems(languagesSection, itemTexts);
    });

    it('should display an error after clicking the add button if the input field is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfAddingBlank(languagesSection, expectedItemType);
    });

    it('should display an error after clicking the add button if there is already a duplicate item in the list', () => {
      const itemText = 'Common';
      sharedSpecs.shouldDisplayAnErrorIfAddingDuplicate(languagesSection, itemText, expectedItemType);
    });

    it('should display an error after clicking the save button if the input field is not blank', () => {
      const itemText = 'unconscious';
      sharedSpecs.shouldDisplayAnErrorIfSavingWithUnaddedInputText(languagesSection, itemText, expectedItemType);
    });
  });

  describe('and a suggested item is added, and then removed', () => {
    it('should remove the item from the list of suggestions, and then re-add the item', () => {
      const itemText = 'Abyssal';
      sharedSpecs.shouldRemoveAndAddSuggestions(languagesSection, itemText);
    });
  });

  describe('and the only remaining item is removed, and the edit section is submitted', () => {
    it('should remove the item, and the show languagesSection should show a "—" character indicating no items', () => {
      expect(languagesSection.editElements.propertyList.itemsAsText).toHaveLength(0);

      languagesSection.editElements.submitForm();

      expect(languagesSection).toBeInMode('show');
      expect(languagesSection.showElements.text).toHaveTextContent('—');
    });
  });

  describe('and 3 items are in the list, one of the items is deleted, and the edit section is submitted', () => {
    describe('should show the remaining items depending on which item was deleted', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description           | itemToDelete | expectedItems
        ${'1st item deleted'} | ${'Common'}  | ${['Elvish', 'Orc']}
        ${'2nd item deleted'} | ${'Elvish'}  | ${['Common', 'Orc']}
        ${'3rd item deleted'} | ${'Orc'}     | ${['Common', 'Elvish']}
      `
      ('$description: $itemToDelete => $expectedItems',
      ({itemToDelete, expectedItems}) => {
        const initialItems = ['Common', 'Elvish', 'Orc'];
        sharedSpecs.shouldDeleteOneOfThreeItems(languagesSection, initialItems, itemToDelete, expectedItems);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});