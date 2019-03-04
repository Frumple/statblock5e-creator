import DamageResistancesSection from '/src/js/elements/autonomous/sections/damage-resistances-section.js';
import * as TestCustomElements from '/src/js/helpers/test/test-custom-elements.js';

import * as sharedSpecs from '/src/js/elements/autonomous/sections/property-list-section.specs.js';

const expectedItemType = 'Damage Resistance';

let damageResistancesSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await DamageResistancesSection.define();
});

beforeEach(() => {
  damageResistancesSection = new DamageResistancesSection();
  TestCustomElements.initializeSection(damageResistancesSection);
  damageResistancesSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    damageResistancesSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the text field', () => {
    expect(damageResistancesSection).toBeInMode('edit');
    expect(damageResistancesSection.editElements.input).toHaveFocus();
  });

  describe('and the input field is set, the add button is clicked, and the edit section is submitted', () => {
    it('should add a suggested item, and the show section should have the item', () => {
      const itemText = 'necrotic';
      sharedSpecs.shouldAddASuggestedItem(damageResistancesSection, itemText);
    });

    it('should add a custom item, and the show section should have the item', () => {
      const itemText = 'bludgeoning, piercing, and slashing from nonmagical attacks';
      sharedSpecs.shouldAddACustomItem(damageResistancesSection, itemText);
    });

    it('should add many items, and the show section should have the items', () => {
      const itemTexts = ['fire', 'rock', 'cold', 'air'];
      sharedSpecs.shouldAddManyItems(damageResistancesSection, itemTexts);
    });

    it('should display an error after clicking the add button if the input field is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfAddingBlank(damageResistancesSection, expectedItemType);
    });

    it('should display an error after clicking the add button if there is already a duplicate item in the list', () => {
      const itemText = 'lightning';
      sharedSpecs.shouldDisplayAnErrorIfAddingDuplicate(damageResistancesSection, itemText, expectedItemType);
    });

    it('should display an error after clicking the save button if the input field is not blank', () => {
      const itemText = 'thunder';
      sharedSpecs.shouldDisplayAnErrorIfSavingWithUnaddedInputText(damageResistancesSection, itemText, expectedItemType);
    });
  });

  describe('and a suggested item is added, and then removed', () => {
    it.skip('should remove the item from the list of suggestions, and then re-add the item', () => {
      const itemText = 'radiant';
      sharedSpecs.shouldRemoveAndAddSuggestions(damageResistancesSection, itemText);
    });
  });

  describe('and an item is added, then removed, and the edit section is submitted', () => {
    it('should have no items, and the show section should have no items', () => {
      const itemText = 'poison';
      sharedSpecs.shouldAddAndRemoveItem(damageResistancesSection, itemText);
    });
  });

  describe('and 3 items are in the list, one of the items is deleted, and the edit section is submitted', () => {
    describe('should show the remaining items depending on which item was deleted', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description           | itemToDelete | expectedItems
        ${'1st item deleted'} | ${'acid'}    | ${['force', 'psychic']}
        ${'2nd item deleted'} | ${'force'}   | ${['acid', 'psychic']}
        ${'3rd item deleted'} | ${'psychic'} | ${['acid', 'force']}
      `
      ('$description: $itemToDelete => $expectedItems',
      ({itemToDelete, expectedItems}) => {
        const initialItems = ['acid', 'force', 'psychic'];
        sharedSpecs.shouldDeleteOneOfThreeItems(damageResistancesSection, initialItems, itemToDelete, expectedItems);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});