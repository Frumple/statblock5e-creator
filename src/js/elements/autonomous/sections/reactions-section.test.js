import ReactionsSection from './reactions-section.js';
import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './block-list-section.specs.js';

const expectedHeading = 'Reactions';
const expectedBlockType = 'Reaction';
const open5eJsonKey = 'reactions';

const titleModel = CurrentContext.creature.title;
const reactionsModel = CurrentContext.creature.reactions;

let reactionsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ReactionsSection.define();

  sharedSpecs.setExpectedHeading(expectedHeading);
});

beforeEach(() => {
  titleModel.reset();
  reactionsModel.reset();

  reactionsSection = new ReactionsSection();
  TestCustomElements.initializeSection(reactionsSection);
  reactionsSection.connect();
});

it('section should have default blocks', () => {
  sharedSpecs.sectionShouldHaveDefaultBlocks(reactionsSection, reactionsModel);
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    reactionsSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the add button if there are no blocks', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks(reactionsSection);
  });

  it('should switch to edit mode and focus on the name field of the first block if there is at least one block', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnNameFieldOfFirstBlockIfExists(reactionsSection);
  });

  describe('when the add block button is clicked', () => {
    it('should focus on the name field of the newly created block', () => {
      sharedSpecs.shouldFocusOnNameFieldOfNewBlock(reactionsSection);
    });
  });

  describe('and blocks are added and/or removed, and the edit section is submitted', () => {
    it('should add a single block', () => {
      const block = {
        name: 'Parry',
        text: '[name] adds 2 to its AC against one melee attack that would hit it. To do so, [name] must see the attacker and be wielding a melee weapon.',
        markdownText: 'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.',
        htmlText: 'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.'
      };

      titleModel.fullName = 'Knight';

      sharedSpecs.shouldAddASingleBlock(reactionsSection, reactionsModel, block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Multiline Reaction',
        text: '**Line 1**. [name] is here.\n  **Line 2**. [name] is there.\n    **Line 3**. [name] is everywhere.',
        markdownText: '**Line 1**. The dummy is here.  \n>   **Line 2**. The dummy is there.  \n>     **Line 3**. The dummy is everywhere.',
        htmlText: '<strong>Line 1</strong>. The dummy is here.\n  <strong>Line 2</strong>. The dummy is there.\n    <strong>Line 3</strong>. The dummy is everywhere.'
      };

      titleModel.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(reactionsSection, reactionsModel, block);
    });

    it('should add a single block with html escaped', () => {
      const block = {
        name: 'Escaped Reaction',
        text: '<strong>Line 1</strong>. [name] is here.',
        markdownText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.',
        htmlText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.'
      };

      titleModel.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(reactionsSection, reactionsModel, block);
    });

    it('should add multiple blocks', () => {
      const blocks = [
        {
          name: 'Reaction 1',
          text: 'Reaction Text 1'
        },
        {
          name: 'Reaction 2',
          text: 'Reaction __Text__ 2',
          htmlText: 'Reaction <strong>Text</strong> 2'
        },
        {
          name: 'Reaction 3',
          text: 'Reaction Text 3'
        }
      ];
      sharedSpecs.shouldAddMultipleBlocks(reactionsSection, reactionsModel, blocks);
    });

    it('should add a single block, then remove it', () => {
      const block = {
        name: 'Split',
        text: 'When a jelly that is Medium or larger is subjected to lightning or slashing damage, it splits into two new jellies if it has at least 10 hit points. Each new jelly has hit points equal to half the original jelly\'s, rounded down. New jellies are one size smaller than the original jelly.'
      };

      sharedSpecs.shouldAddASingleBlockThenRemoveIt(reactionsSection, reactionsModel, block);
    });

    it('should add multiple blocks, then remove one of them', () => {
      const blocks = [
        {
          name: 'Reaction 1',
          text: 'Reaction Text 1'
        },
        {
          name: 'Reaction 2',
          text: 'Reaction Text 2'
        },
        {
          name: 'Reaction 3',
          text: '**Reaction** Text 3',
          htmlText: '<strong>Reaction</strong> Text 3'
        }
      ];
      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(reactionsSection, reactionsModel, blocks, 1);
    });

    describe('should reparse the block text', () => {
      const block = {
        name: 'Spell Reflection',
        text: 'If [name] makes a successful saving throw against a spell, or a spell attack misses it, [name] can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of [name]. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.',
        markdownText: null,
        htmlText: null
      };

      const oldNames = {
        fullName: 'Spectator',
        shortName: '',
        isProperNoun: false
      };

      it('when the full name is changed', () => {
        const newNames = {
          fullName: 'Old Spectator',
          shortName: '',
          isProperNoun: false
        };

        block.markdownText = 'If the old spectator makes a successful saving throw against a spell, or a spell attack misses it, the old spectator can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of the old spectator. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(reactionsSection, reactionsModel, block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        const newNames = {
          fullName: 'Old Spectator',
          shortName: 'spectator',
          isProperNoun: false
        };

        block.markdownText = 'If the spectator makes a successful saving throw against a spell, or a spell attack misses it, the spectator can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of the spectator. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(reactionsSection, reactionsModel, block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        const newNames = {
          fullName: 'Old Spectator',
          shortName: '',
          isProperNoun: true
        };

        block.markdownText = 'If Old Spectator makes a successful saving throw against a spell, or a spell attack misses it, Old Spectator can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of Old Spectator. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(reactionsSection, reactionsModel, block, oldNames, newNames);
      });
    });

    it('should trim all trailing period characters in the block name', () => {
      sharedSpecs.shouldTrimAllTrailingPeriodCharactersInBlockName(reactionsSection, reactionsModel);
    });

    it('should display an error if the block name is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockNameIsBlank(reactionsSection, expectedBlockType);
    });

    it('should display an error if the block text is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextIsBlank(reactionsSection, expectedBlockType);
    });

    it('should display an error if the block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(reactionsSection, expectedBlockType);
    });

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(reactionsSection, expectedBlockType);
    });

    it('should display errors if the block name is blank and block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(reactionsSection, expectedBlockType);
    });
  });
});

describe('when import from Open5e', () => {
  it('should import single block', () => {
    const block = {
      name: 'Parry',
      text: 'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.'
    };

    sharedSpecs.shouldImportFromOpen5e(reactionsSection, reactionsModel, open5eJsonKey, [block]);
  });

  it('should import single block with multiline text', () => {
    const block = {
      name: 'Multiline Reaction',
      text: '**Line 1**. The dummy is here.\n  **Line 2**. The dummy is there.\n    **Line 3**. The dummy is everywhere.',
      markdownText: '**Line 1**. The dummy is here.  \n>   **Line 2**. The dummy is there.  \n>     **Line 3**. The dummy is everywhere.',
      htmlText: '<strong>Line 1</strong>. The dummy is here.\n  <strong>Line 2</strong>. The dummy is there.\n    <strong>Line 3</strong>. The dummy is everywhere.'
    };

    sharedSpecs.shouldImportFromOpen5e(reactionsSection, reactionsModel, open5eJsonKey, [block]);
  });

  it('should import multiple blocks', () => {
    const blocks = [
      {
        name: 'Reaction 1',
        text: 'Reaction Text 1'
      },
      {
        name: 'Reaction 2',
        text: 'Reaction __Text__ 2',
        htmlText: 'Reaction <strong>Text</strong> 2'
      },
      {
        name: 'Reaction 3',
        text: 'Reaction Text 3'
      }
    ];

    sharedSpecs.shouldImportFromOpen5e(reactionsSection, reactionsModel, open5eJsonKey, blocks);
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with blocks is imported from JSON', () => {
    it('should show the new blocks', () => {
      const blocksToImport = [
        {
          name: 'Parry',
          text: '[name] adds 2 to its AC against one melee attack that would hit it. To do so, [name] must see the attacker and be wielding a melee weapon.',
          htmlText: 'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.'
        }
      ];

      titleModel.fullName = 'Knight';

      sharedSpecs.shouldShowBlocksImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(reactionsSection, blocksToImport);
    });
  });
});