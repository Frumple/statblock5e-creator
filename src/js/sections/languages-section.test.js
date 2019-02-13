import LanguagesSection from '/src/js/sections/languages-section.js';
import SectionTestMixin from '/src/js/helpers/test/section-test-mixin.js';

import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';
import defineBuiltinCustomElements from '/src/js/helpers/test/define-builtin-custom-elements.js';
import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';

let languagesSection;

beforeAll(async() => {
  defineBuiltinCustomElements();
  await LanguagesSection.define();
});

beforeEach(() => {
  languagesSection = new LanguagesSection();
  copyObjectProperties(languagesSection, SectionTestMixin);
  languagesSection.initializeCustomElements();
  languagesSection.forceConnect();
});

afterEach(() => {
  document.clear();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    languagesSection.showElements.section.click(); 
  });

  it('should switch to edit mode and focus on the text field', () => {
    expect(languagesSection).toBeInMode('edit');
    expect(languagesSection.editElements.input).toHaveFocus();
  });

  describe('and the input field is set, the add button is clicked, and the save button is clicked', () => {
    it('should add a suggested item, and the show section is updated', () => {
      const itemText = 'Deep Speech';
      inputValueAndTriggerEvent(languagesSection.editElements.input, itemText);
      languagesSection.editElements.addButton.click();

      expect(languagesSection.editElements.list.itemsAsText).toEqual(['Common', itemText]);

      languagesSection.editElements.saveAction.click();

      expect(languagesSection).toBeInMode('show');
      expect(languagesSection.showElements.text).toHaveTextContent(`Common, ${itemText}`);
    });

    it('should add a custom item, and the show section is updated', () => {
      const itemText = 'Riojan';
      inputValueAndTriggerEvent(languagesSection.editElements.input, itemText);      
      languagesSection.editElements.addButton.click();

      expect(languagesSection.editElements.list.itemsAsText).toEqual(['Common', itemText]);

      languagesSection.editElements.saveAction.click();

      expect(languagesSection).toBeInMode('show');
      expect(languagesSection.showElements.text).toHaveTextContent(`Common, ${itemText}`);
    });

    it('should add many items, and the show section is updated', () => {
      const itemTexts = ['Undercommon', 'Swahili', 'Thieves\' Cant', 'English'];

      for (const itemText of itemTexts) {
        inputValueAndTriggerEvent(languagesSection.editElements.input, itemText);      
        languagesSection.editElements.addButton.click();
      }

      expect(languagesSection.editElements.list.itemsAsText).toEqual(['Common', ...itemTexts]);

      languagesSection.editElements.saveAction.click();

      expect(languagesSection).toBeInMode('show');
      expect(languagesSection.showElements.text).toHaveTextContent(`Common, ${itemTexts.join(', ')}`);
    });

    it('should display an error after clicking the add button if the input field is blank', () => {
      inputValueAndTriggerEvent(languagesSection.editElements.input, '');

      languagesSection.editElements.addButton.click();

      expect(languagesSection).toHaveSingleError(
        languagesSection.editElements.input,
        'Cannot add a blank item.');
    });

    it('should display an error after clicking the add button if there is already a duplicate item in the list', () => {
      const itemText = 'Common';
      inputValueAndTriggerEvent(languagesSection.editElements.input, itemText);

      languagesSection.editElements.addButton.click();

      expect(languagesSection).toHaveSingleError(
        languagesSection.editElements.input,
        'Cannot add a duplicate item.');
    });
  });

  describe('and a suggested item is added, and then removed', () => {
    it('should remove the item from the list of suggestions, and then re-add the item', () => {
      const itemText = 'Abyssal';
      inputValueAndTriggerEvent(languagesSection.editElements.input, itemText);

      languagesSection.editElements.addButton.click();

      let datalist = languagesSection.editElements.datalist;
      let option = datalist.findOption(itemText);
      expect(option).toHaveAttribute('disabled');

      let item = languagesSection.editElements.list.findItem(itemText);
      item.remove();

      expect(option).not.toHaveAttribute('disabled');
    });
  });

  describe('and the only remaining item is removed, and the save button is clicked', () => {
    it('should remove the item, and the show section should show a "—" character indicating no items', () => {
      let item = languagesSection.editElements.list.findItem('Common');
      item.remove();
      
      expect(languagesSection.editElements.list.itemsAsText).toHaveLength(0);

      languagesSection.editElements.saveAction.click();

      expect(languagesSection).toBeInMode('show');
      expect(languagesSection.showElements.text).toHaveTextContent('—');
    });
  });

  describe('and the only remaining item is removed, a custom item is added, and the save button is clicked', () => {
    it('should remove the item, add the new item, and the show section should be updated', () => {
      const itemText = 'understands all languages it knew in life but can\'t speak';
      let item = languagesSection.editElements.list.findItem('Common');
      item.remove();

      inputValueAndTriggerEvent(languagesSection.editElements.input, itemText);      
      languagesSection.editElements.addButton.click();

      expect(languagesSection.editElements.list.itemsAsText).toEqual([itemText]);
      
      languagesSection.editElements.saveAction.click();

      expect(languagesSection).toBeInMode('show');
      expect(languagesSection.showElements.text).toHaveTextContent(`${itemText}`);
    });
  });

  describe('and 3 items are in the list, one of the items is deleted, and the save button is clicked', () => {
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
        inputValueAndTriggerEvent(languagesSection.editElements.input, 'Elvish');
        languagesSection.editElements.addButton.click();
  
        inputValueAndTriggerEvent(languagesSection.editElements.input, 'Orc');
        languagesSection.editElements.addButton.click();

        let item = languagesSection.editElements.list.findItem(itemToDelete);
        item.remove();

        expect(languagesSection.editElements.list.itemsAsText).toEqual(expectedItems);

        languagesSection.editElements.saveAction.click();

        expect(languagesSection).toBeInMode('show');
        expect(languagesSection.showElements.text).toHaveTextContent(expectedItems.join(', '));
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and 3 items are in the list, one of the items is reordered, and the save button is clicked', () => {
    describe('should show the items in correct order depending on which item was moved to what position', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                         | fromIndex | toIndex | expectedItems
        ${'1st item moved to 2nd position'} | ${0}      | ${1}    | ${['Halfling', 'Common', 'Fullling']}
        ${'1st item moved to 3rd position'} | ${0}      | ${2}    | ${['Halfling', 'Fullling', 'Common']}
        ${'2nd item moved to 1st position'} | ${1}      | ${0}    | ${['Halfling', 'Common', 'Fullling']}
        ${'2nd item moved to 3rd position'} | ${1}      | ${2}    | ${['Common', 'Fullling', 'Halfling']}
        ${'3rd item moved to 1st position'} | ${2}      | ${0}    | ${['Fullling', 'Common', 'Halfling']}
        ${'3rd item moved to 2nd position'} | ${2}      | ${1}    | ${['Common', 'Fullling', 'Halfling']}
      `
      ('$description: {fromIndex="$fromIndex", toIndex="$toIndex"} => $expectedItems',
      ({fromIndex, toIndex, expectedItems}) => {
        inputValueAndTriggerEvent(languagesSection.editElements.input, 'Halfling');
        languagesSection.editElements.addButton.click();

        inputValueAndTriggerEvent(languagesSection.editElements.input, 'Fullling');
        languagesSection.editElements.addButton.click();

        languagesSection.editElements.list.moveItem(fromIndex, toIndex);

        expect(languagesSection.editElements.list.itemsAsText).toEqual(expectedItems);

        languagesSection.editElements.saveAction.click();

        expect(languagesSection).toBeInMode('show');
        expect(languagesSection.showElements.text).toHaveTextContent(expectedItems.join(', '));
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});