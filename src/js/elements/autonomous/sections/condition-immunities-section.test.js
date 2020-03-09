import ConditionImmunitiesSection from './condition-immunities-section.js';
import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './property-list-section.specs.js';

const headingName = 'Condition Immunities';
const expectedBlockType = 'Condition Immunity';

const conditionImmunitiesModel = CurrentContext.creature.conditionImmunities;

let conditionImmunitiesSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ConditionImmunitiesSection.define();
});

beforeEach(() => {
  conditionImmunitiesModel.reset();

  conditionImmunitiesSection = new ConditionImmunitiesSection();
  TestCustomElements.initializeSection(conditionImmunitiesSection);
  conditionImmunitiesSection.connect();
});

it('show section should have default values', () => {
  sharedSpecs.showSectionShouldHaveDefaultValues(conditionImmunitiesSection, headingName);
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    conditionImmunitiesSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    sharedSpecs.editSectionShouldHaveDefaultValues(conditionImmunitiesSection);
  });

  it('should switch to edit mode and focus on the text field', () => {
    expect(conditionImmunitiesSection).toBeInMode('edit');
    expect(conditionImmunitiesSection.editElements.input).toHaveFocus();
    expect(conditionImmunitiesSection.editElements.input).toBeSelected();
  });

  describe('and the input field is set, the add button is clicked, and the edit section is submitted', () => {
    it('should add a suggested item, and the show section should have the item', () => {
      const itemText = 'charmed';
      sharedSpecs.shouldAddAnItem(conditionImmunitiesSection, conditionImmunitiesModel, headingName, itemText);
    });

    it('should add a custom item, and the show section should have the item', () => {
      const itemText = 'disease';
      sharedSpecs.shouldAddAnItem(conditionImmunitiesSection, conditionImmunitiesModel, headingName, itemText);
    });

    it('should add many items, and the show section should have the items', () => {
      const itemTexts = ['stunned', 'mesmerized', 'frightened', 'disconnected'];
      const expectedText = 'stunned, mesmerized, frightened, disconnected';
      sharedSpecs.shouldAddManyItems(conditionImmunitiesSection, conditionImmunitiesModel, headingName, itemTexts, expectedText);
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
        sharedSpecs.shouldAddManyItems(conditionImmunitiesSection, conditionImmunitiesModel, headingName, itemTexts, expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });

    it('should display an error after clicking the add button if the input field is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfAddingBlank(conditionImmunitiesSection, expectedBlockType);
    });

    it('should display an error after clicking the add button if there is already a duplicate item in the list', () => {
      const itemText = 'restrained';
      sharedSpecs.shouldDisplayAnErrorIfAddingDuplicate(conditionImmunitiesSection, itemText, expectedBlockType);
    });

    it('should display an error after clicking the save button if the input field is not blank', () => {
      const itemText = 'unconscious';
      sharedSpecs.shouldDisplayAnErrorIfSavingWithUnaddedInputText(conditionImmunitiesSection, itemText, expectedBlockType);
    });
  });

  describe('and a suggested item is added, and then removed', () => {
    it('should remove the item from the list of suggestions, and then re-add the item', () => {
      const itemText = 'exhaustion';
      sharedSpecs.shouldRemoveAndAddSuggestions(conditionImmunitiesSection, itemText);
    });
  });

  describe('and an item is added, then removed, and the edit section is submitted', () => {
    it('should have no items, and the show section should have no items', () => {
      const itemText = 'grappled';
      sharedSpecs.shouldAddAndRemoveItem(conditionImmunitiesSection, conditionImmunitiesModel, headingName, itemText);
    });
  });

  describe('and 3 items are in the list, one of the items is deleted, and the edit section is submitted', () => {
    describe('should show the remaining items depending on which item was deleted', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description           | itemToDelete  | expectedItems
        ${'1st item deleted'} | ${'blinded'}  | ${['deafened', 'prone']}
        ${'2nd item deleted'} | ${'deafened'} | ${['blinded', 'prone']}
        ${'3rd item deleted'} | ${'prone'}    | ${['blinded', 'deafened']}
      `
      ('$description: $itemToDelete => $expectedItems',
      ({itemToDelete, expectedItems}) => {
        const initialItems = ['blinded', 'deafened', 'prone'];
        sharedSpecs.shouldDeleteOneOfManyItems(conditionImmunitiesSection, conditionImmunitiesModel, headingName, initialItems, itemToDelete, expectedItems);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with items is imported from JSON', () => {
    it('should show the new items', () => {
      const itemsToImport = ['invisible'];
      sharedSpecs.shouldShowItemsImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(conditionImmunitiesSection, headingName, itemsToImport);
    });
  });
});