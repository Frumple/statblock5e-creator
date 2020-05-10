import SpecialTraitsSection from '../sections/special-traits-section.js';
import GenerateSpellcastingDialog from './generate-spellcasting-dialog.js';

import CurrentContext from '../../../models/current-context.js';
import Spellcasting from '../../../models/spellcasting.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

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

  it.skip('should initially have its model and controls set to their defaults, and focus on the spellcaster type field', () => {
    verifyDialogResetToDefaults();
    expect(generateSpellcastingDialog.spellcasterTypeSelect).toHaveFocus();
  });

  describe('and the dialog is filled out and the reset button is clicked', () => {
    it.skip('should reset the dialog model and controls back to their defaults, and focus on the spellcaster type field', () => {

    });
  });

  describe('and the dialog is submitted and then opened again', () => {
    it.skip('should reset the dialog model and controls back to their defaults, and focus on the spellcaster type field', () => {

    });
  });

  describe('and the dialog is submitted with a blank spellcaster level', () => {
    it.skip('should display an error', () => {

    });
  });

  describe('and the dialog is submitted for an innate spellcaster, it should add a new spellcasting block under special traits', () => {

  });

  describe('and the dialog is submitted for a bard spellcaster, it should add a new spellcasting block under special traits', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description       | level | abilityScore | proficiencyBonus | cantrips | level1Spells | level2Spells | level3Spells | level4Spells | level5Spells | level6Spells | level7Spells | level8Spells | level9Spells | expectedGeneratedText | expectedRenderedText
      ${'Level 1 Bard'} | ${1}  | ${12}        | ${2}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
    `
    ('$description',
    ({level, abilityScore, proficiencyBonus, cantrips, level1Spells, level2Spells, level3Spells, level4Spells, level5Spells, level6Spells, level7Spells, level8Spells, level9Spells, expectedGeneratedText, expectedRenderedText}) => {
      abilitiesModel.abilities['charisma'].score = abilityScore;
      challengeRatingModel.proficiencyBonus = proficiencyBonus;

      const spellcastingModel = new Spellcasting();
      spellcastingModel.spellcasterType = 'bard';
      spellcastingModel.spellcasterAbility = 'charisma';
      spellcastingModel.spellcasterLevel = level;

      setDialogControls(spellcastingModel);

      verifyDialogModel(spellcastingModel);
      verifyDialogControls(spellcastingModel, expectedRenderedText);
      saveDialogAndVerifySpecialTraitBlocks(expectedGeneratedText, expectedRenderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
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

function setDialogControls(spellcastingModel, setSpellcasterAbility) {
  inputValueAndTriggerEvent(generateSpellcastingDialog.spellcasterTypeSelect, spellcastingModel.spellcasterType);

  // The Spellcaster Ability should automatically be set when we change the
  // Spellcaster Type. If we need to set it to some other ability, set
  // 'setSpellcasterAbility' to true.
  if (setSpellcasterAbility) {
    inputValueAndTriggerEvent(generateSpellcastingDialog.spellcasterAbilitySelect, spellcastingModel.spellcasterAbility);
  }

  inputValueAndTriggerEvent(generateSpellcastingDialog.spellcasterLevelInput, spellcastingModel.spellcasterLevel);
}

function verifyDialogModel(expectedModel) {
  const spellcastingModel = generateSpellcastingDialog.spellcastingModel;

  expect(spellcastingModel.spellcasterType).toBe(expectedModel.spellcasterType);
  expect(spellcastingModel.spellcasterAbility).toBe(expectedModel.spellcasterAbility);
  expect(spellcastingModel.spellcasterLevel).toBe(expectedModel.spellcasterLevel);
}

function verifyDialogControls(expectedModel, expectedPreviewText) {
  expect(generateSpellcastingDialog.spellcasterTypeSelect.value).toBe(expectedModel.spellcasterType);
  expect(generateSpellcastingDialog.spellcasterAbilitySelect.value).toBe(expectedModel.spellcasterAbility);
  expect(generateSpellcastingDialog.spellcasterLevelInput.valueAsInt).toBe(expectedModel.spellcasterLevel);
}

function verifyDialogResetToDefaults() {
  verifyDialogModelResetToDefaults();
  verifyDialogControlsResetToDefaults();
}

function verifyDialogModelResetToDefaults() {
  // TODO
}

function verifyDialogControlsResetToDefaults() {
  // TODO
}

function saveDialogAndVerifySpecialTraitBlocks(expectedGeneratedText, expectedRenderedText) {
  // TODO
}