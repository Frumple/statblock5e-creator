import ReactionsSection from './reactions-section.js';
import Reactions from '../../../models/lists/block/reactions.js';
import Creature from '../../../models/creature.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './block-list-section.specs.js';

const expectedHeading = 'Reactions';
const expectedItemType = 'Reaction';

let reactionsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ReactionsSection.define();

  sharedSpecs.setExpectedHeading(expectedHeading);
});

beforeEach(() => {
  Creature.reset();
  Reactions.reset();

  reactionsSection = new ReactionsSection();
  TestCustomElements.initializeSection(reactionsSection);
  reactionsSection.connect();
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
        originalText: '[name] adds 2 to its AC against one melee attack that would hit it. To do so, [name] must see the attacker and be wielding a melee weapon.',
        homebreweryText: 'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.',
        htmlText: 'The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.'
      };

      Creature.fullName = 'Knight';

      sharedSpecs.shouldAddASingleBlock(reactionsSection, block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Multiline Reaction',
        originalText: '**Line 1**. [name] is here.\n  **Line 2**. [name] is there.\n    **Line 3**. [name] is everywhere.',
        homebreweryText: '**Line 1**. The dummy is here.  \n>   **Line 2**. The dummy is there.  \n>     **Line 3**. The dummy is everywhere.',
        htmlText: '<strong>Line 1</strong>. The dummy is here.\n  <strong>Line 2</strong>. The dummy is there.\n    <strong>Line 3</strong>. The dummy is everywhere.'
      };

      Creature.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(reactionsSection, block);
    });

    it('should add a single block with html escaped', () => {
      const block = {
        name: 'Escaped Reaction',
        originalText: '<strong>Line 1</strong>. [name] is here.',
        homebreweryText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.',
        htmlText: '&lt;strong&gt;Line 1&lt;/strong&gt;. The dummy is here.'
      };

      Creature.fullName = 'Dummy';

      sharedSpecs.shouldAddASingleBlock(reactionsSection, block);
    });

    it('should add multiple blocks', () => {
      const blocks = [
        {
          name: 'Reaction 1',
          originalText: 'Reaction Text 1'
        },
        {
          name: 'Reaction 2',
          originalText: 'Reaction __Text__ 2',
          htmlText: 'Reaction <strong>Text</strong> 2'
        },
        {
          name: 'Reaction 3',
          originalText: 'Reaction Text 3'
        }
      ];
      sharedSpecs.shouldAddMultipleBlocks(reactionsSection, blocks);
    });

    it('should add a single block, then remove it', () => {
      const block = {
        name: 'Split',
        originalText: 'When a jelly that is Medium or larger is subjected to lightning or slashing damage, it splits into two new jellies if it has at least 10 hit points. Each new jelly has hit points equal to half the original jelly\'s, rounded down. New jellies are one size smaller than the original jelly.'
      };

      sharedSpecs.shouldAddASingleBlockThenRemoveIt(reactionsSection, block);
    });

    it('should add multiple blocks, then remove one of them', () => {
      const blocks = [
        {
          name: 'Reaction 1',
          originalText: 'Reaction Text 1'
        },
        {
          name: 'Reaction 2',
          originalText: 'Reaction Text 2'
        },
        {
          name: 'Reaction 3',
          originalText: '**Reaction** Text 3',
          htmlText: '<strong>Reaction</strong> Text 3'
        }
      ];
      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(reactionsSection, blocks, 1);
    });

    describe('should reparse the block text', () => {
      const block = {
        name: 'Spell Reflection',
        originalText: 'If [name] makes a successful saving throw against a spell, or a spell attack misses it, [name] can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of [name]. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.',
        homebreweryText: null,
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

        block.homebreweryText = 'If the old spectator makes a successful saving throw against a spell, or a spell attack misses it, the old spectator can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of the old spectator. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(reactionsSection, block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        const newNames = {
          fullName: 'Old Spectator',
          shortName: 'spectator',
          isProperNoun: false
        };

        block.homebreweryText = 'If the spectator makes a successful saving throw against a spell, or a spell attack misses it, the spectator can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of the spectator. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(reactionsSection, block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        const newNames = {
          fullName: 'Old Spectator',
          shortName: '',
          isProperNoun: true
        };

        block.homebreweryText = 'If Old Spectator makes a successful saving throw against a spell, or a spell attack misses it, Old Spectator can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of Old Spectator. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(reactionsSection, block, oldNames, newNames);
      });
    });

    it('should trim all trailing period characters in the block name', () => {
      sharedSpecs.shouldTrimAllTrailingPeriodCharactersInBlockName(reactionsSection);
    });

    it('should display an error if the block name is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockNameIsBlank(reactionsSection, expectedItemType);
    });

    it('should display an error if the block text is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextIsBlank(reactionsSection, expectedItemType);
    });

    it('should display an error if the block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(reactionsSection, expectedItemType);
    });

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(reactionsSection, expectedItemType);
    });

    it('should display errors if the block name is blank and block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(reactionsSection, expectedItemType);
    });
  });
});