import DamageImmunitiesSection from '/src/js/elements/autonomous/sections/damage-immunities-section.js';
import SectionTestMixin from '/src/js/helpers/test/section-test-mixin.js';

import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';
import defineCustomElements from '/src/js/helpers/test/define-custom-elements.js';

import * as sharedSpecs from '/src/js/elements/autonomous/sections/property-list-section.specs.js';

const expectedItemType = 'Damage Immunity';

let damageImmunitiesSection;

beforeAll(async() => {
  await defineCustomElements();
  await DamageImmunitiesSection.define();
});

beforeEach(() => {
  damageImmunitiesSection = new DamageImmunitiesSection();
  copyObjectProperties(damageImmunitiesSection, SectionTestMixin);
  damageImmunitiesSection.initializeCustomElements();
  damageImmunitiesSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    damageImmunitiesSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the text field', () => {
    expect(damageImmunitiesSection).toBeInMode('edit');
    expect(damageImmunitiesSection.editElements.input).toHaveFocus();
  });

  describe('and the input field is set, the add button is clicked, and the edit section is submitted', () => {
    it('should add a suggested item, and the show section should have the item', () => {
      const itemText = 'necrotic';
      sharedSpecs.shouldAddASuggestedItem(damageImmunitiesSection, itemText);
    });

    it('should add a custom item, and the show section should have the item', () => {
      const itemText = 'bludgeoning, piercing, and slashing from nonmagical attacks';
      sharedSpecs.shouldAddACustomItem(damageImmunitiesSection, itemText);
    });

    it('should add many items, and the show section should have the items', () => {
      const itemTexts = ['fire', 'rock', 'cold', 'air'];
      sharedSpecs.shouldAddManyItems(damageImmunitiesSection, itemTexts);
    });

    it('should display an error after clicking the add button if the input field is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfAddingBlank(damageImmunitiesSection, expectedItemType);
    });

    it('should display an error after clicking the add button if there is already a duplicate item in the list', () => {
      const itemText = 'lightning';
      sharedSpecs.shouldDisplayAnErrorIfAddingDuplicate(damageImmunitiesSection, itemText, expectedItemType);
    });

    it('should display an error after clicking the save button if the input field is not blank', () => {
      const itemText = 'thunder';
      sharedSpecs.shouldDisplayAnErrorIfSavingWithUnaddedInputText(damageImmunitiesSection, itemText, expectedItemType);
    });
  });

  describe('and a suggested item is added, and then removed', () => {
    it.skip('should remove the item from the list of suggestions, and then re-add the item', () => {
      const itemText = 'radiant';
      sharedSpecs.shouldRemoveAndAddSuggestions(damageImmunitiesSection, itemText);
    });
  });

  describe('and an item is added, then removed, and the edit section is submitted', () => {
    it('should have no items, and the show section should have no items', () => {
      const itemText = 'poison';
      sharedSpecs.shouldAddAndRemoveItem(damageImmunitiesSection, itemText);
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
        sharedSpecs.shouldDeleteOneOfThreeItems(damageImmunitiesSection, initialItems, itemToDelete, expectedItems);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and 3 items are in the list, one of the items is reordered, and the edit section is submitted', () => {
    describe('should show the items in correct order depending on which item was moved to what position', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                         | fromIndex | toIndex | expectedItems
        ${'1st item moved to 2nd position'} | ${0}      | ${1}    | ${['piercing', 'bludgeoning', 'slashing']}
        ${'1st item moved to 3rd position'} | ${0}      | ${2}    | ${['piercing', 'slashing', 'bludgeoning']}
        ${'2nd item moved to 1st position'} | ${1}      | ${0}    | ${['piercing', 'bludgeoning', 'slashing']}
        ${'2nd item moved to 3rd position'} | ${1}      | ${2}    | ${['bludgeoning', 'slashing', 'piercing']}
        ${'3rd item moved to 1st position'} | ${2}      | ${0}    | ${['slashing', 'bludgeoning', 'piercing']}
        ${'3rd item moved to 2nd position'} | ${2}      | ${1}    | ${['bludgeoning', 'slashing', 'piercing']}
      `
      ('$description: {fromIndex="$fromIndex", toIndex="$toIndex"} => $expectedItems',
      ({fromIndex, toIndex, expectedItems}) => {
        const initialItems = ['bludgeoning', 'piercing', 'slashing'];
        sharedSpecs.shouldReorderOneOfThreeItems(damageImmunitiesSection, initialItems, fromIndex, toIndex, expectedItems);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});