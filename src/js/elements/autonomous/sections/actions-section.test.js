import ActionsSection from './actions-section.js';
import GenerateAttackDialog from '../dialogs/generate-attack-dialog.js';

import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import BlockListSectionSpecs from './block-list-section.specs.js';

const headingName = 'Actions';
const expectedBlockType = 'Action';
const open5eJsonKey = 'actions';

const titleModel = CurrentContext.creature.title;
const abilitiesModel = CurrentContext.creature.abilities;
const challengeRatingModel = CurrentContext.creature.challengeRating;
const actionsModel = CurrentContext.creature.actions;

let actionsSection;
let sharedSpecs;

beforeAll(async() => {
  await TestCustomElements.define();
  await ActionsSection.define();
  await GenerateAttackDialog.define();
});

beforeEach(() => {
  titleModel.reset();
  abilitiesModel.reset();
  challengeRatingModel.reset();
  actionsModel.reset();

  actionsSection = new ActionsSection();
  document.body.appendChild(actionsSection);

  sharedSpecs = new BlockListSectionSpecs(actionsSection, actionsModel, headingName, open5eJsonKey);
});

it('section should have default blocks', () => {
  sharedSpecs.sectionShouldHaveDefaultBlocks();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    actionsSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the add button if there are no blocks', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks();
  });

  it('should switch to edit mode and focus on the name field of the first block if there is at least one block', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnNameFieldOfFirstBlockIfExists();
  });

  describe('when the add block button is clicked', () => {
    it('should focus on the name field of the newly created block', () => {
      sharedSpecs.shouldFocusOnNameFieldOfNewBlock();
    });
  });

  describe('and blocks are added and/or removed, and the edit section is submitted', () => {
    it('should add a single block', () => {
      abilitiesModel.abilities['strength'].score = 16;
      challengeRatingModel.proficiencyBonus = 2;

      const block = {
        name: 'Greatsword',
        text: '*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[2d6 + str] slashing damage.',
        markdownText: '*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) slashing damage.',
        htmlText: '<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 10 (2d6 + 3) slashing damage.'
      };
      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Breath Weapons (Recharge 5-6)',
        text: '[name] uses one of the following breath weapons.\n**Fire Breath.** [name] exhales fire in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking dmg[13d6] fire damage on a failed save, or half as much damage on a successful one.\n**Sleep Breath.** [name] exhales sleep gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.',
        markdownText: 'The dragon uses one of the following breath weapons.  \n> **Fire Breath.** The dragon exhales fire in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 45 (13d6) fire damage on a failed save, or half as much damage on a successful one.  \n> **Sleep Breath.** The dragon exhales sleep gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.',
        htmlText: 'The dragon uses one of the following breath weapons.\n<strong>Fire Breath.</strong> The dragon exhales fire in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 45 (13d6) fire damage on a failed save, or half as much damage on a successful one.\n<strong>Sleep Breath.</strong> The dragon exhales sleep gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.'
      };

      titleModel.fullName = 'Adult Brass Dragon';
      titleModel.shortName = 'dragon';

      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add a single block with html escaped', () => {
      abilitiesModel.abilities['strength'].score = 16;
      challengeRatingModel.proficiencyBonus = 2;

      const block = {
        name: 'Greatsword',
        text: '<em>Melee Weapon Attack:</em> atk[str] to hit, reach 5 ft., one target. <em>Hit:</em> dmg[2d6 + str] slashing damage.',
        markdownText: '&lt;em&gt;Melee Weapon Attack:&lt;/em&gt; +5 to hit, reach 5 ft., one target. &lt;em&gt;Hit:&lt;/em&gt; 10 (2d6 + 3) slashing damage.',
        htmlText: '&lt;em&gt;Melee Weapon Attack:&lt;/em&gt; +5 to hit, reach 5 ft., one target. &lt;em&gt;Hit:&lt;/em&gt; 10 (2d6 + 3) slashing damage.'
      };
      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add multiple blocks', () => {
      abilitiesModel.abilities['dexterity'].score = 14;
      challengeRatingModel.proficiencyBonus = 2;

      const blocks = [
        {
          name: 'Multiattack',
          text: '[name] makes two melee attacks or two ranged attacks.',
          markdownText: 'The scout makes two melee attacks or two ranged attacks.',
          htmlText: 'The scout makes two melee attacks or two ranged attacks.'
        },
        {
          name: 'Shortsword',
          text: '*Melee Weapon Attack:* atk[dex] to hit, reach 5 ft., one target. *Hit:* dmg[1d6 + dex] piercing damage.',
          markdownText: '*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage.',
          htmlText: '<em>Melee Weapon Attack:</em> +4 to hit, reach 5 ft., one target. <em>Hit:</em> 5 (1d6 + 2) piercing damage.'
        },
        {
          name: 'Longbow',
          text: '*Ranged Weapon Attack:* atk[dex] to hit, ranged 150/600 ft., one target. *Hit:* dmg[1d8 + dex] piercing damage.',
          markdownText: '*Ranged Weapon Attack:* +4 to hit, ranged 150/600 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage.',
          htmlText: '<em>Ranged Weapon Attack:</em> +4 to hit, ranged 150/600 ft., one target. <em>Hit:</em> 6 (1d8 + 2) piercing damage.'
        }
      ];

      titleModel.fullName = 'Scout';

      sharedSpecs.shouldAddMultipleBlocks(blocks);
    });

    it('should add a single block, then remove it', () => {
      const blockName = 'Greataxe';
      const blockText = '*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 9 (1d12 + 3) slashing damage.';
      sharedSpecs.shouldAddASingleBlockThenRemoveIt(blockName, blockText);
    });

    it('should add multiple blocks, then remove one of them', () => {
      abilitiesModel.abilities['strength'].score = 16;
      abilitiesModel.abilities['dexterity'].score = 11;
      challengeRatingModel.proficiencyBonus = 2;

      const blocks = [
        {
          name: 'Multiattack',
          text: '[name] makes two melee attacks.',
          markdownText: 'The knight makes two melee attacks.',
          htmlText: 'The knight makes two melee attacks.'
        },
        {
          name: 'Greatsword',
          text: '<em>Melee Weapon Attack:</em> atk[str] to hit, reach 5 ft., one target. <em>Hit:</em> dmg[2d6 + str] slashing damage.',
          markdownText: '&lt;em&gt;Melee Weapon Attack:&lt;/em&gt; +5 to hit, reach 5 ft., one target. &lt;em&gt;Hit:&lt;/em&gt; 10 (2d6 + 3) slashing damage.',
          htmlText: '&lt;em&gt;Melee Weapon Attack:&lt;/em&gt; +5 to hit, reach 5 ft., one target. &lt;em&gt;Hit:&lt;/em&gt; 10 (2d6 + 3) slashing damage.'
        },
        {
          name: 'Heavy Crossbow',
          text: '*Ranged Weapon Attack:* atk[dex] to hit, range 100/400 ft., one target. *Hit:* dmg[1d10 + dex] piercing damage.',
          markdownText: '*Ranged Weapon Attack:* +2 to hit, range 100/400 ft., one target. *Hit:* 5 (1d10) piercing damage.',
          htmlText: '<em>Ranged Weapon Attack:</em> +2 to hit, range 100/400 ft., one target. <em>Hit:</em> 5 (1d10) piercing damage.'
        }
      ];

      titleModel.fullName = 'Knight';

      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(blocks, 1);
    });

    describe('should reparse the block text', () => {
      const block = {
        name: 'Teleport (Recharge 4-6)',
        text: '[name] magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, [name] can make one bite attack.',
        markdownText: null,
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

        block.markdownText = 'The blink doggo magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, the blink doggo can make one bite attack.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        const newNames = {
          fullName: 'Blink Dog',
          shortName: 'dog',
          isProperNoun: false
        };

        block.markdownText = 'The dog magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, the dog can make one bite attack.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        const newNames = {
          fullName: 'Blink Dog',
          shortName: '',
          isProperNoun: true
        };

        block.markdownText = 'Blink Dog magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Before or after teleporting, Blink Dog can make one bite attack.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(block, oldNames, newNames);
      });
    });

    it('should trim all trailing period characters in the block name', () => {
      sharedSpecs.shouldTrimAllTrailingPeriodCharactersInBlockName();
    });

    it('should display an error if the block name is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockNameIsBlank(expectedBlockType);
    });

    it('should display an error if the block text is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextIsBlank(expectedBlockType);
    });

    it('should display an error if the block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(expectedBlockType);
    });

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(expectedBlockType);
    });

    it('should display errors if the block name is blank and block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(expectedBlockType);
    });
  });
});

describe('when import from Open5e', () => {
  it('should import single block', () => {
    const block = {
      name: 'Greatsword',
      text: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.'
    };

    sharedSpecs.shouldImportFromOpen5e([block]);
  });

  it('should import single block with multiline text', () => {
    const block = {
      name: 'Breath Weapons (Recharge 5-6)',
      text: 'The dragon uses one of the following breath weapons.\n**Fire Breath.** The dragon exhales fire in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking dmg[13d6] fire damage on a failed save, or half as much damage on a successful one.\n**Sleep Breath.** The dragon exhales sleep gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.',
      markdownText: 'The dragon uses one of the following breath weapons.  \n> **Fire Breath.** The dragon exhales fire in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 45 (13d6) fire damage on a failed save, or half as much damage on a successful one.  \n> **Sleep Breath.** The dragon exhales sleep gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.',
      htmlText: 'The dragon uses one of the following breath weapons.\n<strong>Fire Breath.</strong> The dragon exhales fire in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 45 (13d6) fire damage on a failed save, or half as much damage on a successful one.\n<strong>Sleep Breath.</strong> The dragon exhales sleep gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.'
    };

    sharedSpecs.shouldImportFromOpen5e([block]);
  });

  it('should import multiple blocks', () => {
    const blocks = [
      {
        name: 'Multiattack',
        text: 'The scout makes two melee attacks or two ranged attacks.'
      },
      {
        name: 'Shortsword',
        text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.'
      },
      {
        name: 'Longbow',
        text: 'Ranged Weapon Attack: +4 to hit, ranged 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.'
      }
    ];

    sharedSpecs.shouldImportFromOpen5e(blocks);
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with blocks is imported from JSON', () => {
    it('should show the new blocks', () => {
      const blocksToImport = [
        {
          name: 'Weird Insight',
          text: '[name] targets one creature it can see within 30 feet of it. The target must contest its Charisma (Deception) check against [name]’s Wisdom (Insight) check. If [name] wins, it magically learns one fact or secret about the target. The target automatically wins if it is immune to being charmed.',
          htmlText: 'The nothic targets one creature it can see within 30 feet of it. The target must contest its Charisma (Deception) check against the nothic’s Wisdom (Insight) check. If the nothic wins, it magically learns one fact or secret about the target. The target automatically wins if it is immune to being charmed.'
        }
      ];

      titleModel.fullName = 'Nothic';

      sharedSpecs.shouldShowBlocksImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(blocksToImport);
    });
  });
});