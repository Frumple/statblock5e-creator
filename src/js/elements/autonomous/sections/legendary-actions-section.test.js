import LegendaryActionsSection from './legendary-actions-section.js';
import LegendaryActions from '../../../stats/lists/block/legendary-actions.js';
import Creature from '../../../stats/creature.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './block-list-section.specs.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const expectedHeading = 'Legendary Actions';
const expectedItemType = 'Legendary Action';

let legendaryActionsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await LegendaryActionsSection.define();

  sharedSpecs.setExpectedHeading(expectedHeading);
});

beforeEach(() => {
  Creature.reset();
  LegendaryActions.reset();

  legendaryActionsSection = new LegendaryActionsSection();
  TestCustomElements.initializeSection(legendaryActionsSection);
  legendaryActionsSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    legendaryActionsSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the add button if there are no blocks', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks(legendaryActionsSection);
  });

  it('should switch to edit mode and focus on the name field of the first block if there is at least one block', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnNameFieldOfFirstBlockIfExists(legendaryActionsSection);
  });

  describe('and the add block button is clicked', () => {
    it('should focus on the name field of the newly created block', () => {
      sharedSpecs.shouldFocusOnNameFieldOfNewBlock(legendaryActionsSection);
    });
  });

  describe('and the description is changed and the edit section is submitted', () => {
    it('should switch to show mode and update the description', () => {
      const newDescription = '{name} can take 3 legendary actions, using the Eye Ray option below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. {name} regains spent legendary actions at the start of its turn.';
      const expectedTextContent = 'The beholder can take 3 legendary actions, using the Eye Ray option below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. The beholder regains spent legendary actions at the start of its turn.';

      Creature.fullName = 'Beholder';

      inputValueAndTriggerEvent(legendaryActionsSection.editElements.description, newDescription);

      legendaryActionsSection.editElements.submitForm();

      expect(legendaryActionsSection).toBeInMode('show');
      expect(legendaryActionsSection.showElements.description).toHaveTextContent(expectedTextContent);
      expectHtmlExportDescription(expectedTextContent);
    });
    
    function expectHtmlExportDescription(expectedText) {
      const htmlExport = legendaryActionsSection.exportToHtml();
      const description = htmlExport.children[1];

      expect(description.tagName).toBe('P');
      expect(description).toHaveTextContent(expectedText);
    }

    it('should display an error if the description is blank', () => {
      inputValueAndTriggerEvent(legendaryActionsSection.editElements.description, '');

      legendaryActionsSection.editElements.submitForm();

      expect(legendaryActionsSection).toBeInMode('edit');
      expect(legendaryActionsSection).toHaveError(
        legendaryActionsSection.editElements.description,
        'Legendary Actions Description cannot be blank.');
    });
  });

  describe('and blocks are added and/or removed, and the edit section is submitted', () => {
    it('should add a single block', () => {
      const blockName = 'Eye Ray';
      const blockText = '{name} uses one random eye ray.';
      const expectedText = 'The beholder uses one random eye ray.';

      Creature.fullName = 'Beholder';

      sharedSpecs.shouldAddASingleBlock(legendaryActionsSection, blockName, blockText, expectedText);
    });

    it('should add multiple blocks', () => {
      const blocks = [
        { 
          name: 'Claw Attack',
          text: '{name} makes one claw attack.',
          expectedText: 'The sphinx makes one claw attack.'
        },
        {
          name: 'Teleport (Costs 2 Actions)',
          text: '{name} magically teleports, along with any equipment it was wearing or carrying, up to 120 feet to an unoccupied space it can see.',
          expectedText: 'The sphinx magically teleports, along with any equipment it was wearing or carrying, up to 120 feet to an unoccupied space it can see.'
        },
        {
          name: 'Cast a Spell (Costs 3 Actions)',
          text: '{name} casts a spell from its list of prepared spells, using a spell slot as normal.',
          expectedText: 'The sphinx casts a spell from its list of prepared spells, using a spell slot as normal.'
        }
      ];

      Creature.fullName = 'Androsphinx';
      Creature.shortName = 'Sphinx';

      sharedSpecs.shouldAddMultipleBlocks(legendaryActionsSection, blocks);
    });

    it('should add a single block, then remove it', () => {
      const blockName = 'Attack';
      const blockText = '{name} makes one attack.';

      Creature.fullName = 'Empyrean';

      sharedSpecs.shouldAddASingleBlockThenRemoveIt(legendaryActionsSection, blockName, blockText);
    });

    it('should add multiple blocks, then remove one of them', () => {
      const blocks = [
        { 
          name: 'Teleport',
          text: '{name} magically teleports, along with any equipment it was wearing or carrying, up to 120 feet to an unoccupied space it can see.',
          expectedText: 'The solar magically teleports, along with any equipment it was wearing or carrying, up to 120 feet to an unoccupied space it can see.'
        },
        {
          name: 'Searing Burst (Costs 2 Actions)',
          text: '{name} emits magical, divine energy. Each creature of its choice in a 10-foot radius must make a DC 23 Dexterity saving throw, taking 14 (4d6) fire damage plus 14 (4d6) radiant damage on a failed save, or half as much damage on a successful one.',
          expectedText: 'The solar emits magical, divine energy. Each creature of its choice in a 10-foot radius must make a DC 23 Dexterity saving throw, taking 14 (4d6) fire damage plus 14 (4d6) radiant damage on a failed save, or half as much damage on a successful one.'
        },
        {
          name: 'Blinding Gaze (Costs 3 Actions)',
          text: '{name} targets one creature it can see within 30 feet of it. If the target can see it, the target must succeed on a DC 15 Constitution saving throw or be blinded until magic such as the *lesser restoration* spell removes the blindness.',
          expectedText: 'The solar targets one creature it can see within 30 feet of it. If the target can see it, the target must succeed on a DC 15 Constitution saving throw or be blinded until magic such as the <em>lesser restoration</em> spell removes the blindness.'
        }
      ];

      Creature.fullName = 'Solar';

      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(legendaryActionsSection, blocks, 1);
    });

    describe('should reparse the block text', () => {
      const blockName = 'Wing Attack (Costs 2 Actions)';
      const blockText = '{name} beats its wings. Each creature within 10 feet of {name} must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. {name} can then fly up to half its flying speed.';

      const oldNames = {
        fullName: 'Adult Green Dragon',
        shortName: '',
        isProperNoun: false
      };

      it('when the full name is changed', () => {
        const newNames = {
          fullName: 'Ancient Green Dragon',
          shortName: '',
          isProperNoun: false
        };

        const expectedText = 'The ancient green dragon beats its wings. Each creature within 10 feet of the ancient green dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The ancient green dragon can then fly up to half its flying speed.';

        sharedSpecs.shouldReparseNameChanges(legendaryActionsSection, blockName, blockText, oldNames, newNames, expectedText);
      });

      it('when the short name is changed', () => {
        const newNames = {
          fullName: 'Adult Green Dragon',
          shortName: 'dragon',
          isProperNoun: false
        };

        const expectedText = 'The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.';

        sharedSpecs.shouldReparseNameChanges(legendaryActionsSection, blockName, blockText, oldNames, newNames, expectedText);
      });

      it('when the proper noun is changed', () => {
        const newNames = {
          fullName: 'Adult Green Dragon',
          shortName: '',
          isProperNoun: true
        };

        const expectedText = 'Adult Green Dragon beats its wings. Each creature within 10 feet of Adult Green Dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. Adult Green Dragon can then fly up to half its flying speed.';

        sharedSpecs.shouldReparseNameChanges(legendaryActionsSection, blockName, blockText, oldNames, newNames, expectedText);
      });
    });

    it('should trim all trailing period characters in the block name', () => {
      sharedSpecs.shouldTrimAllTrailingPeriodCharactersInBlockName(legendaryActionsSection);
    });

    it('should display an error if the block name is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockNameIsBlank(legendaryActionsSection, expectedItemType);
    });

    it('should display an error if the block text is blank', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextIsBlank(legendaryActionsSection, expectedItemType);
    });

    it('should display an error if the block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(legendaryActionsSection, expectedItemType);
    });

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(legendaryActionsSection, expectedItemType);
    });

    it('should display errors if the block name is blank and block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(legendaryActionsSection, expectedItemType);
    });
  });
});