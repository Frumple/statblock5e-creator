import SpecialTraitsSection from './special-traits-section.js';
import GenerateSpellcastingDialog from '../dialogs/generate-spellcasting-dialog.js';
import SpellCategoryBox from '../spell-category-box.js';

import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import BlockListSectionSpecs from './block-list-section.specs.js';

const expectedBlockType = 'Special Trait';
const open5eJsonKey = 'special_abilities';

const titleModel = CurrentContext.creature.title;
const specialTraitsModel = CurrentContext.creature.specialTraits;

let specialTraitsSection;
let sharedSpecs;

beforeAll(async() => {
  await TestCustomElements.define();
  await SpecialTraitsSection.define();
  await GenerateSpellcastingDialog.define();
  await SpellCategoryBox.define();
});

beforeEach(() => {
  titleModel.reset();
  specialTraitsModel.reset();

  specialTraitsSection = new SpecialTraitsSection();
  document.body.appendChild(specialTraitsSection);

  sharedSpecs = new BlockListSectionSpecs(specialTraitsSection, specialTraitsModel, null, open5eJsonKey);
});

it('section should have default blocks', () => {
  sharedSpecs.sectionShouldHaveDefaultBlocks();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    specialTraitsSection.showElements.section.click();
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
        name: 'Antimagic Susceptibility',
        text: '[name] is incapacitated while in the area of an _antimagic field_. If targeted by *dispel magic*, [name] must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.',
        markdownText: 'The armor is incapacitated while in the area of an _antimagic field_. If targeted by *dispel magic*, the armor must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.',
        htmlText: 'The armor is incapacitated while in the area of an <em>antimagic field</em>. If targeted by <em>dispel magic</em>, the armor must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.'
      };

      titleModel.fullName = 'Animated Armor';
      titleModel.shortName = 'armor';

      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add a single block with multiline text', () => {
      const block = {
        name: 'Multiple Heads',
        text: '[name] has five heads. While it has more than one head, [name] has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.\n  Whenever [name] takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, [name] dies.\n  At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. [name] regains 10 hit points for each head regrown in this way.',
        markdownText: 'The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.  \n>   Whenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies.  \n>   At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way.',
        htmlText: 'The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.\n  Whenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies.\n  At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way.'
      };

      titleModel.fullName = 'Hydra';

      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add a single block with html escaped', () => {
      const block = {
        name: 'Antimagic Susceptibility',
        text: '[name] is incapacitated while in the area of an <em>antimagic field</em>. If targeted by <em>dispel magic</em>, [name] must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.',
        markdownText: 'The armor is incapacitated while in the area of an &lt;em&gt;antimagic field&lt;/em&gt;. If targeted by &lt;em&gt;dispel magic&lt;/em&gt;, the armor must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.',
        htmlText: 'The armor is incapacitated while in the area of an &lt;em&gt;antimagic field&lt;/em&gt;. If targeted by &lt;em&gt;dispel magic&lt;/em&gt;, the armor must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.'
      };

      titleModel.fullName = 'Animated Armor';
      titleModel.shortName = 'armor';

      sharedSpecs.shouldAddASingleBlock(block);
    });

    it('should add multiple blocks', () => {
      const blocks = [
        {
          name: 'Keen Hearing and Smell',
          text: '[name] has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
          markdownText: 'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
          htmlText: 'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.'
        },
        {
          name: 'Pack Tactics',
          text: '[name] has advantage on an attack roll against a creature if at least one of the creature\'s allies is within 5 feet of the creature and the ally isn\'t incapacitated.',
          markdownText: 'The wolf has advantage on an attack roll against a creature if at least one of the creature\'s allies is within 5 feet of the creature and the ally isn\'t incapacitated.',
          htmlText: 'The wolf has advantage on an attack roll against a creature if at least one of the creature\'s allies is within 5 feet of the creature and the ally isn\'t incapacitated.'
        },
        {
          name: 'Snow Camouflage',
          text: '[name] has advantage on Dexterity (Stealth) checks made to hide in snowy terrain.',
          markdownText: 'The wolf has advantage on Dexterity (Stealth) checks made to hide in snowy terrain.',
          htmlText: 'The wolf has advantage on Dexterity (Stealth) checks made to hide in snowy terrain.'
        }
      ];

      titleModel.fullName = 'Winter Wolf';
      titleModel.shortName = 'wolf';

      sharedSpecs.shouldAddMultipleBlocks(blocks);
    });

    it('should add a single block, then remove it', () => {
      const block = {
        name: 'Spider Climb',
        text: '[name] can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.',
        markdownText: 'The jelly can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.',
        htmlText: 'The jelly can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.'
      };

      titleModel.fullName = 'Ochre Jelly';
      titleModel.shortName = 'jelly';

      sharedSpecs.shouldAddASingleBlockThenRemoveIt(block);
    });

    it('should add multiple blocks, then remove one of them', () => {
      const blocks = [
        {
          name: 'Shapechanger',
          text: '[name] can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn\'t transformed. It reverts to its true form if it dies.',
          markdownText: 'The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn\'t transformed. It reverts to its true form if it dies.',
          htmlText: 'The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn\'t transformed. It reverts to its true form if it dies.'
        },
        {
          name: 'Ambusher',
          text: '[name] has advantage on attack rolls against any creature it has surprised.',
          markdownText: 'The doppelganger has advantage on attack rolls against any creature it has surprised.',
          htmlText: 'The doppelganger has advantage on attack rolls against any creature it has surprised.'
        },
        {
          name: 'Surprise Attack',
          text: 'If [name] surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack.',
          markdownText: 'If the doppelganger surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack.',
          htmlText: 'If the doppelganger surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack.'
        }
      ];

      titleModel.fullName = 'Doppelganger';

      sharedSpecs.shouldAddMultipleBlocksThenRemoveOneOfThem(blocks, 1);
    });

    describe('should reparse the block text', () => {
      const block = {
        name: 'Pack Tactics',
        text: '[name] has advantage on an attack roll against a creature if at least one of [name]\'s allies is within 5 feet of the creature an ally isn\'t incapacitated.'
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

        block.markdownText = 'The burrowing kobold has advantage on an attack roll against a creature if at least one of the burrowing kobold\'s allies is within 5 feet of the creature an ally isn\'t incapacitated.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(block, oldNames, newNames);
      });

      it('when the short name is changed', () => {
        const newNames = {
          fullName: 'Winged Kobold',
          shortName: 'kobold',
          isProperNoun: false
        };

        block.markdownText = 'The kobold has advantage on an attack roll against a creature if at least one of the kobold\'s allies is within 5 feet of the creature an ally isn\'t incapacitated.';
        block.htmlText = block.markdownText;

        sharedSpecs.shouldReparseNameChanges(block, oldNames, newNames);
      });

      it('when the proper noun is changed', () => {
        const newNames = {
          fullName: 'Winged Kobold',
          shortName: '',
          isProperNoun: true
        };

        block.markdownText = 'Winged Kobold has advantage on an attack roll against a creature if at least one of Winged Kobold\'s allies is within 5 feet of the creature an ally isn\'t incapacitated.';
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
      name: 'Antimagic Susceptibility',
      text: 'The armor is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the armor must succeed on a Constitution saving throw against the caster\'s spell save DC or fall unconscious for 1 minute.'
    };

    sharedSpecs.shouldImportFromOpen5e([block]);
  });

  it('should import single block with multiline text', () => {
    const block = {
      name: 'Multiple Heads',
      text: 'The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.\nWhenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies.\nAt the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way.',
      expectedText: 'The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.\n  Whenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies.\n  At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way.',
      markdownText: 'The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.  \n>   Whenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies.  \n>   At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way.',
      htmlText: 'The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.\n  Whenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all its heads die, the hydra dies.\n  At the end of its turn, it grows two heads for each of its heads that died since its last turn, unless it has taken fire damage since its last turn. The hydra regains 10 hit points for each head regrown in this way.'
    };

    sharedSpecs.shouldImportFromOpen5e([block]);
  });

  it('should import single spellcasting block without bullet characters', () => {
    const block = {
      name: 'Innate Spellcasting',
      text: 'The djinni\'s innate spellcasting ability is Charisma (spell save DC 17, +9 to hit with spell attacks). It can innately cast the following spells, requiring no material components:\n\nAt will: detect evil and good, detect magic, thunderwave\n3/day each: create food and water (can create wine instead of water), tongues, wind walk\n1/day each: conjure elemental (air elemental only), creation, gaseous form, invisibility, major image, plane shift',
      markdownText: 'The djinni\'s innate spellcasting ability is Charisma (spell save DC 17, +9 to hit with spell attacks). It can innately cast the following spells, requiring no material components:  \n>   \n> At will: detect evil and good, detect magic, thunderwave  \n> 3/day each: create food and water (can create wine instead of water), tongues, wind walk  \n> 1/day each: conjure elemental (air elemental only), creation, gaseous form, invisibility, major image, plane shift',
    };

    sharedSpecs.shouldImportFromOpen5e([block]);
  });

  it('should import single spellcasting block with bullet characters', () => {
    const block = {
      name: 'Spellcasting',
      text: 'The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared:\n\n• Cantrips (at will): fire bolt, light, mage hand, prestidigitation\n• 1st level (4 slots): detect magic, mage armor, magic missile, shield\n• 2nd level (3 slots): misty step, suggestion\n• 3rd level (3 slots): counterspell, fireball, fly\n• 4th level (3 slots): greater invisibility, ice storm\n• 5th level (1 slot): cone of cold',
      expectedText: 'The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared:\n\nCantrips (at will): fire bolt, light, mage hand, prestidigitation\n1st level (4 slots): detect magic, mage armor, magic missile, shield\n2nd level (3 slots): misty step, suggestion\n3rd level (3 slots): counterspell, fireball, fly\n4th level (3 slots): greater invisibility, ice storm\n5th level (1 slot): cone of cold',
      markdownText: 'The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared:  \n>   \n> Cantrips (at will): fire bolt, light, mage hand, prestidigitation  \n> 1st level (4 slots): detect magic, mage armor, magic missile, shield  \n> 2nd level (3 slots): misty step, suggestion  \n> 3rd level (3 slots): counterspell, fireball, fly  \n> 4th level (3 slots): greater invisibility, ice storm  \n> 5th level (1 slot): cone of cold',
      htmlText: 'The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared:\n\nCantrips (at will): fire bolt, light, mage hand, prestidigitation\n1st level (4 slots): detect magic, mage armor, magic missile, shield\n2nd level (3 slots): misty step, suggestion\n3rd level (3 slots): counterspell, fireball, fly\n4th level (3 slots): greater invisibility, ice storm\n5th level (1 slot): cone of cold'
    };

    sharedSpecs.shouldImportFromOpen5e([block]);
  });

  it('should import multiple blocks', () => {
    const blocks = [
      {
        name: 'Shapechanger',
        text: 'The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn\'t transformed. It reverts to its true form if it dies.'
      },
      {
        name: 'Ambusher',
        text: 'The doppelganger has advantage on attack rolls against any creature it has surprised.'
      },
      {
        name: 'Surprise Attack',
        text: 'If the doppelganger surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack.'
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
          name: 'Legendary Resistance (3/Day)',
          text: 'If [name] fails a saving throw, it can choose to succeed instead.',
          htmlText: 'If the dragon fails a saving throw, it can choose to succeed instead.'
        }
      ];

      titleModel.fullName = 'Adult Red Dragon';
      titleModel.shortName = 'dragon';

      sharedSpecs.shouldShowBlocksImportedFromJsonIfSectionWasInitiallyEmptyAndNotVisible(blocksToImport);
    });
  });
});