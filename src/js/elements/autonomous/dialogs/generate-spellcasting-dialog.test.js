import SpecialTraitsSection from '../sections/special-traits-section.js';
import GenerateSpellcastingDialog from './generate-spellcasting-dialog.js';

import CurrentContext from '../../../models/current-context.js';
import Spellcasting from '../../../models/spellcasting.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { formatIntegerWithOrdinalIndicator, formatSpellSlotQuantity } from '../../../helpers/string-formatter.js';

import SpellcasterTypes from '../../../data/spellcaster-types.js';

const abilitiesModel = CurrentContext.creature.abilities;
const challengeRatingModel = CurrentContext.creature.challengeRating;
const specialTraitsModel = CurrentContext.creature.specialTraits;

let specialTraitsSection;
let generateSpellcastingDialog;

beforeAll(async() => {
  await TestCustomElements.define();
  await SpecialTraitsSection.define();
  await GenerateSpellcastingDialog.define();
});

beforeEach(() => {
  abilitiesModel.reset();
  challengeRatingModel.reset();
  specialTraitsModel.reset();

  specialTraitsSection = new SpecialTraitsSection();
  TestCustomElements.initializeSection(specialTraitsSection);
  specialTraitsSection.connect();

  generateSpellcastingDialog = specialTraitsSection.editElements.generateSpellcastingDialog;
  generateSpellcastingDialog.connect();
});

describe('when the generate spellcasting dialog is opened', () => {
  beforeEach(() => {
    specialTraitsSection.showElements.section.click();
    specialTraitsSection.editElements.generateSpellcastingButton.click();
  });

  it('should initially have its model and controls set to their defaults, and focus on the spellcaster type field', () => {
    verifyDialogResetToDefaults();
  });

  describe('and the dialog is filled out and the reset button is clicked', () => {
    it('should reset the dialog model and controls back to their defaults, and focus on the spellcaster type field', () => {
      const spellcastingModel = createDummySpellcastingModel();

      setDialogControls(spellcastingModel);

      generateSpellcastingDialog.resetButton.click();

      verifyDialogResetToDefaults();
    });
  });

  describe('and the dialog is submitted and then opened again', () => {
    it('should reset the dialog model and controls back to their defaults, and focus on the spellcaster type field', () => {
      const spellcastingModel = createDummySpellcastingModel();

      setDialogControls(spellcastingModel);

      generateSpellcastingDialog.generateSpellcastingButton.click();
      specialTraitsSection.editElements.generateSpellcastingButton.click();

      verifyDialogResetToDefaults();
    });
  });

  describe('and the dialog fields are populated and then the spellcaster type is changed', () => {
    it('should clear all spells', () => {
      const originalModel = createDummySpellcastingModel();

      const modifiedModel = createDummySpellcastingModel();
      modifiedModel.spellcasterType = 'cleric';
      modifiedModel.spellcasterAbility = 'wisdom';
      modifiedModel.clearAllSpells();

      const expectedGeneratedText = '[name] is a 18th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC sdc[wis], atk[wis] to hit with spell attacks). [name] has the following cleric spells prepared:\n\nCantrips (at will): \n1st level (4 slots): \n2nd level (3 slots): \n3rd level (3 slots): \n4th level (3 slots): \n5th level (3 slots): \n6th level (1 slot): \n7th level (1 slot): \n8th level (1 slot): \n9th level (1 slot): ';
      const expectedRenderedText = 'The commoner is a 18th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 10, +2 to hit with spell attacks). The commoner has the following cleric spells prepared:\n\nCantrips (at will): \n1st level (4 slots): \n2nd level (3 slots): \n3rd level (3 slots): \n4th level (3 slots): \n5th level (3 slots): \n6th level (1 slot): \n7th level (1 slot): \n8th level (1 slot): \n9th level (1 slot): ';

      setDialogControls(originalModel);

      inputValueAndTriggerEvent(generateSpellcastingDialog.spellcasterTypeSelect, modifiedModel.spellcasterType);

      verifyDialogModel(modifiedModel, expectedGeneratedText);
      verifyDialogControls(modifiedModel, expectedRenderedText);
    });
  });

  describe('and the dialog fields are populated and then the spellcaster level is changed and changed back', () => {
    it('should retain all spells', () => {
      const originalModel = createDummySpellcastingModel();

      const modifiedModel = createDummySpellcastingModel();
      modifiedModel.spellcasterLevel = 9;

      const expectedGeneratedText = '[name] is a 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC sdc[int], atk[int] to hit with spell attacks). [name] has the following wizard spells prepared:\n\nCantrips (at will): *fire bolt*, *light*, *mage hand*, *prestidigitation*, *shocking grasp*\n1st level (4 slots): *detect magic*, *identify*, *mage armor*, *magic missile*\n2nd level (3 slots): *detect thoughts*, *mirror image*, *misty step*\n3rd level (3 slots): *counterspell*, *fly*, *lightning bolt*\n4th level (3 slots): *banishment*, *fire shield*, *stoneskin*\n5th level (3 slots): *cone of cold*, *scrying*, *wall of force*\n6th level (1 slot): *globe of invulnerability*\n7th level (1 slot): *teleport*\n8th level (1 slot): *mind blank*\n9th level (1 slot): *time stop*';
      const expectedRenderedText = 'The commoner is a 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 10, +2 to hit with spell attacks). The commoner has the following wizard spells prepared:\n\nCantrips (at will): <em>fire bolt</em>, <em>light</em>, <em>mage hand</em>, <em>prestidigitation</em>, <em>shocking grasp</em>\n1st level (4 slots): <em>detect magic</em>, <em>identify</em>, <em>mage armor</em>, <em>magic missile</em>\n2nd level (3 slots): <em>detect thoughts</em>, <em>mirror image</em>, <em>misty step</em>\n3rd level (3 slots): <em>counterspell</em>, <em>fly</em>, <em>lightning bolt</em>\n4th level (3 slots): <em>banishment</em>, <em>fire shield</em>, <em>stoneskin</em>\n5th level (3 slots): <em>cone of cold</em>, <em>scrying</em>, <em>wall of force</em>\n6th level (1 slot): <em>globe of invulnerability</em>\n7th level (1 slot): <em>teleport</em>\n8th level (1 slot): <em>mind blank</em>\n9th level (1 slot): <em>time stop</em>';

      setDialogControls(originalModel);

      inputValueAndTriggerEvent(generateSpellcastingDialog.spellcasterLevelInput, modifiedModel.spellcasterLevel);
      inputValueAndTriggerEvent(generateSpellcastingDialog.spellcasterLevelInput, originalModel.spellcasterLevel);

      verifyDialogModel(originalModel, expectedGeneratedText);
      verifyDialogControls(originalModel, expectedRenderedText);
    });
  });

  describe('and the dialog is submitted with a blank spellcaster level', () => {
    it('should display an error', () => {
      inputValueAndTriggerEvent(generateSpellcastingDialog.spellcasterLevelInput, '');

      generateSpellcastingDialog.generateSpellcastingButton.click();

      expect(generateSpellcastingDialog).toHaveError(
        generateSpellcastingDialog.spellcasterLevelInput,
        'Spellcaster Level must be a valid number.');
    });
  });

  describe('and the dialog is submitted for an innate spellcaster, it should add a new spellcasting block under special traits', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.skip.each
    `
      description                   | level | abilityName       | abilityScore | proficiencyBonus | atWillSpells | threePerDaySpells | twoPerDaySpells | onePerDaySpells | expectedGeneratedText | expectedRenderedText
      ${'Deep Gnome (Svirfneblin)'} | ${1}  | ${'intelligence'} | ${12}        | ${2}             | ${[]}        | ${[]}             | ${[]}           | ${[]}           | ${''}                 | ${''}
    `
    ('$description',
    ({level, abilityName, abilityScore, proficiencyBonus, atWillSpells, threePerDaySpells, twoPerDaySpells, onePerDaySpells, expectedGeneratedText, expectedRenderedText}) => {
      abilitiesModel.abilities[abilityName].score = abilityScore;
      challengeRatingModel.proficiencyBonus = proficiencyBonus;

      const spellcastingModel = new Spellcasting();
      spellcastingModel.spellcasterType = 'innate';
      spellcastingModel.spellcasterAbility = abilityName;
      spellcastingModel.spellcasterLevel = level;

      spellcastingModel.spellCategories[0].spells = atWillSpells;
      spellcastingModel.spellCategories[1].spells = threePerDaySpells;
      spellcastingModel.spellCategories[2].spells = twoPerDaySpells;
      spellcastingModel.spellCategories[3].spells = onePerDaySpells;

      setDialogControls(spellcastingModel, true);

      verifyDialogModel(spellcastingModel, expectedGeneratedText);
      verifyDialogControls(spellcastingModel, expectedRenderedText);

      generateSpellcastingDialog.generateSpellcastingButton.click();

      verifySpecialTraitBlocks(spellcastingModel.spellcasterType, expectedGeneratedText, expectedRenderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('and the dialog is submitted for a bard spellcaster, it should add a new spellcasting block under special traits', () => {
    /* eslint-disable indent, no-unexpected-multiline, no-unused-vars */
    it.each
    `
      description        | level | abilityScore | proficiencyBonus | cantrips                                                  | level1Spells                                                                                      | level2Spells                                      | level3Spells                             | level4Spells                                     | level5Spells                                       | level6Spells                                         | level7Spells                               | level8Spells    | level9Spells           | expectedGeneratedText                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | expectedRenderedText
      ${'Level 1 Bard'}  | ${1}  | ${12}        | ${2}             | ${['friends', 'vicious mockery']}                         | ${['dissonant whispers', 'healing word', 'heroism', 'Tasha\'s hideous laughter']}                 | ${[]}                                             | ${[]}                                    | ${[]}                                            | ${[]}                                              | ${[]}                                                | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 1st-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *vicious mockery*\n1st level (2 slots): *dissonant whispers*, *healing word*, *heroism*, *Tasha\'s hideous laughter*'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${'The commoner is a 1st-level spellcaster. Its spellcasting ability is Charisma (spell save DC 11, +3 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>vicious mockery</em>\n1st level (2 slots): <em>dissonant whispers</em>, <em>healing word</em>, <em>heroism</em>, <em>Tasha\'s hideous laughter</em>'}
      ${'Level 2 Bard'}  | ${2}  | ${12}        | ${2}             | ${['friends', 'vicious mockery']}                         | ${['charm person', 'dissonant whispers', 'healing word', 'heroism', 'Tasha\'s hideous laughter']} | ${[]}                                             | ${[]}                                    | ${[]}                                            | ${[]}                                              | ${[]}                                                | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 2nd-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *vicious mockery*\n1st level (3 slots): *charm person*, *dissonant whispers*, *healing word*, *heroism*, *Tasha\'s hideous laughter*'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${'The commoner is a 2nd-level spellcaster. Its spellcasting ability is Charisma (spell save DC 11, +3 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>vicious mockery</em>\n1st level (3 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>heroism</em>, <em>Tasha\'s hideous laughter</em>'}
      ${'Level 3 Bard'}  | ${3}  | ${12}        | ${2}             | ${['friends', 'vicious mockery']}                         | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'suggestion']}             | ${[]}                                    | ${[]}                                            | ${[]}                                              | ${[]}                                                | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 3rd-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (2 slots): *crown of madness*, *suggestion*'}                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ${'The commoner is a 3rd-level spellcaster. Its spellcasting ability is Charisma (spell save DC 11, +3 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (2 slots): <em>crown of madness</em>, <em>suggestion</em>'}
      ${'Level 4 Bard'}  | ${4}  | ${14}        | ${2}             | ${['friends', 'message', 'vicious mockery']}              | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'enthrall', 'suggestion']} | ${[]}                                    | ${[]}                                            | ${[]}                                              | ${[]}                                                | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 4th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*'}                                                                                                                                                                                                                                                                                                                                                                                                                                   | ${'The commoner is a 4th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 12, +4 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>'}
      ${'Level 5 Bard'}  | ${5}  | ${14}        | ${3}             | ${['friends', 'message', 'vicious mockery']}              | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'enthrall', 'suggestion']} | ${['stinking cloud']}                    | ${[]}                                            | ${[]}                                              | ${[]}                                                | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 5th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (2 slots): *stinking cloud*'}                                                                                                                                                                                                                                                                                                                                                                                            | ${'The commoner is a 5th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 13, +5 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (2 slots): <em>stinking cloud</em>'}
      ${'Level 6 Bard'}  | ${6}  | ${14}        | ${3}             | ${['friends', 'message', 'vicious mockery']}              | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud']}            | ${[]}                                            | ${[]}                                              | ${[]}                                                | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 6th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*'}                                                                                                                                                                                                                                                                                                                                                                                    | ${'The commoner is a 6th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 13, +5 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>'}
      ${'Level 7 Bard'}  | ${7}  | ${14}        | ${3}             | ${['friends', 'message', 'vicious mockery']}              | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud']}            | ${['compulsion']}                                | ${[]}                                              | ${[]}                                                | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 7th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*\n4th level (1 slot): *compulsion*'}                                                                                                                                                                                                                                                                                                                                                  | ${'The commoner is a 7th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 13, +5 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>\n4th level (1 slot): <em>compulsion</em>'}
      ${'Level 8 Bard'}  | ${8}  | ${16}        | ${3}             | ${['friends', 'message', 'vicious mockery']}              | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud']}            | ${['compulsion', 'polymorph']}                   | ${[]}                                              | ${[]}                                                | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 8th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*\n4th level (2 slots): *compulsion*, *polymorph*'}                                                                                                                                                                                                                                                                                                                                    | ${'The commoner is a 8th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 14, +6 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>\n4th level (2 slots): <em>compulsion</em>, <em>polymorph</em>'}
      ${'Level 9 Bard'}  | ${9}  | ${16}        | ${4}             | ${['friends', 'message', 'vicious mockery']}              | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud']}            | ${['compulsion', 'polymorph']}                   | ${['modify memory']}                               | ${[]}                                                | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 9th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*\n4th level (3 slots): *compulsion*, *polymorph*\n5th level (1 slot): *modify memory*'}                                                                                                                                                                                                                                                                                               | ${'The commoner is a 9th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 15, +7 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>\n4th level (3 slots): <em>compulsion</em>, <em>polymorph</em>\n5th level (1 slot): <em>modify memory</em>'}
      ${'Level 10 Bard'} | ${10} | ${16}        | ${4}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'polymorph']}                   | ${['mislead', 'modify memory']}                    | ${[]}                                                | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 10th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *polymorph*\n5th level (2 slots): *mislead*, *modify memory*'}                                                                                                                                                                                                                                                          | ${'The commoner is a 10th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 15, +7 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>polymorph</em>\n5th level (2 slots): <em>mislead</em>, <em>modify memory</em>'}
      ${'Level 11 Bard'} | ${11} | ${16}        | ${4}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'polymorph']}                   | ${['mislead', 'modify memory']}                    | ${['Otto\'s irresistible dance']}                    | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 11th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *polymorph*\n5th level (2 slots): *mislead*, *modify memory*\n6th level (1 slot): *Otto\'s irresistible dance*'}                                                                                                                                                                                                        | ${'The commoner is a 11th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 15, +7 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>polymorph</em>\n5th level (2 slots): <em>mislead</em>, <em>modify memory</em>\n6th level (1 slot): <em>Otto\'s irresistible dance</em>'}
      ${'Level 12 Bard'} | ${12} | ${18}        | ${4}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'polymorph']}                   | ${['mislead', 'modify memory']}                    | ${['Otto\'s irresistible dance']}                    | ${[]}                                      | ${[]}           | ${[]}                  | ${'[name] is a 12th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *polymorph*\n5th level (2 slots): *mislead*, *modify memory*\n6th level (1 slot): *Otto\'s irresistible dance*'}                                                                                                                                                                                                        | ${'The commoner is a 12th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 16, +8 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>polymorph</em>\n5th level (2 slots): <em>mislead</em>, <em>modify memory</em>\n6th level (1 slot): <em>Otto\'s irresistible dance</em>'}
      ${'Level 13 Bard'} | ${13} | ${18}        | ${5}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'Tasha\'s hideous laughter']}            | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'polymorph']}                   | ${['mislead', 'modify memory']}                    | ${['Otto\'s irresistible dance']}                    | ${['Mordenkainen\'s Magnificent Mansion']} | ${[]}           | ${[]}                  | ${'[name] is a 13th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *polymorph*\n5th level (2 slots): *mislead*, *modify memory*\n6th level (1 slot): *Otto\'s irresistible dance*\n7th level (1 slot): *Mordenkainen\'s Magnificent Mansion*'}                                                                                                                                             | ${'The commoner is a 13th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 17, +9 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>polymorph</em>\n5th level (2 slots): <em>mislead</em>, <em>modify memory</em>\n6th level (1 slot): <em>Otto\'s irresistible dance</em>\n7th level (1 slot): <em>Mordenkainen\'s Magnificent Mansion</em>'}
      ${'Level 14 Bard'} | ${14} | ${18}        | ${5}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'heroism', 'Tasha\'s hideous laughter']} | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'dimension door', 'polymorph']} | ${['mislead', 'modify memory']}                    | ${['Otto\'s irresistible dance']}                    | ${['Mordenkainen\'s Magnificent Mansion']} | ${[]}           | ${[]}                  | ${'[name] is a 14th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *heroism*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *dimension door*, *polymorph*\n5th level (2 slots): *mislead*, *modify memory*\n6th level (1 slot): *Otto\'s irresistible dance*\n7th level (1 slot): *Mordenkainen\'s Magnificent Mansion*'}                                                                                                                | ${'The commoner is a 14th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 17, +9 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>heroism</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>dimension door</em>, <em>polymorph</em>\n5th level (2 slots): <em>mislead</em>, <em>modify memory</em>\n6th level (1 slot): <em>Otto\'s irresistible dance</em>\n7th level (1 slot): <em>Mordenkainen\'s Magnificent Mansion</em>'}
      ${'Level 15 Bard'} | ${15} | ${18}        | ${5}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'heroism', 'Tasha\'s hideous laughter']} | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'dimension door', 'polymorph']} | ${['mislead', 'modify memory']}                    | ${['Otto\'s irresistible dance']}                    | ${['Mordenkainen\'s Magnificent Mansion']} | ${['glibness']} | ${[]}                  | ${'[name] is a 15th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *heroism*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *dimension door*, *polymorph*\n5th level (2 slots): *mislead*, *modify memory*\n6th level (1 slot): *Otto\'s irresistible dance*\n7th level (1 slot): *Mordenkainen\'s Magnificent Mansion*\n8th level (1 slot): *glibness*'}                                                                                | ${'The commoner is a 15th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 17, +9 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>heroism</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>dimension door</em>, <em>polymorph</em>\n5th level (2 slots): <em>mislead</em>, <em>modify memory</em>\n6th level (1 slot): <em>Otto\'s irresistible dance</em>\n7th level (1 slot): <em>Mordenkainen\'s Magnificent Mansion</em>\n8th level (1 slot): <em>glibness</em>'}
      ${'Level 16 Bard'} | ${16} | ${18}        | ${5}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'heroism', 'Tasha\'s hideous laughter']} | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'dimension door', 'polymorph']} | ${['mislead', 'modify memory']}                    | ${['Otto\'s irresistible dance']}                    | ${['Mordenkainen\'s Magnificent Mansion']} | ${['glibness']} | ${[]}                  | ${'[name] is a 16th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *heroism*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *dimension door*, *polymorph*\n5th level (2 slots): *mislead*, *modify memory*\n6th level (1 slot): *Otto\'s irresistible dance*\n7th level (1 slot): *Mordenkainen\'s Magnificent Mansion*\n8th level (1 slot): *glibness*'}                                                                                | ${'The commoner is a 16th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 17, +9 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>heroism</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>dimension door</em>, <em>polymorph</em>\n5th level (2 slots): <em>mislead</em>, <em>modify memory</em>\n6th level (1 slot): <em>Otto\'s irresistible dance</em>\n7th level (1 slot): <em>Mordenkainen\'s Magnificent Mansion</em>\n8th level (1 slot): <em>glibness</em>'}
      ${'Level 17 Bard'} | ${17} | ${20}        | ${6}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'heroism', 'Tasha\'s hideous laughter']} | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'dimension door', 'polymorph']} | ${['mislead', 'modify memory']}                    | ${['Otto\'s irresistible dance']}                    | ${['Mordenkainen\'s Magnificent Mansion']} | ${['glibness']} | ${['power word heal']} | ${'[name] is a 17th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *heroism*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *dimension door*, *polymorph*\n5th level (2 slots): *mislead*, *modify memory*\n6th level (1 slot): *Otto\'s irresistible dance*\n7th level (1 slot): *Mordenkainen\'s Magnificent Mansion*\n8th level (1 slot): *glibness*\n9th level (1 slot): *power word heal*'}                                         | ${'The commoner is a 17th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 19, +11 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>heroism</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>dimension door</em>, <em>polymorph</em>\n5th level (2 slots): <em>mislead</em>, <em>modify memory</em>\n6th level (1 slot): <em>Otto\'s irresistible dance</em>\n7th level (1 slot): <em>Mordenkainen\'s Magnificent Mansion</em>\n8th level (1 slot): <em>glibness</em>\n9th level (1 slot): <em>power word heal</em>'}
      ${'Level 18 Bard'} | ${18} | ${20}        | ${6}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'heroism', 'Tasha\'s hideous laughter']} | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'dimension door', 'polymorph']} | ${['dominate person', 'mislead', 'modify memory']} | ${['mass suggestion', 'Otto\'s irresistible dance']} | ${['Mordenkainen\'s Magnificent Mansion']} | ${['glibness']} | ${['power word heal']} | ${'[name] is a 18th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *heroism*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *dimension door*, *polymorph*\n5th level (3 slots): *dominate person*, *mislead*, *modify memory*\n6th level (1 slot): *mass suggestion*, *Otto\'s irresistible dance*\n7th level (1 slot): *Mordenkainen\'s Magnificent Mansion*\n8th level (1 slot): *glibness*\n9th level (1 slot): *power word heal*'}   | ${'The commoner is a 18th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 19, +11 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>heroism</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>dimension door</em>, <em>polymorph</em>\n5th level (3 slots): <em>dominate person</em>, <em>mislead</em>, <em>modify memory</em>\n6th level (1 slot): <em>mass suggestion</em>, <em>Otto\'s irresistible dance</em>\n7th level (1 slot): <em>Mordenkainen\'s Magnificent Mansion</em>\n8th level (1 slot): <em>glibness</em>\n9th level (1 slot): <em>power word heal</em>'}
      ${'Level 19 Bard'} | ${19} | ${22}        | ${6}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'heroism', 'Tasha\'s hideous laughter']} | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'dimension door', 'polymorph']} | ${['dominate person', 'mislead', 'modify memory']} | ${['mass suggestion', 'Otto\'s irresistible dance']} | ${['Mordenkainen\'s Magnificent Mansion']} | ${['glibness']} | ${['power word heal']} | ${'[name] is a 19th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *heroism*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *dimension door*, *polymorph*\n5th level (3 slots): *dominate person*, *mislead*, *modify memory*\n6th level (2 slots): *mass suggestion*, *Otto\'s irresistible dance*\n7th level (1 slot): *Mordenkainen\'s Magnificent Mansion*\n8th level (1 slot): *glibness*\n9th level (1 slot): *power word heal*'}  | ${'The commoner is a 19th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 20, +12 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>heroism</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>dimension door</em>, <em>polymorph</em>\n5th level (3 slots): <em>dominate person</em>, <em>mislead</em>, <em>modify memory</em>\n6th level (2 slots): <em>mass suggestion</em>, <em>Otto\'s irresistible dance</em>\n7th level (1 slot): <em>Mordenkainen\'s Magnificent Mansion</em>\n8th level (1 slot): <em>glibness</em>\n9th level (1 slot): <em>power word heal</em>'}
      ${'Level 20 Bard'} | ${20} | ${22}        | ${6}             | ${['friends', 'mage hand', 'message', 'vicious mockery']} | ${['charm person', 'dissonant whispers', 'healing word', 'heroism', 'Tasha\'s hideous laughter']} | ${['crown of madness', 'enthrall', 'suggestion']} | ${['fear', 'stinking cloud', 'tongues']} | ${['compulsion', 'dimension door', 'polymorph']} | ${['dominate person', 'mislead', 'modify memory']} | ${['mass suggestion', 'Otto\'s irresistible dance']} | ${['Mordenkainen\'s Magnificent Mansion']} | ${['glibness']} | ${['power word heal']} | ${'[name] is a 20th-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following bard spells prepared:\n\nCantrips (at will): *friends*, *mage hand*, *message*, *vicious mockery*\n1st level (4 slots): *charm person*, *dissonant whispers*, *healing word*, *heroism*, *Tasha\'s hideous laughter*\n2nd level (3 slots): *crown of madness*, *enthrall*, *suggestion*\n3rd level (3 slots): *fear*, *stinking cloud*, *tongues*\n4th level (3 slots): *compulsion*, *dimension door*, *polymorph*\n5th level (3 slots): *dominate person*, *mislead*, *modify memory*\n6th level (2 slots): *mass suggestion*, *Otto\'s irresistible dance*\n7th level (2 slots): *Mordenkainen\'s Magnificent Mansion*\n8th level (1 slot): *glibness*\n9th level (1 slot): *power word heal*'} | ${'The commoner is a 20th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 20, +12 to hit with spell attacks). The commoner has the following bard spells prepared:\n\nCantrips (at will): <em>friends</em>, <em>mage hand</em>, <em>message</em>, <em>vicious mockery</em>\n1st level (4 slots): <em>charm person</em>, <em>dissonant whispers</em>, <em>healing word</em>, <em>heroism</em>, <em>Tasha\'s hideous laughter</em>\n2nd level (3 slots): <em>crown of madness</em>, <em>enthrall</em>, <em>suggestion</em>\n3rd level (3 slots): <em>fear</em>, <em>stinking cloud</em>, <em>tongues</em>\n4th level (3 slots): <em>compulsion</em>, <em>dimension door</em>, <em>polymorph</em>\n5th level (3 slots): <em>dominate person</em>, <em>mislead</em>, <em>modify memory</em>\n6th level (2 slots): <em>mass suggestion</em>, <em>Otto\'s irresistible dance</em>\n7th level (2 slots): <em>Mordenkainen\'s Magnificent Mansion</em>\n8th level (1 slot): <em>glibness</em>\n9th level (1 slot): <em>power word heal</em>'}
    `
    ('$description',
    ({level, abilityScore, proficiencyBonus, cantrips, level1Spells, level2Spells, level3Spells, level4Spells, level5Spells, level6Spells, level7Spells, level8Spells, level9Spells, expectedGeneratedText, expectedRenderedText}) => {
      const abilityName = 'charisma';

      abilitiesModel.abilities[abilityName].score = abilityScore;
      challengeRatingModel.proficiencyBonus = proficiencyBonus;

      const spellcastingModel = new Spellcasting();
      spellcastingModel.spellcasterType = 'bard';
      spellcastingModel.spellcasterAbility = abilityName;
      spellcastingModel.spellcasterLevel = level;

      spellcastingModel.spellCategories[0].spells = cantrips;
      for (let spellLevel = 1; spellLevel <= 9; spellLevel++) {
        spellcastingModel.spellCategories[spellLevel].spells = eval(`level${spellLevel}Spells`);
      }

      setDialogControls(spellcastingModel);

      verifyDialogModel(spellcastingModel, expectedGeneratedText);
      verifyDialogControls(spellcastingModel, expectedRenderedText);

      generateSpellcastingDialog.generateSpellcastingButton.click();

      verifySpecialTraitBlocks(spellcastingModel.spellcasterType, expectedGeneratedText, expectedRenderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline, no-unused-vars */
  });

  describe('and the dialog is submitted for a cleric spellcaster, it should add a new spellcasting block under special traits', () => {

  });

  describe('and the dialog is submitted for a druid spellcaster, it should add a new spellcasting block under special traits', () => {

  });

  describe('and the dialog is submitted for a paladin spellcaster, it should add a new spellcasting block under special traits', () => {

  });

  describe('and the dialog is submitted for a ranger spellcaster, it should add a new spellcasting block under special traits', () => {

  });

  describe('and the dialog is submitted for a sorcerer spellcaster, it should add a new spellcasting block under special traits', () => {

  });

  describe('and the dialog is submitted for a warlock spellcaster, it should add a new spellcasting block under special traits', () => {

  });

  describe('and the dialog is submitted for a wizard spellcaster, it should add a new spellcasting block under special traits', () => {

  });
});

function createDummySpellcastingModel() {
  const spellcastingModel = new Spellcasting();

  spellcastingModel.spellcasterType = 'wizard';
  spellcastingModel.spellcasterAbility = 'intelligence';
  spellcastingModel.spellcasterLevel = 18;

  spellcastingModel.spellCategories[0].spells = ['fire bolt', 'light', 'mage hand', 'prestidigitation', 'shocking grasp'];
  spellcastingModel.spellCategories[1].spells = ['detect magic', 'identify', 'mage armor', 'magic missile'];
  spellcastingModel.spellCategories[2].spells = ['detect thoughts', 'mirror image', 'misty step'];
  spellcastingModel.spellCategories[3].spells = ['counterspell', 'fly', 'lightning bolt'];
  spellcastingModel.spellCategories[4].spells = ['banishment', 'fire shield', 'stoneskin'];
  spellcastingModel.spellCategories[5].spells = ['cone of cold', 'scrying', 'wall of force'];
  spellcastingModel.spellCategories[6].spells = ['globe of invulnerability'];
  spellcastingModel.spellCategories[7].spells = ['teleport'];
  spellcastingModel.spellCategories[8].spells = ['mind blank'];
  spellcastingModel.spellCategories[9].spells = ['time stop'];

  return spellcastingModel;
}

function setDialogControls(spellcastingModel, setSpellcasterAbility = false) {
  inputValueAndTriggerEvent(generateSpellcastingDialog.spellcasterTypeSelect, spellcastingModel.spellcasterType);

  // When the Spellcaster Type is changed, the Spellcaster Ability is
  // automatically set to the corresponding value. If we need to manually set
  // it to some other ability, set 'setSpellcasterAbility' to true.
  if (setSpellcasterAbility) {
    inputValueAndTriggerEvent(generateSpellcastingDialog.spellcasterAbilitySelect, spellcastingModel.spellcasterAbility);
  }

  inputValueAndTriggerEvent(generateSpellcastingDialog.spellcasterLevelInput, spellcastingModel.spellcasterLevel);

  for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
    const propertyList = generateSpellcastingDialog.spellCategoryBoxes[spellLevel].propertyList;
    const spells = spellcastingModel.spellCategories[spellLevel].spells;

    for (const spell of spells) {
      propertyList.input.value = spell;
      propertyList.addButton.click();
    }
  }
}

function verifyDialogModel(expectedModel, expectedGeneratedText) {
  const spellcastingModel = generateSpellcastingDialog.spellcastingModel;

  expect(spellcastingModel.spellcasterType).toBe(expectedModel.spellcasterType);
  expect(spellcastingModel.spellcasterAbility).toBe(expectedModel.spellcasterAbility);
  expect(spellcastingModel.spellcasterLevel).toBe(expectedModel.spellcasterLevel);

  for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
    const spellCategory = spellcastingModel.spellCategories[spellLevel];
    const expectedSpellCategory = expectedModel.spellCategories[spellLevel];

    expectedSpellCategory.level = spellLevel;
    verifyDialogModelSpellCategory(spellCategory, expectedSpellCategory);
  }

  expect(spellcastingModel.generatedText).toBe(expectedGeneratedText);
}

function verifyDialogModelSpellCategory(spellCategory, expectedSpellCategory) {
  expect(spellCategory.isEnabled).toBe(expectedSpellCategory.isEnabled);
  expect(spellCategory.level).toBe(expectedSpellCategory.level);
  expect(spellCategory.spells).toStrictEqual(expectedSpellCategory.spells);
}

function verifyDialogControls(expectedModel, expectedRenderedText) {
  expect(generateSpellcastingDialog.spellcasterTypeSelect.value).toBe(expectedModel.spellcasterType);
  expect(generateSpellcastingDialog.spellcasterAbilitySelect.value).toBe(expectedModel.spellcasterAbility);
  expect(generateSpellcastingDialog.spellcasterLevelInput.valueAsInt).toBe(expectedModel.spellcasterLevel);

  if (expectedModel.spellcasterType === 'innate') {
    for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
      const expectedSpellCategory = expectedModel.spellCategories[spellLevel];
      const spellCategoryBox = generateSpellcastingDialog.spellCategoryBoxes[spellLevel];

      switch(spellLevel) {
      case 0:
        expect(spellCategoryBox.disabled).toBe(false);
        expect(spellCategoryBox.heading.textContent).toBe('At will');
        break;
      case 1:
        expect(spellCategoryBox.disabled).toBe(false);
        expect(spellCategoryBox.heading.textContent).toBe('3/day each');
        break;
      case 2:
        expect(spellCategoryBox.disabled).toBe(false);
        expect(spellCategoryBox.heading.textContent).toBe('2/day each');
        break;
      case 3:
        expect(spellCategoryBox.disabled).toBe(false);
        expect(spellCategoryBox.heading.textContent).toBe('1/day each');
        break;
      default:
        expect(spellCategoryBox.disabled).toBe(true);
        expect(spellCategoryBox.heading.textContent).toBe('');
      }

      expect(spellCategoryBox.propertyList.itemsAsText).toStrictEqual(expectedSpellCategory.spells);
    }
  } else {
    const expectedSpellSlots = SpellcasterTypes[expectedModel.spellcasterType].levels[expectedModel.spellcasterLevel].spellSlots;

    for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
      const expectedSpellCategory = expectedModel.spellCategories[spellLevel];
      const spellCategoryBox = generateSpellcastingDialog.spellCategoryBoxes[spellLevel];

      if (spellLevel === 0) {
        expect(spellCategoryBox.disabled).toBe(false);
        expect(spellCategoryBox.heading.textContent).toBe('Cantrips (at will)');
      } else if (spellLevel <= expectedSpellSlots.length) {
        const expectedSlotQuantity = expectedSpellSlots[spellLevel - 1];
        const formattedSlotQuantity = formatSpellSlotQuantity(expectedSlotQuantity);
        const formattedSpellLevel = formatIntegerWithOrdinalIndicator(spellLevel);

        expect(spellCategoryBox.disabled).toBe(false);
        expect(spellCategoryBox.heading.textContent).toBe(`${formattedSpellLevel} level (${formattedSlotQuantity})`);
      } else {
        expect(spellCategoryBox.disabled).toBe(true);
        expect(spellCategoryBox.heading.textContent).toBe('');
      }

      expect(spellCategoryBox.propertyList.itemsAsText).toStrictEqual(expectedSpellCategory.spells);
    }
  }

  expect(generateSpellcastingDialog.previewTextElement.innerHTMLSanitized).toBe(expectedRenderedText);
}

function verifyDialogResetToDefaults() {
  verifyDialogModelResetToDefaults();
  verifyDialogControlsResetToDefaults();

  expect(generateSpellcastingDialog.spellcasterTypeSelect).toHaveFocus();
}

function verifyDialogModelResetToDefaults() {
  const expectedGeneratedText = '[name] is a 1st-level spellcaster. Its spellcasting ability is Charisma (spell save DC sdc[cha], atk[cha] to hit with spell attacks). [name] has the following innate spells prepared:\n\nAt will: \n3/day each: \n2/day each: \n1/day each: ';

  verifyDialogModel(new Spellcasting(), expectedGeneratedText);
}

function verifyDialogControlsResetToDefaults() {
  const expectedRenderedText = 'The commoner is a 1st-level spellcaster. Its spellcasting ability is Charisma (spell save DC 10, +2 to hit with spell attacks). The commoner has the following innate spells prepared:\n\nAt will: \n3/day each: \n2/day each: \n1/day each: ';

  verifyDialogControls(new Spellcasting(), expectedRenderedText);
}

function verifySpecialTraitBlocks(expectedSpellcasterType, expectedGeneratedText, expectedRenderedText) {
  const blockName = (expectedSpellcasterType === 'innate') ? 'Innate Spellcasting' : 'Spellcasting';

  const editableBlock = specialTraitsSection.editElements.editableBlockList.blocks[0];
  expect(editableBlock.name).toBe(blockName);
  expect(editableBlock.text).toBe(expectedGeneratedText);
  expect(editableBlock.previewText).toBe(expectedRenderedText);

  specialTraitsSection.editElements.submitForm();

  const displayBlock = specialTraitsSection.showElements.displayBlockList.blocks[0];
  expect(displayBlock.name).toBe(blockName);
  expect(displayBlock.text).toBe(expectedRenderedText);
}