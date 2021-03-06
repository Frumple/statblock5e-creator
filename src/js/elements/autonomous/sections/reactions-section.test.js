import ReactionsSection from './reactions-section.js';
import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import BlockListSectionSpecs from './block-list-section.specs.js';

const headingName = 'Reactions';
const expectedBlockType = 'Reaction';
const open5eJsonKey = 'reactions';

const titleModel = CurrentContext.creature.title;
const reactionsModel = CurrentContext.creature.reactions;

let reactionsSection;
let sharedSpecs;

beforeAll(async() => {
  await TestCustomElements.define();
  await ReactionsSection.define();
});

beforeEach(() => {
  titleModel.reset();
  reactionsModel.reset();

  reactionsSection = new ReactionsSection();
  document.body.appendChild(reactionsSection);

  sharedSpecs = new BlockListSectionSpecs(reactionsSection, reactionsModel, headingName, open5eJsonKey);
});

it('section should have default blocks', () => {
  sharedSpecs.sectionShouldHaveDefaultBlocks();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    reactionsSection.showElements.section.click();
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
      const block = {
        name: 'Parry',
        text: '[NAME] adds 2 to its AC against one melee attack that would hit it. To do so, [NAME] must see the attacker and be wielding a melee weapon.',
        markdownText: 'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.',
        htmlText: 'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.'
      };

      titleModel.fullName = 'Knight';

      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Multiline Reaction',
        text: '**Line 1**. [NAME] is here.\n  **Line 2**. [NAME] is there.\n    **Line 3**. [NAME] is everywhere.',
        markdownText: '**Line 1**. The dummy is here.  \n>   **Line 2**. The dummy is there.  \n>     **Line 3**. The dummy is everywhere.',
        htmlText: '<strong>Line 1</strong>. The dummy is here.\n  <strong>Line 2</strong>. The dummy is there.\n    <strong>Line 3</strong>. The dummy is everywhere.'
      };

      titleModel.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add a single block with html escaped', () => {
      const block = {
        name: 'Escaped Reaction',
        text: '<strong>Line 1</strong>. [NAME] is here.',
        markdownText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.',
        htmlText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.'
      };

      titleModel.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(block);
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
      sharedSpecs.shouldAddMultipleBlocks(blocks);
    });

    it('should add a single block, then remove it', () => {
      const block = {
        name: 'Split',
        text: 'When a jelly that is Medium or larger is subjected to lightning or slashing damage, it splits into two new jellies if it has at least 10 hit points. Each new jelly has hit points equal to half the original jelly\'s, rounded down. New jellies are one size smaller than the original jelly.'
      };

      sharedSpecs.shouldAddASingleBlockThenRemoveIt(block);
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
      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(blocks, 1);
    });

    describe('should reparse the block text', () => {
      const block = {
        name: 'Spell Reflection',
        text: 'If [NAME] makes a successful saving throw against a spell, or a spell attack misses it, [NAME] can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of [NAME]. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.',
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

        sharedSpecs.shouldReparseNameChanges(block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        const newNames = {
          fullName: 'Old Spectator',
          shortName: 'spectator',
          isProperNoun: false
        };

        block.markdownText = 'If the spectator makes a successful saving throw against a spell, or a spell attack misses it, the spectator can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of the spectator. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        const newNames = {
          fullName: 'Old Spectator',
          shortName: '',
          isProperNoun: true
        };

        block.markdownText = 'If Old Spectator makes a successful saving throw against a spell, or a spell attack misses it, Old Spectator can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of Old Spectator. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.';
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
      name: 'Parry',
      text: 'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.'
    };

    sharedSpecs.shouldImportFromOpen5e([block]);
  });

  it('should import single block with multiline text', () => {
    const block = {
      name: 'Multiline Reaction',
      text: '**Line 1**. The dummy is here.\n  **Line 2**. The dummy is there.\n    **Line 3**. The dummy is everywhere.',
      markdownText: '**Line 1**. The dummy is here.  \n>   **Line 2**. The dummy is there.  \n>     **Line 3**. The dummy is everywhere.',
      htmlText: '<strong>Line 1</strong>. The dummy is here.\n  <strong>Line 2</strong>. The dummy is there.\n    <strong>Line 3</strong>. The dummy is everywhere.'
    };

    sharedSpecs.shouldImportFromOpen5e([block]);
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

    sharedSpecs.shouldImportFromOpen5e(blocks);
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with blocks is imported from JSON', () => {
    it('should show the new blocks', () => {
      const blocksToImport = [
        {
          name: 'Parry',
          text: '[NAME] adds 2 to its AC against one melee attack that would hit it. To do so, [NAME] must see the attacker and be wielding a melee weapon.',
          htmlText: 'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.'
        }
      ];

      titleModel.fullName = 'Knight';

      sharedSpecs.shouldShowBlocksImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(blocksToImport);
    });
  });
});