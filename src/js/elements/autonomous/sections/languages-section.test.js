import LanguagesSection from './languages-section.js';
import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import PropertyListSectionSpecs from './property-list-section.specs.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const headingName = 'Languages';
const expectedBlockType = 'Language';
const open5eJsonKey = 'languages';
const defaultStartingLanguage = 'any one language (usually Common)';

const languagesModel = CurrentContext.creature.languages;

let languagesSection;
let sharedSpecs;

beforeAll(async() => {
  await TestCustomElements.define();
  await LanguagesSection.define();
});

beforeEach(() => {
  languagesModel.reset();

  languagesSection = new LanguagesSection();
  document.body.appendChild(languagesSection);

  sharedSpecs = new PropertyListSectionSpecs(languagesSection, languagesModel, headingName, open5eJsonKey);
});

it('show section should have default values', () => {
  sharedSpecs.showSectionShouldHaveDefaultValues(defaultStartingLanguage);
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    languagesSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    sharedSpecs.editSectionShouldHaveDefaultValues([defaultStartingLanguage]);
  });

  it('should switch to edit mode and focus on the text field', () => {
    expect(languagesSection).toBeInMode('edit');
    expect(languagesSection.editElements.propertyList.input).toHaveFocus();
    expect(languagesSection.editElements.propertyList.input).toBeSelected();
  });

  describe('and the default "Common" language is removed, allowing these specs to run starting with no languages', () => {
    beforeEach(() => {
      const item = languagesSection.editElements.propertyList.findItem(defaultStartingLanguage);
      item.remove();
    });

    describe('and the input field is set, the add button is clicked, and the edit section is submitted', () => {
      it('should add a suggested item, and the show section should have the item', () => {
        const itemTexts = ['Deep Speech'];

        shouldAddItems(itemTexts, null, itemTexts[0]);
      });

      it('should add a custom item, and the show section should have the item', () => {
        const itemTexts = ['understands all languages it knew in life but can\'t speak'];

        shouldAddItems(itemTexts, null, itemTexts[0]);
      });

      it('should add many items, and the show section should have the items', () => {
        const itemTexts = ['Undercommon', 'Swahili', 'Thieves\' Cant', 'English'];
        const expectedText = 'Undercommon, Swahili, Thieves\' Cant, English';

        shouldAddItems(itemTexts, null, expectedText);
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
          shouldAddItems(itemTexts, null, expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });

      describe('and telepathy is set', () => {
        it('and no items are added, and the show section should only show telepathy', () => {
          const itemTexts = [];
          const telepathy = 30;
          const expectedText = 'telepathy 30 ft.';

          shouldAddItems(itemTexts, telepathy, expectedText);
        });

        it('and a single item is added, and the show section should have the item and telepathy', () => {
          const itemTexts = ['Celestial'];
          const telepathy = 45;
          const expectedText = 'Celestial, telepathy 45 ft.';

          shouldAddItems(itemTexts, telepathy, expectedText);
        });

        it('and multiple items are added, and the show section should have the items and telepathy', () => {
          const itemTexts = ['Celestial', 'Infernal', 'Draconic'];
          const telepathy = 20;
          const expectedText = 'Celestial, Infernal, Draconic, telepathy 20 ft.';

          shouldAddItems(itemTexts, telepathy, expectedText);
        });
      });

      it('should display an error after clicking the add button if the input field is blank', () => {
        sharedSpecs.shouldDisplayAnErrorIfAddingBlank(expectedBlockType);
      });

      it('should display an error after clicking the add button if there is already a duplicate item in the list', () => {
        const itemText = 'Common';
        sharedSpecs.shouldDisplayAnErrorIfAddingDuplicate(itemText, expectedBlockType);
      });

      it('should display an error after clicking the save button if the input field is not blank', () => {
        const itemText = 'Dwarvish';
        sharedSpecs.shouldDisplayAnErrorIfSavingWithUnaddedInputText(itemText, expectedBlockType);
      });
    });

    describe('and a suggested item is added, and then removed', () => {
      it('should remove the item from the list of suggestions, and then re-add the item', () => {
        const itemText = 'Abyssal';
        sharedSpecs.shouldRemoveAndAddSuggestions(itemText);
      });
    });

    describe('and the only remaining item is removed, and the edit section is submitted', () => {
      it('should remove the item, and the show section should show a "—" character indicating no items', () => {
        const expectedItems = [];
        const expectedTelepathy = null;
        const expectedText = '—';

        verifyEditModeView(expectedItems, expectedTelepathy);

        languagesSection.editElements.submitForm();

        expect(languagesSection).toBeInMode('show');

        verifyModel(expectedItems, expectedTelepathy);
        verifyShowModeView(expectedText, expectedTelepathy);

        const json = verifyJsonExport(expectedItems, expectedTelepathy);
        expect(languagesSection).toExportPropertyLineToHtml(headingName, expectedText);
        expect(languagesSection).toExportPropertyLineToMarkdown(headingName, expectedText);

        reset();
        languagesSection.importFromJson(json);

        verifyModel(expectedItems, expectedTelepathy);
        verifyEditModeView(expectedItems, expectedTelepathy);
        verifyShowModeView(expectedText);
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
          const expectedTelepathy = null;
          const expectedText = expectedItems.join(', ');

          for (const item of initialItems) {
            inputValueAndTriggerEvent(languagesSection.editElements.propertyList.input, item);
            languagesSection.editElements.propertyList.addButton.click();
          }

          const item = languagesSection.editElements.propertyList.findItem(itemToDelete);
          item.remove();

          verifyEditModeView(expectedItems, expectedTelepathy);

          languagesSection.editElements.submitForm();

          expect(languagesSection).toBeInMode('show');

          verifyModel(expectedItems, expectedTelepathy);
          verifyShowModeView(expectedText);

          const json = verifyJsonExport(expectedItems, expectedTelepathy);
          expect(languagesSection).toExportPropertyLineToHtml(headingName, expectedText);
          expect(languagesSection).toExportPropertyLineToMarkdown(headingName, expectedText);

          reset();
          languagesSection.importFromJson(json);

          verifyModel(expectedItems, expectedTelepathy);
          verifyEditModeView(expectedItems, expectedTelepathy);
          verifyShowModeView(expectedText);
        });
        /* eslint-enable indent, no-unexpected-multiline */
      });
    });
  });
});

describe('when import from Open5e', () => {
  describe('should import as normal', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                                              | inputText                                                                                         | expectedItems                                                                          | expectedTelepathy | expectedText
      ${'no items'}                                            | ${''}                                                                                             | ${[]}                                                                                  | ${null}           | ${'—'}
      ${'single simple item'}                                  | ${'Deep Speech'}                                                                                  | ${['Deep Speech']}                                                                     | ${null}           | ${'Deep Speech'}
      ${'multiple simple items'}                               | ${'Undercommon, Swahili, Thieves\' Cant'}                                                         | ${['Undercommon', 'Swahili', 'Thieves\' Cant']}                                        | ${null}           | ${'Undercommon, Swahili, Thieves\' Cant'}
      ${'understands ... but'}                                 | ${'understands Infernal but can\'t speak'}                                                        | ${['understands Infernal but can\'t speak']}                                           | ${null}           | ${'understands Infernal but can\'t speak'}
      ${'understands ... but (includes commas)'}               | ${'Giant Owl, understands Common, Elvish, Sylvan but can\'t speak'}                               | ${['Giant Owl', 'understands Common, Elvish, Sylvan but can\'t speak']}                | ${null}           | ${'Giant Owl; understands Common, Elvish, Sylvan but can\'t speak'}
      ${'understands ... but (includes commas and telepathy)'} | ${'understands Abyssal, Celestial, Infernal, and Primordial but can\'t speak, telepathy 120 ft.'} | ${['understands Abyssal, Celestial, Infernal, and Primordial but can\'t speak']}       | ${120}            | ${'understands Abyssal, Celestial, Infernal, and Primordial but can\'t speak, telepathy 120 ft.'}
      ${'telepathy delimited by comma'}                        | ${'Gnomish, Sylvan, telepathy 60 ft.'}                                                            | ${['Gnomish', 'Sylvan']}                                                               | ${60}             | ${'Gnomish, Sylvan, telepathy 60 ft.'}
      ${'telepathy delimited by semicolon'}                    | ${'Gnomish, Sylvan; telepathy 60 ft.'}                                                            | ${['Gnomish', 'Sylvan']}                                                               | ${60}             | ${'Gnomish, Sylvan, telepathy 60 ft.'}
      ${'telepathy with note'}                                 | ${'Abyssal, telepathy 60 ft. (works only with creatures that understand Abyssal)'}                | ${['Abyssal', 'telepathy 60 ft. (works only with creatures that understand Abyssal)']} | ${null}           | ${'Abyssal, telepathy 60 ft. (works only with creatures that understand Abyssal)'}
    `
    ('$description: $inputText => {expectedItems="$expectedItems", expectedTelepathy="$expectedTelepathy", expectedText="$expectedText"}',
    ({inputText, expectedItems, expectedTelepathy, expectedText}) => {
      shouldImportFromOpen5e(inputText, expectedItems, expectedTelepathy, expectedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with items is imported from JSON', () => {
    it('should show the new items', () => {
      const expectedText = 'Giant, telepathy 120 ft.';
      const json = {
        items: ['Giant'],
        telepathy: 120
      };

      languagesSection.mode = 'hidden';
      languagesSection.importFromJson(json);

      expect(languagesSection).toBeInMode('show');
      verifyShowModeView(expectedText);
    });
  });
});

function reset() {
  languagesModel.reset();
  languagesSection.updateView();
}

function shouldAddItems(itemTexts, telepathy, expectedText) {
  for (const itemText of itemTexts) {
    inputValueAndTriggerEvent(languagesSection.editElements.propertyList.input, itemText);
    languagesSection.editElements.propertyList.addButton.click();
  }
  inputValueAndTriggerEvent(languagesSection.editElements.telepathy, telepathy);

  verifyEditModeView(itemTexts, telepathy);

  languagesSection.editElements.submitForm();

  expect(languagesSection).toBeInMode('show');

  verifyModel(itemTexts, telepathy);
  verifyShowModeView(expectedText);

  const json = verifyJsonExport(itemTexts, telepathy);
  expect(languagesSection).toExportPropertyLineToHtml(headingName, expectedText);
  expect(languagesSection).toExportPropertyLineToMarkdown(headingName, expectedText);

  reset();
  languagesSection.importFromJson(json);

  verifyModel(itemTexts, telepathy);
  verifyEditModeView(itemTexts, telepathy);
  verifyShowModeView(expectedText);
}

function shouldImportFromOpen5e(inputText, expectedItems, expectedTelepathy, expectedText) {
  const json = {};
  json[open5eJsonKey] = inputText;

  languagesSection.importFromOpen5e(json);

  verifyModel(expectedItems, expectedTelepathy);
  verifyEditModeView(expectedItems, expectedTelepathy);
  verifyShowModeView(expectedText);
}

function verifyModel(expectedItems, expectedTelepathy) {
  expect(languagesModel.items).toStrictEqual(expectedItems);
  expect(languagesModel.telepathy).toBe(expectedTelepathy);
}

function verifyEditModeView(expectedItems, expectedTelepathy) {
  expect(languagesSection.editElements.propertyList.itemsAsText).toStrictEqual(expectedItems);
  expect(languagesSection.editElements.telepathy.valueAsInt).toBe(expectedTelepathy);
}

function verifyShowModeView(expectedText) {
  expect(languagesSection).toShowPropertyLine(headingName, expectedText);
}

function verifyJsonExport(expectedItems, expectedTelepathy) {
  const json = languagesSection.exportToJson();
  const expectedJson = {
    items: expectedItems,
    telepathy: expectedTelepathy
  };

  expect(json).toStrictEqual(expectedJson);

  return json;
}