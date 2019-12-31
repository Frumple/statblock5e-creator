import LegendaryActionsSection from './legendary-actions-section.js';
import LegendaryActions from '../../../models/lists/block/legendary-actions.js';

import Creature from '../../../models/creature.js';
import Abilities from '../../../models/abilities.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './block-list-section.specs.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const expectedHeading = 'Legendary Actions';
const expectedItemType = 'Legendary Action';

let legendaryActionsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await LegendaryActionsSection.define();

  sharedSpecs.setExpectedHeading(expectedHeading);
});

beforeEach(() => {
  Creature.reset();
  Abilities.reset();
  LegendaryActions.reset();

  legendaryActionsSection = new LegendaryActionsSection();
  TestCustomElements.initializeSection(legendaryActionsSection);
  legendaryActionsSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    legendaryActionsSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the add button if there are no blocks', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks(legendaryActionsSection);
  });

  it('should switch to edit mode and focus on the name field of the first block if there is at least one block', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnNameFieldOfFirstBlockIfExists(legendaryActionsSection);
  });

  describe('and the add block button is clicked', () => {
    it('should focus on the name field of the newly created block', () => {
      sharedSpecs.shouldFocusOnNameFieldOfNewBlock(legendaryActionsSection);
    });
  });

  describe('and the description is changed and the edit section is submitted', () => {
    it('should switch to show mode and update the description', () => {
      const description = '[name] can take 5 legendary actions, choosing from one of the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. [name] regains spent legendary actions at the start of its turn.';
      const homebreweryDescription = 'The dragon can take 5 legendary actions, choosing from one of the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The dragon regains spent legendary actions at the start of its turn.';
      const htmlDescription = 'The dragon can take 5 legendary actions, choosing from one of the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The dragon regains spent legendary actions at the start of its turn.';

      Creature.fullName = 'Adult Red Dragon';
      Creature.shortName = 'dragon';

      inputValueAndTriggerEvent(legendaryActionsSection.editElements.description, description);

      legendaryActionsSection.editElements.submitForm();

      expect(legendaryActionsSection).toBeInMode('show');
      expect(legendaryActionsSection.showElements.description).toContainHTML(htmlDescription);
      expectJsonExportDescription(description);
      expectHtmlExportDescription(htmlDescription);
      expectHomebreweryExportDescription(homebreweryDescription);
    });

    it('should display an error if the description is blank', () => {
      inputValueAndTriggerEvent(legendaryActionsSection.editElements.description, '');

      legendaryActionsSection.editElements.submitForm();

      expect(legendaryActionsSection).toBeInMode('edit');
      expect(legendaryActionsSection).toHaveError(
        legendaryActionsSection.editElements.description,
        'Legendary Actions Description cannot be blank.');
    });
  });

  describe('and blocks are added and/or removed, and the edit section is submitted', () => {
    it('should add a single block', () => {
      const block = {
        name: 'Detect',
        originalText: '[name] makes a Wisdom (Perception) check.',
        homebreweryText: 'The dragon makes a Wisdom (Perception) check.',
        htmlText: 'The dragon makes a Wisdom (Perception) check.'
      };

      Creature.fullName = 'Adult Red Dragon';
      Creature.shortName = 'dragon';

      sharedSpecs.shouldAddASingleBlock(legendaryActionsSection, block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Multiline Legendary Action',
        originalText: '**Line 1**. [name] is here.\n  **Line 2**. [name] is there.\n    **Line 3**. [name] is everywhere.',
        homebreweryText: '**Line 1**. The dummy is here.  \n>   **Line 2**. The dummy is there.  \n>     **Line 3**. The dummy is everywhere.',
        htmlText: '<strong>Line 1</strong>. The dummy is here.\n  <strong>Line 2</strong>. The dummy is there.\n    <strong>Line 3</strong>. The dummy is everywhere.'
      };

      Creature.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(legendaryActionsSection, block);
    });

    it('should add a single block with html escaped', () => {
      const block = {
        name: 'Escaped Legendary Action',
        originalText: '<strong>Line 1</strong>. [name] is here.',
        homebreweryText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.',
        htmlText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.'
      };

      Creature.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(legendaryActionsSection, block);
    });

    it('should add multiple blocks', () => {
      Abilities.abilities['strength'].score = 27;

      const blocks = [
        {
          name: 'Detect',
          originalText: '[name] makes a Wisdom (Perception) check.',
          homebreweryText: 'The dragon makes a Wisdom (Perception) check.',
          htmlText: 'The dragon makes a Wisdom (Perception) check.'
        },
        {
          name: 'Tail Attack',
          originalText: '[name] makes a tail attack.',
          homebreweryText: 'The dragon makes a tail attack.',
          htmlText: 'The dragon makes a tail attack.'
        },
        {
          name: 'Wing Attack (Costs 2 Actions)',
          originalText: '[name] beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take dmg[2d6 + strmod] bludgeoning damage and be knocked prone. [name] can then fly up to half its flying speed.',
          homebreweryText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.',
          htmlText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.'
        }
      ];

      Creature.fullName = 'Adult Red Dragon';
      Creature.shortName = 'dragon';

      sharedSpecs.shouldAddMultipleBlocks(legendaryActionsSection, blocks);
    });

    it('should add a single block, then remove it', () => {
      const block = {
        name: 'Detect',
        originalText: '[name] makes a Wisdom (Perception) check.',
        homebreweryText: 'The dragon makes a Wisdom (Perception) check.',
        htmlText: 'The dragon makes a Wisdom (Perception) check.'
      };

      Creature.fullName = 'Adult Red Dragon';
      Creature.shortName = 'dragon';

      sharedSpecs.shouldAddASingleBlockThenRemoveIt(legendaryActionsSection, block);
    });

    it('should add multiple blocks, then remove one of them', () => {
      Abilities.abilities['strength'].score = 27;

      const blocks = [
        {
          name: 'Detect',
          originalText: '[name] makes a Wisdom (Perception) check.',
          homebreweryText: 'The dragon makes a Wisdom (Perception) check.',
          htmlText: 'The dragon makes a Wisdom (Perception) check.'
        },
        {
          name: 'Tail Attack',
          originalText: '[name] makes a tail attack.',
          homebreweryText: 'The dragon makes a tail attack.',
          htmlText: 'The dragon makes a tail attack.'
        },
        {
          name: 'Wing Attack (Costs 2 Actions)',
          originalText: '[name] beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take dmg[2d6 + strmod] bludgeoning damage and be knocked prone. [name] can then fly up to half its flying speed.',
          homebreweryText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.',
          htmlText: 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.'
        }
      ];

      Creature.fullName = 'Adult Red Dragon';
      Creature.shortName = 'dragon';

      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(legendaryActionsSection, blocks, 1);
    });

    describe('should reparse the block text', () => {
      const block = {
        name: 'Wing Attack (Costs 2 Actions)',
        originalText: '[name] beats its wings. Each creature within 10 feet of [name] must succeed on a DC 22 Dexterity saving throw or take dmg[2d6 + strmod] bludgeoning damage and be knocked prone. [name] can then fly up to half its flying speed.',
        homebreweryText: null,
        htmlText: null
      };

      const oldNames = {
        fullName: 'Adult Red Dragon',
        shortName: '',
        isProperNoun: false
      };

      it('when the full name is changed', () => {
        Abilities.abilities['strength'].score = 27;

        const newNames = {
          fullName: 'Ancient Red Dragon',
          shortName: '',
          isProperNoun: false
        };

        block.homebreweryText = 'The ancient red dragon beats its wings. Each creature within 10 feet of the ancient red dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The ancient red dragon can then fly up to half its flying speed.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(legendaryActionsSection, block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        Abilities.abilities['strength'].score = 27;

        const newNames = {
          fullName: 'Adult Red Dragon',
          shortName: 'dragon',
          isProperNoun: false
        };

        block.homebreweryText = 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(legendaryActionsSection, block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        Abilities.abilities['strength'].score = 27;

        const newNames = {
          fullName: 'Adult Red Dragon',
          shortName: '',
          isProperNoun: true
        };

        block.homebreweryText = 'Adult Red Dragon beats its wings. Each creature within 10 feet of Adult Red Dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. Adult Red Dragon can then fly up to half its flying speed.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(legendaryActionsSection, block, oldNames, newNames);
      });
    });

    it('should trim all trailing period characters in the block name', () => {
      sharedSpecs.shouldTrimAllTrailingPeriodCharactersInBlockName(legendaryActionsSection);
    });

    it('should display an error if the block name is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockNameIsBlank(legendaryActionsSection, expectedItemType);
    });

    it('should display an error if the block text is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextIsBlank(legendaryActionsSection, expectedItemType);
    });

    it('should display an error if the block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(legendaryActionsSection, expectedItemType);
    });

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(legendaryActionsSection, expectedItemType);
    });

    it('should display errors if the block name is blank and block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(legendaryActionsSection, expectedItemType);
    });
  });
});

function expectJsonExportDescription(expectedText) {
  const jsonExport = legendaryActionsSection.exportToJson();

  expect(jsonExport.description).toBe(expectedText);
}

function expectHtmlExportDescription(expectedText) {
  const htmlExport = legendaryActionsSection.exportToHtml();
  const description = htmlExport.children[1];

  expect(description.tagName).toBe('P');
  expect(description).toContainHTML(expectedText);
}

function expectHomebreweryExportDescription(expectedText) {
  const homebreweryExport = legendaryActionsSection.exportToHomebrewery();
  const description = homebreweryExport.split('\n')[1];

  expect(description).toBe(`> ${expectedText}`);
}