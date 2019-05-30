import ActionsSection from './actions-section.js';
import Actions from '../../../models/lists/block/actions.js';

import GenerateAttackDialog from '../dialogs/generate-attack-dialog.js';

import Creature from '../../../models/creature.js';
import Abilities from '../../../models/abilities.js';
import ProficiencyBonus from '../../../models/proficiency-bonus.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './block-list-section.specs.js';

const expectedHeading = 'Actions';
const expectedItemType = 'Action';

let actionsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ActionsSection.define();
  await GenerateAttackDialog.define();

  sharedSpecs.setExpectedHeading(expectedHeading);
});

beforeEach(() => {
  Creature.reset();
  Abilities.reset();
  ProficiencyBonus.reset();
  Actions.reset();

  actionsSection = new ActionsSection();
  TestCustomElements.initializeSection(actionsSection);
  actionsSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    actionsSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the add button if there are no blocks', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks(actionsSection);
  });

  it('should switch to edit mode and focus on the name field of the first block if there is at least one block', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnNameFieldOfFirstBlockIfExists(actionsSection);
  });

  describe('when the add block button is clicked', () => {
    it('should focus on the name field of the newly created block', () => {
      sharedSpecs.shouldFocusOnNameFieldOfNewBlock(actionsSection);
    });
  });

  describe('and blocks are added and/or removed, and the edit section is submitted', () => {
    it('should add a single block', () => {
      Abilities.abilities['strength'].score = 16;
      ProficiencyBonus.proficiencyBonus = 2;

      const block = {
        name: 'Greatsword',
        originalText: '*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{2d6 + strmod} slashing damage.',
        homebreweryText: '*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) slashing damage.',
        htmlText: '<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 10 (2d6 + 3) slashing damage.'
      };
      sharedSpecs.shouldAddASingleBlock(actionsSection, block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Multiline Action',
        originalText: '**Line 1**. {name} is hot.\n  **Line 2**. {name} is cold.\n    **Line 3**. {name} is warm.',
        homebreweryText: '**Line 1**. The dummy is hot.  \n>   **Line 2**. The dummy is cold.  \n>     **Line 3**. The dummy is warm.',
        htmlText: '<strong>Line 1</strong>. The dummy is hot.\n  <strong>Line 2</strong>. The dummy is cold.\n    <strong>Line 3</strong>. The dummy is warm.'
      };

      Creature.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(actionsSection, block);
    });

    it('should add a single block with html escaped', () => {
      Abilities.abilities['strength'].score = 16;
      ProficiencyBonus.proficiencyBonus = 2;

      const block = {
        name: 'Greatsword',
        originalText: '<em>Melee Weapon Attack:</em> mod{strmod + prof} to hit, reach 5 ft., one target. <em>Hit:</em> dmg{2d6 + strmod} slashing damage.',
        homebreweryText: '&lt;em&gt;Melee Weapon Attack:&lt;/em&gt; +5 to hit, reach 5 ft., one target. &lt;em&gt;Hit:&lt;/em&gt; 10 (2d6 + 3) slashing damage.',
        htmlText: '&lt;em&gt;Melee Weapon Attack:&lt;/em&gt; +5 to hit, reach 5 ft., one target. &lt;em&gt;Hit:&lt;/em&gt; 10 (2d6 + 3) slashing damage.'
      };
      sharedSpecs.shouldAddASingleBlock(actionsSection, block);
    });

    it('should add multiple blocks', () => {
      Abilities.abilities['dexterity'].score = 14;
      ProficiencyBonus.proficiencyBonus = 2;

      const blocks = [
        {
          name: 'Multiattack',
          originalText: '{name} makes two attacks with its scimitar. The second attack has disadvantage.',
          homebreweryText: 'The goblin makes two attacks with its scimitar. The second attack has disadvantage.',
          htmlText: 'The goblin makes two attacks with its scimitar. The second attack has disadvantage.'
        },
        {
          name: 'Scimitar',
          originalText: '*Melee Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d6 + dexmod} slashing damage.',
          homebreweryText: '*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage.',
          htmlText: '<em>Melee Weapon Attack:</em> +4 to hit, reach 5 ft., one target. <em>Hit:</em> 5 (1d6 + 2) slashing damage.'
        },
        {
          name: 'Javelin',
          originalText: '*Melee or Ranged Weapon Attack:* mod{dexmod} to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* dmg{1d6} piercing damage.',
          homebreweryText: '*Melee or Ranged Weapon Attack:* +2 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 3 (1d6) piercing damage.',
          htmlText: '<em>Melee or Ranged Weapon Attack:</em> +2 to hit, reach 5 ft. or range 30/120 ft., one target. <em>Hit:</em> 3 (1d6) piercing damage.'
        }
      ];

      Creature.fullName = 'Goblin';

      sharedSpecs.shouldAddMultipleBlocks(actionsSection, blocks);
    });

    it('should add a single block, then remove it', () => {
      const blockName = 'Greataxe';
      const blockText = '*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 9 (1d12 + 3) slashing damage.';
      sharedSpecs.shouldAddASingleBlockThenRemoveIt(actionsSection, blockName, blockText);
    });

    it('should add multiple blocks, then remove one of them', () => {
      Abilities.abilities['strength'].score = 16;
      Abilities.abilities['dexterity'].score = 11;
      ProficiencyBonus.proficiencyBonus = 2;

      const blocks = [
        {
          name: 'Multiattack',
          originalText: '{name} makes two melee attacks.',
          homebreweryText: 'The knight makes two melee attacks.',
          htmlText: 'The knight makes two melee attacks.'
        },
        {
          name: 'Greatsword',
          originalText: '<em>Melee Weapon Attack:</em> mod{strmod + prof} to hit, reach 5 ft., one target. <em>Hit:</em> dmg{2d6 + strmod} slashing damage.',
          homebreweryText: '&lt;em&gt;Melee Weapon Attack:&lt;/em&gt; +5 to hit, reach 5 ft., one target. &lt;em&gt;Hit:&lt;/em&gt; 10 (2d6 + 3) slashing damage.',
          htmlText: '&lt;em&gt;Melee Weapon Attack:&lt;/em&gt; +5 to hit, reach 5 ft., one target. &lt;em&gt;Hit:&lt;/em&gt; 10 (2d6 + 3) slashing damage.'
        },
        {
          name: 'Heavy Crossbow',
          originalText: '*Ranged Weapon Attack:* mod{dexmod + prof} to hit, range 100/400 ft., one target. *Hit:* dmg{1d10 + dexmod} piercing damage.',
          homebreweryText: '*Ranged Weapon Attack:* +2 to hit, range 100/400 ft., one target. *Hit:* 5 (1d10) piercing damage.',
          htmlText: '<em>Ranged Weapon Attack:</em> +2 to hit, range 100/400 ft., one target. <em>Hit:</em> 5 (1d10) piercing damage.'
        }
      ];

      Creature.fullName = 'Knight';

      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(actionsSection, blocks, 1);
    });

    describe('should reparse the block text', () => {
      const block = {
        name: 'Teleport (Recharge 4-6)',
        originalText: '{name} magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, {name} can make one bite attack.',
        homebreweryText: null,
        htmlText: null
      };

      const oldNames = {
        fullName: 'Blink Dog',
        shortName: '',
        isProperNoun: false
      };

      it('when the full name is changed', () => {
        const newNames = {
          fullName: 'Blink Doggo',
          shortName: '',
          isProperNoun: false
        };

        block.homebreweryText = 'The blink doggo magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, the blink doggo can make one bite attack.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(actionsSection, block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        const newNames = {
          fullName: 'Blink Dog',
          shortName: 'dog',
          isProperNoun: false
        };

        block.homebreweryText = 'The dog magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, the dog can make one bite attack.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(actionsSection, block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        const newNames = {
          fullName: 'Blink Dog',
          shortName: '',
          isProperNoun: true
        };

        block.homebreweryText = 'Blink Dog magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, Blink Dog can make one bite attack.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(actionsSection, block, oldNames, newNames);
      });
    });

    it('should trim all trailing period characters in the block name', () => {
      sharedSpecs.shouldTrimAllTrailingPeriodCharactersInBlockName(actionsSection);
    });

    it('should display an error if the block name is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockNameIsBlank(actionsSection, expectedItemType);
    });

    it('should display an error if the block text is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextIsBlank(actionsSection, expectedItemType);
    });

    it('should display an error if the block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(actionsSection, expectedItemType);
    });

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(actionsSection, expectedItemType);
    });

    it('should display errors if the block name is blank and block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(actionsSection, expectedItemType);
    });
  });
});