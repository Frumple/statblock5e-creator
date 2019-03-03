import ReactionsSection from '/src/js/elements/autonomous/sections/reactions-section.js';
import * as TestCustomElements from '/src/js/helpers/test/test-custom-elements.js';

import * as sharedSpecs from '/src/js/elements/autonomous/sections/block-list-section.specs.js';

const expectedItemType = 'Reaction';

let reactionsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ReactionsSection.define();
});

beforeEach(() => {
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
      const blockName = 'Parry';
      const blockText = 'The gladiator adds 3 to its AC against one melee attack that would hit it. To do so, the gladiator must see the attacker and be wielding a melee weapon.';
      sharedSpecs.shouldAddASingleBlock(reactionsSection, blockName, blockText);
    });

    it('should add multiple blocks', () => {
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
          name: 'Reaction 2',
          text: 'Reaction Text 3'
        }
      ];
      sharedSpecs.shouldAddMultipleBlocks(reactionsSection, blocks);
    });

    it('should add a single block, then remove it', () => {
      const blockName = 'Split';
      const blockText = 'When a jelly that is Medium or larger is subjected to lightning or slashing damage, it splits into two new jellies if it has at least 10 hit points. Each new jelly has hit points equal to half the original jelly\'s, rounded down. New jellies are one size smaller than the original jelly.';
      sharedSpecs.shouldAddASingleBlockThenRemoveIt(reactionsSection, blockName, blockText);   
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
          name: 'Reaction 2',
          text: 'Reaction Text 3'
        }
      ];
      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(reactionsSection, blocks, 1);
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

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(reactionsSection, expectedItemType);
    });
  });
});