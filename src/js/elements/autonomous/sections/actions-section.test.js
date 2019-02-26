import ActionsSection from '/src/js/elements/autonomous/sections/actions-section.js';
import SectionTestMixin from '/src/js/helpers/test/section-test-mixin.js';

import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';
import defineBuiltinCustomElements from '/src/js/helpers/test/define-builtin-custom-elements.js';

import * as sharedSpecs from '/src/js/elements/autonomous/sections/block-list-section.specs.js';

const expectedItemType = 'Action';

let actionsSection;

beforeAll(async() => {
  defineBuiltinCustomElements();
  await ActionsSection.define();
});

beforeEach(() => {
  actionsSection = new ActionsSection();
  copyObjectProperties(actionsSection, SectionTestMixin);
  actionsSection.initializeCustomElements();
  actionsSection.forceConnect();
});

afterEach(() => {
  document.clear();
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

  describe('and blocks are added and/or removed, and the save button is clicked', () => {
    it('should add a single block', () => {
      const blockName = 'Slam';
      const blockText = '*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d6 + 1) bludgeoning damage.';
      sharedSpecs.shouldAddASingleBlock(actionsSection, blockName, blockText);
    });

    it('should add multiple blocks', () => {
      const blocks = [
        { 
          name: 'Multiattack',
          text: 'The goblin makes two attacks with its scimitar. The second attack has disadvantage.'
        },
        {
          name: 'Scimitar',
          text: '*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage.'
        },
        {
          name: 'Javelin',
          text: '*Melee or Ranged Weapon Attack:* +2 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 3 (1d6) piercing damage.'
        }
      ];
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
          text: 'The gladiator makes three melee attacks or two ranged attacks.'
        },
        {
          name: 'Spear',
          text: '*Melee or Ranged Weapon Attack:* +7 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 11 (2d6) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack.'
        },
        {
          name: 'Shield Bash',
          text: '*Melee Weapon Attack:* +7 to hit, reach 5 ft., one creature. *Hit:* 9 (2d4 + 4) bludgeoning damage. If the target is a Medium or smaller creature, it must succeed on a DC 15 Strength saving throw or be knocked prone.'
        }
      ];
      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(actionsSection, blocks, 1);
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

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(actionsSection, expectedItemType);
    });
  });
});