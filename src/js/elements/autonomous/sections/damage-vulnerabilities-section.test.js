import DamageVulnerabilitiesSection from './damage-vulnerabilities-section.js';
import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './property-list-section.specs.js';

const headingName = 'Damage Vulnerabilities';
const expectedBlockType = 'Damage Vulnerability';

const damageVulnerabilitiesModel = CurrentContext.creature.damageVulnerabilities;

let damageVulnerabilitiesSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await DamageVulnerabilitiesSection.define();
});

beforeEach(() => {
  damageVulnerabilitiesModel.reset();

  damageVulnerabilitiesSection = new DamageVulnerabilitiesSection();
  TestCustomElements.initializeSection(damageVulnerabilitiesSection);
  damageVulnerabilitiesSection.connect();
});

it('show section should have default values', () => {
  sharedSpecs.showSectionShouldHaveDefaultValues(damageVulnerabilitiesSection, headingName);
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    damageVulnerabilitiesSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    sharedSpecs.editSectionShouldHaveDefaultValues(damageVulnerabilitiesSection);
  });

  it('should switch to edit mode and focus on the text field', () => {
    expect(damageVulnerabilitiesSection).toBeInMode('edit');
    expect(damageVulnerabilitiesSection.editElements.input).toHaveFocus();
    expect(damageVulnerabilitiesSection.editElements.input).toBeSelected();
  });

  describe('and the input field is set, the add button is clicked, and the edit section is submitted', () => {
    it('should add a suggested item, and the show section should have the item', () => {
      const itemText = 'necrotic';
      sharedSpecs.shouldAddAnItem(damageVulnerabilitiesSection, damageVulnerabilitiesModel, headingName, itemText);
    });

    it('should add a custom item, and the show section should have the item', () => {
      const itemText = 'bludgeoning, piercing, and slashing from nonmagical attacks';
      sharedSpecs.shouldAddAnItem(damageVulnerabilitiesSection, damageVulnerabilitiesModel, headingName, itemText);
    });

    it('should add many items, and the show section should have the items', () => {
      const itemTexts = ['fire', 'rock', 'cold', 'air'];
      sharedSpecs.shouldAddManyItems(damageVulnerabilitiesSection, damageVulnerabilitiesModel, headingName, itemTexts);
    });

    it('should display an error after clicking the add button if the input field is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfAddingBlank(damageVulnerabilitiesSection, expectedBlockType);
    });

    it('should display an error after clicking the add button if there is already a duplicate item in the list', () => {
      const itemText = 'lightning';
      sharedSpecs.shouldDisplayAnErrorIfAddingDuplicate(damageVulnerabilitiesSection, itemText, expectedBlockType);
    });

    it('should display an error after clicking the save button if the input field is not blank', () => {
      const itemText = 'thunder';
      sharedSpecs.shouldDisplayAnErrorIfSavingWithUnaddedInputText(damageVulnerabilitiesSection, itemText, expectedBlockType);
    });
  });

  describe('and a suggested item is added, and then removed', () => {
    it('should remove the item from the list of suggestions, and then re-add the item', () => {
      const itemText = 'radiant';
      sharedSpecs.shouldRemoveAndAddSuggestions(damageVulnerabilitiesSection, itemText);
    });
  });

  describe('and an item is added, then removed, and the edit section is submitted', () => {
    it('should have no items, and the show section should have no items', () => {
      const itemText = 'poison';
      sharedSpecs.shouldAddAndRemoveItem(damageVulnerabilitiesSection, damageVulnerabilitiesModel, headingName, itemText);
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
        sharedSpecs.shouldDeleteOneOfManyItems(damageVulnerabilitiesSection, damageVulnerabilitiesModel, headingName, initialItems, itemToDelete, expectedItems);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with items is imported from JSON', () => {
    it('should show the new items', () => {
      const itemsToImport = ['bludgeoning'];
      sharedSpecs.shouldShowItemsImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(damageVulnerabilitiesSection, headingName, itemsToImport);
    });
  });
});