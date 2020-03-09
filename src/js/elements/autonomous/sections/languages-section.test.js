import LanguagesSection from './languages-section.js';
import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './property-list-section.specs.js';

const headingName = 'Languages';
const expectedBlockType = 'Language';
const defaultStartingLanguage = 'Common';

const languagesModel = CurrentContext.creature.languages;

let languagesSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await LanguagesSection.define();
});

beforeEach(() => {
  languagesModel.reset();

  languagesSection = new LanguagesSection();
  TestCustomElements.initializeSection(languagesSection);
  languagesSection.connect();
});

it('show section should have default values', () => {
  sharedSpecs.showSectionShouldHaveDefaultValues(languagesSection, headingName, defaultStartingLanguage);
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    languagesSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    sharedSpecs.editSectionShouldHaveDefaultValues(languagesSection, [defaultStartingLanguage]);
  });

  it('should switch to edit mode and focus on the text field', () => {
    expect(languagesSection).toBeInMode('edit');
    expect(languagesSection.editElements.input).toHaveFocus();
    expect(languagesSection.editElements.input).toBeSelected();
  });

  describe('and the default "Common" language is removed, allowing these specs to run starting with no languages', () => {
    beforeEach(() => {
      const item = languagesSection.editElements.propertyList.findItem(defaultStartingLanguage);
      item.remove();
    });

    describe('and the input field is set, the add button is clicked, and the edit section is submitted', () => {
      it('should add a suggested item, and the show section should have the item', () => {
        const itemText = 'Deep Speech';
        sharedSpecs.shouldAddAnItem(languagesSection, languagesModel, headingName, itemText);
      });

      it('should add a custom item, and the show section should have the item', () => {
        const itemText = 'understands all languages it knew in life but can\'t speak';
        sharedSpecs.shouldAddAnItem(languagesSection, languagesModel, headingName, itemText);
      });

      it('should add many items, and the show section should have the items', () => {
        const itemTexts = ['Undercommon', 'Swahili', 'Thieves\' Cant', 'English'];
        const expectedText = 'Undercommon, Swahili, Thieves\' Cant, English';
        sharedSpecs.shouldAddManyItems(languagesSection, languagesModel, headingName, itemTexts, expectedText);
      });

      describe('should add item that contains commas, and if there are other items before or after this item, semicolon separators instead of commas should be shown', () => {
        /* eslint-disable indent, no-unexpected-multiline */
        it.each
        `
          description                                    | itemTexts                               | expectedText
          ${'comma item only'}                           | ${['A, B']}                             | ${'A, B'}
          ${'items before comma item'}                   | ${['1', '2', 'A, B']}                   | ${'1, 2; A, B'}
          ${'items after comma item'}                    | ${['A, B', '3', '4']}                   | ${'A, B; 3, 4'}
          ${'items before and after comma item'}         | ${['1', '2', 'A, B', '3', '4']}         | ${'1, 2; A, B; 3, 4'}
          ${'two comma items adjacent to each other'}    | ${['1', '2', 'A, B', 'C, D', '3', '4']} | ${'1, 2; A, B; C, D; 3, 4'}
          ${'two comma items separated from each other'} | ${['1', '2', 'A, B', '3', '4', 'C, D']} | ${'1, 2; A, B; 3, 4; C, D'}
        `
        ('$description: $itemTexts => $expectedText',
        ({itemTexts, expectedText}) => {
          sharedSpecs.shouldAddManyItems(languagesSection, languagesModel, headingName, itemTexts, expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      it('should display an error after clicking the add button if the input field is blank', () => {
        sharedSpecs.shouldDisplayAnErrorIfAddingBlank(languagesSection, expectedBlockType);
      });

      it('should display an error after clicking the add button if there is already a duplicate item in the list', () => {
        const itemText = 'Common';
        sharedSpecs.shouldDisplayAnErrorIfAddingDuplicate(languagesSection, itemText, expectedBlockType);
      });

      it('should display an error after clicking the save button if the input field is not blank', () => {
        const itemText = 'unconscious';
        sharedSpecs.shouldDisplayAnErrorIfSavingWithUnaddedInputText(languagesSection, itemText, expectedBlockType);
      });
    });

    describe('and a suggested item is added, and then removed', () => {
      it('should remove the item from the list of suggestions, and then re-add the item', () => {
        const itemText = 'Abyssal';
        sharedSpecs.shouldRemoveAndAddSuggestions(languagesSection, itemText);
      });
    });

    describe('and the only remaining item is removed, and the edit section is submitted', () => {
      it('should remove the item, and the show section should show a "—" character indicating no items', () => {
        const expectedItems = [];
        const expectedText = '—';

        expect(languagesSection.editElements.propertyList.itemsAsText).toStrictEqual(expectedItems);

        languagesSection.editElements.submitForm();

        expect(languagesModel.items).toStrictEqual(expectedItems);
        expect(languagesSection).toBeInMode('show');
        expect(languagesSection).toShowPropertyLine(headingName, expectedText);

        const json = sharedSpecs.verifyJsonExport(languagesSection, expectedItems);
        expect(languagesSection).toExportPropertyLineToHtml(headingName, expectedText);
        expect(languagesSection).toExportPropertyLineToMarkdown(headingName, expectedText);

        reset();
        languagesSection.importFromJson(json);

        expect(languagesModel.items).toStrictEqual(expectedItems);
        expect(languagesSection.editElements.propertyList.itemsAsText).toStrictEqual(expectedItems);
        expect(languagesSection).toShowPropertyLine(headingName, expectedText);
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
          sharedSpecs.shouldDeleteOneOfManyItems(languagesSection, languagesModel, headingName, initialItems, itemToDelete, expectedItems);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });
    });
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with items is imported from JSON', () => {
    it('should show the new items', () => {
      const itemsToImport = ['Giant'];
      sharedSpecs.shouldShowItemsImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(languagesSection, headingName, itemsToImport);
    });
  });
});

function reset() {
  languagesModel.reset();
  languagesSection.updateView();
}