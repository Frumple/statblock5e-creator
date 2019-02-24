import SpecialTraitsSection from '/src/js/elements/autonomous/sections/special-traits-section.js';
import SectionTestMixin from '/src/js/helpers/test/section-test-mixin.js';

import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';
import defineBuiltinCustomElements from '/src/js/helpers/test/define-builtin-custom-elements.js';

import * as sharedSpecs from '/src/js/elements/autonomous/sections/block-list-section.specs.js';

const expectedItemType = 'Special Trait';

let specialTraitsSection;

beforeAll(async() => {
  defineBuiltinCustomElements();
  await SpecialTraitsSection.define();
});

beforeEach(() => {
  specialTraitsSection = new SpecialTraitsSection();
  copyObjectProperties(specialTraitsSection, SectionTestMixin);
  specialTraitsSection.initializeCustomElements();
  specialTraitsSection.forceConnect();
});

afterEach(() => {
  document.clear();
});

describe('when the show section is clicked', () => {
  it('should switch to edit mode and focus on the add button if there are no blocks', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks(specialTraitsSection);
  });

  it('should switch to edit mode and focus on the name field of the first block if there is at least one block', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnFirstNameFieldIfBlockExists(specialTraitsSection);
  });

  describe('and blocks are added and/or removed, and the save button is clicked', () => {
    it('should add a single block', () => {
      const blockName = 'Amphibious';
      const blockText = 'The dragon can breathe air and water.';
      sharedSpecs.shouldAddASingleBlock(specialTraitsSection, blockName, blockText);
    });

    it('should add multiple blocks', () => {
      const blocks = [
        { 
          name: 'Keen Hearing and Smell',
          text: 'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.'
        },
        {
          name: 'Pack Tactics',
          text: 'The wolf has advantage on an attack roll against a creature if at least one of the creature\'s allies is within 5 feet of the creature and the ally isn\'t incapacitated.'
        },
        {
          name: 'Snow Camouflage',
          text: 'The wolf has advantage on Dexterity (Stealth) checks made to hide in snowy terrain.'
        }
      ];
      sharedSpecs.shouldAddMultipleBlocks(specialTraitsSection, blocks);
    });

    it('should add a single block, then remove it', () => {
      const blockName = 'Spider Climb';
      const blockText = 'The jelly can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.';
      sharedSpecs.shouldAddASingleBlockThenRemoveIt(specialTraitsSection, blockName, blockText);   
    });

    it('should add multiple blocks, then remove one of them', () => {
      const blocks = [
        { 
          name: 'Advanced Telepathy',
          text: 'The flumph can perceive the content of any telepathic communication used within 60 feet of it, and it can\'t be surprised by creatures with any form to telepathy.'
        },
        {
          name: 'Prone Deficiency',
          text: 'If the flumph is knocked prone, roll a die. On an odd result, the flumph lands upside-down and is incapacitated. At the end each of its turns, the flumph can make a DC 10 Dexterity saving throw, righting itself and ending the incapacitated condition if it succeeds.'
        },
        {
          name: 'Telepathic Shroud',
          text: 'The flumph is immune to any effect that would sense its emotions or read its thoughts, as well as all diviniation spells.'
        }
      ];
      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(specialTraitsSection, blocks, 1);
    });

    it('should trim all trailing period characters in the block name', () => {
      sharedSpecs.shouldTrimAllTrailingPeriodCharactersInBlockName(specialTraitsSection);
    });

    it('should display an error if the block name is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockNameIsBlank(specialTraitsSection, expectedItemType);
    });

    it('should display an error if the block text is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextIsBlank(specialTraitsSection, expectedItemType);
    });

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(specialTraitsSection, expectedItemType);
    });
  });
});