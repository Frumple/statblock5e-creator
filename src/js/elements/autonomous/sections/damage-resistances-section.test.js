import DamageResistancesSection from './damage-resistances-section.js';
import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import PropertyListSectionSpecs from './property-list-section.specs.js';

const headingName = 'Damage Resistances';
const expectedBlockType = 'Damage Resistance';
const open5eJsonKey = 'damage_resistances';

const damageResistancesModel = CurrentContext.creature.damageResistances;

let damageResistancesSection;
let sharedSpecs;

beforeAll(async() => {
  await TestCustomElements.define();
  await DamageResistancesSection.define();
});

beforeEach(() => {
  damageResistancesModel.reset();

  damageResistancesSection = new DamageResistancesSection();
  TestCustomElements.initializeSection(damageResistancesSection);
  damageResistancesSection.connect();
  damageResistancesSection.editElements.propertyList.connect();

  sharedSpecs = new PropertyListSectionSpecs(damageResistancesSection, damageResistancesModel, headingName, open5eJsonKey);
});

it('show section should have default values', () => {
  sharedSpecs.showSectionShouldHaveDefaultValues();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    damageResistancesSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    sharedSpecs.editSectionShouldHaveDefaultValues();
  });

  it('should switch to edit mode and focus on the text field', () => {
    expect(damageResistancesSection).toBeInMode('edit');
    expect(damageResistancesSection.editElements.propertyList.input).toHaveFocus();
    expect(damageResistancesSection.editElements.propertyList.input).toBeSelected();
  });

  describe('and the input field is set, the add button is clicked, and the edit section is submitted', () => {
    it('should add a suggested item, and the show section should have the item', () => {
      const itemText = 'necrotic';
      sharedSpecs.shouldAddAnItem(itemText);
    });

    it('should add a custom item, and the show section should have the item', () => {
      const itemText = 'dark';
      sharedSpecs.shouldAddAnItem(itemText);
    });

    it('should add many items, and the show section should have the items', () => {
      const itemTexts = ['fire', 'rock', 'cold', 'air'];
      const expectedText = 'fire, rock, cold, air';
      sharedSpecs.shouldAddManyItems(itemTexts, expectedText);
    });

    describe('should add item that contains commas, and if there are other items before or after this item, semicolon separators instead of commas should be shown', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                    | itemTexts                                                                                                                           | expectedText
        ${'comma item only'}                           | ${['bludgeoning, piercing, and slashing from nonmagical attacks']}                                                                  | ${'bludgeoning, piercing, and slashing from nonmagical attacks'}
        ${'items before comma item'}                   | ${['fire', 'rock', 'bludgeoning, piercing, and slashing from nonmagical attacks']}                                                  | ${'fire, rock; bludgeoning, piercing, and slashing from nonmagical attacks'}
        ${'items after comma item'}                    | ${['bludgeoning, piercing, and slashing from nonmagical attacks', 'cold', 'air']}                                                   | ${'bludgeoning, piercing, and slashing from nonmagical attacks; cold, air'}
        ${'items before and after comma item'}         | ${['fire', 'rock', 'bludgeoning, piercing, and slashing from nonmagical attacks', 'cold', 'air']}                                   | ${'fire, rock; bludgeoning, piercing, and slashing from nonmagical attacks; cold, air'}
        ${'two comma items adjacent to each other'}    | ${['fire', 'rock', 'bludgeoning, piercing, and slashing from nonmagical attacks', 'lightning, thunder from spells', 'cold', 'air']} | ${'fire, rock; bludgeoning, piercing, and slashing from nonmagical attacks; lightning, thunder from spells; cold, air'}
        ${'two comma items separated from each other'} | ${['fire', 'rock', 'bludgeoning, piercing, and slashing from nonmagical attacks', 'cold', 'air', 'lightning, thunder from spells']} | ${'fire, rock; bludgeoning, piercing, and slashing from nonmagical attacks; cold, air; lightning, thunder from spells'}
      `
      ('$description: $itemTexts => $expectedText',
      ({itemTexts, expectedText}) => {
        sharedSpecs.shouldAddManyItems(itemTexts, expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });

    it('should display an error after clicking the add button if the input field is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfAddingBlank(expectedBlockType);
    });

    it('should display an error after clicking the add button if there is already a duplicate item in the list', () => {
      const itemText = 'lightning';
      sharedSpecs.shouldDisplayAnErrorIfAddingDuplicate(itemText, expectedBlockType);
    });

    it('should display an error after clicking the save button if the input field is not blank', () => {
      const itemText = 'thunder';
      sharedSpecs.shouldDisplayAnErrorIfSavingWithUnaddedInputText(itemText, expectedBlockType);
    });
  });

  describe('and a suggested item is added, and then removed', () => {
    it('should remove the item from the list of suggestions, and then re-add the item', () => {
      const itemText = 'radiant';
      sharedSpecs.shouldRemoveAndAddSuggestions(itemText);
    });
  });

  describe('and an item is added, then removed, and the edit section is submitted', () => {
    it('should have no items, and the show section should have no items', () => {
      const itemText = 'poison';
      sharedSpecs.shouldAddAndRemoveItem(itemText);
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
        sharedSpecs.shouldDeleteOneOfManyItems(initialItems, itemToDelete, expectedItems);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});

describe('when import from Open5e', () => {
  describe('should import as normal', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                                         | inputText                                                                               | expectedItems
      ${'no items'}                                       | ${''}                                                                                   | ${[]}
      ${'single simple item'}                             | ${'force'}                                                                              | ${['force']}
      ${'multiple simple items'}                          | ${'radiant, necrotic, acid'}                                                            | ${['radiant', 'necrotic', 'acid']}
      ${'bludgeoning, piercing, and slashing (BPS) only'} | ${'bludgeoning, piercing, and slashing from nonmagical attacks'}                        | ${['bludgeoning, piercing, and slashing from nonmagical attacks']}
      ${'simple items before BPS'}                        | ${'fire, rock; bludgeoning, piercing, and slashing from nonmagical attacks'}            | ${['fire', 'rock', 'bludgeoning, piercing, and slashing from nonmagical attacks']}
      ${'simple items after BPS'}                         | ${'bludgeoning, piercing, and slashing from nonmagical attacks; cold, air'}             | ${['bludgeoning, piercing, and slashing from nonmagical attacks', 'cold', 'air']}
      ${'simple items before and after BPS'}              | ${'fire, rock; bludgeoning, piercing, and slashing from nonmagical attacks; cold, air'} | ${['fire', 'rock', 'bludgeoning, piercing, and slashing from nonmagical attacks', 'cold', 'air']}
    `
    ('$description: $inputText => $expectedItems',
    ({inputText, expectedItems}) => {
      sharedSpecs.shouldImportFromOpen5e(inputText, expectedItems);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with items is imported from JSON', () => {
    it('should show the new items', () => {
      const itemsToImport = ['bludgeoning'];
      sharedSpecs.shouldShowItemsImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(itemsToImport);
    });
  });
});