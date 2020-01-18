import SpecialTraitsSection from './special-traits-section.js';
import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import * as sharedSpecs from './block-list-section.specs.js';

const expectedItemType = 'Special Trait';

const title = CurrentContext.creature.title;
const specialTraits = CurrentContext.creature.specialTraits;

let specialTraitsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SpecialTraitsSection.define();
});

beforeEach(() => {
  title.reset();
  specialTraits.reset();

  specialTraitsSection = new SpecialTraitsSection();
  TestCustomElements.initializeSection(specialTraitsSection);
  specialTraitsSection.connect();
});

it('section should have default blocks', () => {
  sharedSpecs.sectionShouldHaveDefaultBlocks(specialTraitsSection);
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    specialTraitsSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the add button if there are no blocks', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnAddButtonIfNoBlocks(specialTraitsSection);
  });

  it('should switch to edit mode and focus on the name field of the first block if there is at least one block', () => {
    sharedSpecs.shouldSwitchToEditModeAndFocusOnNameFieldOfFirstBlockIfExists(specialTraitsSection);
  });

  describe('when the add block button is clicked', () => {
    it('should focus on the name field of the newly created block', () => {
      sharedSpecs.shouldFocusOnNameFieldOfNewBlock(specialTraitsSection);
    });
  });

  describe('and blocks are added and/or removed, and the edit section is submitted', () => {
    it('should add a single block', () => {
      const block = {
        name: 'Antimagic Susceptibility',
        originalText: '[name] is incapacitated while in the area of an _antimagic field_. If targeted by *dispel magic*, [name] must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.',
        homebreweryText: 'The armor is incapacitated while in the area of an _antimagic field_. If targeted by *dispel magic*, the armor must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.',
        htmlText: 'The armor is incapacitated while in the area of an <em>antimagic field</em>. If targeted by <em>dispel magic</em>, the armor must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.'
      };

      title.fullName = 'Animated Armor';
      title.shortName = 'armor';

      sharedSpecs.shouldAddASingleBlock(specialTraitsSection, block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Multiple Heads',
        originalText: '[name] has five heads. While it has more than one head, [name] has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.\n  Whenever [name] takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, [name] dies.\n  At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. [name] regains 10 hit points for each head regrown in this way.',
        homebreweryText: 'The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.  \n>   Whenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies.  \n>   At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way.',
        htmlText: 'The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.\n  Whenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies.\n  At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way.'
      };

      title.fullName = 'Hydra';

      sharedSpecs.shouldAddASingleBlock(specialTraitsSection, block);
    });

    it('should add a single block with html escaped', () => {
      const block = {
        name: 'Antimagic Susceptibility',
        originalText: '[name] is incapacitated while in the area of an <em>antimagic field</em>. If targeted by <em>dispel magic</em>, [name] must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.',
        homebreweryText: 'The armor is incapacitated while in the area of an &lt;em&gt;antimagic field&lt;/em&gt;. If targeted by &lt;em&gt;dispel magic&lt;/em&gt;, the armor must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.',
        htmlText: 'The armor is incapacitated while in the area of an &lt;em&gt;antimagic field&lt;/em&gt;. If targeted by &lt;em&gt;dispel magic&lt;/em&gt;, the armor must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.'
      };

      title.fullName = 'Animated Armor';
      title.shortName = 'armor';

      sharedSpecs.shouldAddASingleBlock(specialTraitsSection, block);
    });

    it('should add multiple blocks', () => {
      const blocks = [
        {
          name: 'Keen Hearing and Smell',
          originalText: '[name] has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
          homebreweryText: 'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
          htmlText: 'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.'
        },
        {
          name: 'Pack Tactics',
          originalText: '[name] has advantage on an attack roll against a creature if at least one of the creature\'s allies is within 5 feet of the creature and the ally isn\'t incapacitated.',
          homebreweryText: 'The wolf has advantage on an attack roll against a creature if at least one of the creature\'s allies is within 5 feet of the creature and the ally isn\'t incapacitated.',
          htmlText: 'The wolf has advantage on an attack roll against a creature if at least one of the creature\'s allies is within 5 feet of the creature and the ally isn\'t incapacitated.'
        },
        {
          name: 'Snow Camouflage',
          originalText: '[name] has advantage on Dexterity (Stealth) checks made to hide in snowy terrain.',
          homebreweryText: 'The wolf has advantage on Dexterity (Stealth) checks made to hide in snowy terrain.',
          htmlText: 'The wolf has advantage on Dexterity (Stealth) checks made to hide in snowy terrain.'
        }
      ];

      title.fullName = 'Winter Wolf';
      title.shortName = 'wolf';

      sharedSpecs.shouldAddMultipleBlocks(specialTraitsSection, blocks);
    });

    it('should add a single block, then remove it', () => {
      const block = {
        name: 'Spider Climb',
        originalText: '[name] can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.',
        homebreweryText: 'The jelly can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.',
        htmlText: 'The jelly can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.'
      };

      title.fullName = 'Ochre Jelly';
      title.shortName = 'jelly';

      sharedSpecs.shouldAddASingleBlockThenRemoveIt(specialTraitsSection, block);
    });

    it('should add multiple blocks, then remove one of them', () => {
      const blocks = [
        {
          name: 'Shapechanger',
          originalText: '[name] can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn\'t transformed. It reverts to its true form if it dies.',
          homebreweryText: 'The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn\'t transformed. It reverts to its true form if it dies.',
          htmlText: 'The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn\'t transformed. It reverts to its true form if it dies.'
        },
        {
          name: 'Ambusher',
          originalText: '[name] has advantage on attack rolls against any creature it has surprised.',
          homebreweryText: 'The doppelganger has advantage on attack rolls against any creature it has surprised.',
          htmlText: 'The doppelganger has advantage on attack rolls against any creature it has surprised.'
        },
        {
          name: 'Surprise Attack',
          originalText: 'If [name] surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack.',
          homebreweryText: 'If the doppelganger surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack.',
          htmlText: 'If the doppelganger surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack.'
        }
      ];

      title.fullName = 'Doppelganger';

      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(specialTraitsSection, blocks, 1);
    });

    describe('should reparse the block text', () => {
      const block = {
        name: 'Pack Tactics',
        originalText: '[name] has advantage on an attack roll against a creature if at least one of [name]\'s allies is within 5 feet of the creature an ally isn\'t incapacitated.',
        homebreweryText: null,
        htmlText: null
      };

      const oldNames = {
        fullName: 'Winged Kobold',
        shortName: '',
        isProperNoun: false
      };

      it('when the full name is changed', () => {
        const newNames = {
          fullName: 'Burrowing Kobold',
          shortName: '',
          isProperNoun: false
        };

        block.homebreweryText = 'The burrowing kobold has advantage on an attack roll against a creature if at least one of the burrowing kobold\'s allies is within 5 feet of the creature an ally isn\'t incapacitated.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(specialTraitsSection, block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        const newNames = {
          fullName: 'Winged Kobold',
          shortName: 'kobold',
          isProperNoun: false
        };

        block.homebreweryText = 'The kobold has advantage on an attack roll against a creature if at least one of the kobold\'s allies is within 5 feet of the creature an ally isn\'t incapacitated.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(specialTraitsSection, block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        const newNames = {
          fullName: 'Winged Kobold',
          shortName: '',
          isProperNoun: true
        };

        block.homebreweryText = 'Winged Kobold has advantage on an attack roll against a creature if at least one of Winged Kobold\'s allies is within 5 feet of the creature an ally isn\'t incapacitated.';
        block.htmlText = block.homebreweryText;

        sharedSpecs.shouldReparseNameChanges(specialTraitsSection, block, oldNames, newNames);
      });
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

    it('should display an error if the block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayAnErrorIfBlockTextHasInvalidMarkdownSyntax(specialTraitsSection, expectedItemType);
    });

    it('should display errors if the block name and text are both blank', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameAndTextAreBothBlank(specialTraitsSection, expectedItemType);
    });

    it('should display errors if the block name is blank and block text has invalid markdown syntax', () => {
      sharedSpecs.shouldDisplayErrorsIfBlockNameIsBlankAndBlockTextHasInvalidMarkdownSyntax(specialTraitsSection, expectedItemType);
    });
  });
});