import ActionsSection from './actions-section.js';
import Actions from '../../../stats/lists/block/actions.js';
import Creature from '../../../stats/creature.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './block-list-section.specs.js';

const expectedHeading = 'Actions';
const expectedItemType = 'Action';

let actionsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ActionsSection.define();

  sharedSpecs.setExpectedHeading(expectedHeading);
});

beforeEach(() => {
  Creature.reset();
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
      const blockName = 'Slam';
      const blockText = '*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d6 + 1) bludgeoning damage.';
      const expectedText = '<em>Melee Weapon Attack:</em> +3 to hit, reach 5 ft., one target. <em>Hit:</em> 4 (1d6 + 1) bludgeoning damage.';
      sharedSpecs.shouldAddASingleBlock(actionsSection, blockName, blockText, expectedText);
    });

    it('should add multiple blocks', () => {
      const blocks = [
        { 
          name: 'Multiattack',
          text: '{name} makes two attacks with its scimitar. The second attack has disadvantage.',
          expectedText: 'The goblin makes two attacks with its scimitar. The second attack has disadvantage.'
        },
        {
          name: 'Scimitar',
          text: '*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage.',
          expectedText: '<em>Melee Weapon Attack:</em> +4 to hit, reach 5 ft., one target. <em>Hit:</em> 5 (1d6 + 2) slashing damage.'
        },
        {
          name: 'Javelin',
          text: '*Melee or Ranged Weapon Attack:* +2 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 3 (1d6) piercing damage.',
          expectedText: '<em>Melee or Ranged Weapon Attack:</em> +2 to hit, reach 5 ft. or range 30/120 ft., one target. <em>Hit:</em> 3 (1d6) piercing damage.'
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
      const blocks = [
        { 
          name: 'Multiattack',
          text: '{name} makes three melee attacks or two ranged attacks.',
          expectedText: 'The gladiator makes three melee attacks or two ranged attacks.'
        },
        {
          name: 'Spear',
          text: '*Melee or Ranged Weapon Attack:* +7 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 11 (2d6) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack.',
          expectedText: '<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 11 (2d6) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack.'
        },
        {
          name: 'Shield Bash',
          text: '*Melee Weapon Attack:* +7 to hit, reach 5 ft., one creature. *Hit:* 9 (2d4 + 4) bludgeoning damage. If the target is a Medium or smaller creature, it must succeed on a DC 15 Strength saving throw or be knocked prone.',
          expectedText: '<em>Melee Weapon Attack:</em> +7 to hit, reach 5 ft., one creature. <em>Hit:</em> 9 (2d4 + 4) bludgeoning damage. If the target is a Medium or smaller creature, it must succeed on a DC 15 Strength saving throw or be knocked prone.'
        }
      ];

      Creature.fullName = 'Gladiator';

      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(actionsSection, blocks, 1);
    });

    describe('should reparse the block text', () => {
      const blockName = 'Teleport (Recharge 4-6)';
      const blockText = '{name} magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, {name} can make one bite attack.';

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

        const expectedText = 'The blink doggo magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, the blink doggo can make one bite attack.';

        sharedSpecs.shouldReparseNameChanges(actionsSection, blockName, blockText, oldNames, newNames, expectedText);
      });

      it('when the short name is changed', () => {
        const newNames = {
          fullName: 'Blink Dog',
          shortName: 'dog',
          isProperNoun: false
        };

        const expectedText = 'The dog magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, the dog can make one bite attack.';

        sharedSpecs.shouldReparseNameChanges(actionsSection, blockName, blockText, oldNames, newNames, expectedText);
      });

      it('when the proper noun is changed', () => {
        const newNames = {
          fullName: 'Blink Dog',
          shortName: '',
          isProperNoun: true
        };

        const expectedText = 'Blink Dog magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, Blink Dog can make one bite attack.';

        sharedSpecs.shouldReparseNameChanges(actionsSection, blockName, blockText, oldNames, newNames, expectedText);
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