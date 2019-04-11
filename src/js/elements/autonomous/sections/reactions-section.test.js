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
        originalText: '{name} adds 3 to its AC against one melee attack that would hit it. To do so, {name} must see the attacker and be wielding a melee weapon.',
        homebreweryText: 'The gladiator adds 3 to its AC against one melee attack that would hit it. To do so, the gladiator must see the attacker and be wielding a melee weapon.',
        htmlText: 'The gladiator adds 3 to its AC against one melee attack that would hit it. To do so, the gladiator must see the attacker and be wielding a melee weapon.'
      };

      Creature.fullName = 'Gladiator';

      sharedSpecs.shouldAddASingleBlock(reactionsSection, block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Multiline Action',
        originalText: '**Line 1**. {name} is hot.\n  **Line 2**. {name} is cold.\n    **Line 3**. {name} is warm.',
        homebreweryText: '**Line 1**. The dummy is hot.  \n>   **Line 2**. The dummy is cold.  \n>     **Line 3**. The dummy is warm.',
        htmlText: '<strong>Line 1</strong>. The dummy is hot.\n  <strong>Line 2</strong>. The dummy is cold.\n    <strong>Line 3</strong>. The dummy is warm.'
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
        name: 'Shield',
        originalText: 'When a creature makes an attack against the wearer of {name}\'s amulet, {name} grants a +2 bonus to the wearer\'s AC if {name} is within 5 feet of the wearer.',
        homebreweryText: null,
        htmlText: null
      };

      const oldNames = {
        fullName: 'Shield Guardian',
        shortName: '',
        isProperNoun: false
      };

      it('when the full name is changed', () => {
        const newNames = {
          fullName: 'Shield Automaton',
          shortName: '',
          isProperNoun: false
        };

        block.homebreweryText = 'When a creature makes an attack against the wearer of the shield automaton\'s amulet, the shield automaton grants a +2 bonus to the wearer\'s AC if the shield automaton is within 5 feet of the wearer.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(reactionsSection, block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        const newNames = {
          fullName: 'Shield Guardian',
          shortName: 'guardian',
          isProperNoun: false
        };

        block.homebreweryText = 'When a creature makes an attack against the wearer of the guardian\'s amulet, the guardian grants a +2 bonus to the wearer\'s AC if the guardian is within 5 feet of the wearer.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(reactionsSection, block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        const newNames = {
          fullName: 'Shield Guardian',
          shortName: '',
          isProperNoun: true
        };

        block.homebreweryText = 'When a creature makes an attack against the wearer of Shield Guardian\'s amulet, Shield Guardian grants a +2 bonus to the wearer\'s AC if Shield Guardian is within 5 feet of the wearer.';
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