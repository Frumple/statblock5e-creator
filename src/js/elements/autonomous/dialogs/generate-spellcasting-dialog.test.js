import SpecialTraitsSection from '../sections/special-traits-section.js';
import GenerateSpellcastingDialog from './generate-spellcasting-dialog.js';

import CurrentContext from '../../../models/current-context.js';
import Spellcasting from '../../../models/spellcasting.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { formatSpellSlotQuantity } from '../../../helpers/string-formatter.js';

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
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                   | level | abilityName       | abilityScore | proficiencyBonus | cantrips | level1Spells | level2Spells | level3Spells | level4Spells | level5Spells | level6Spells | level7Spells | level8Spells | level9Spells | expectedGeneratedText | expectedRenderedText
      ${'Deep Gnome (Svirfneblin)'} | ${1}  | ${'intelligence'} | ${12}        | ${2}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
    `
    ('$description',
    ({level, abilityName, abilityScore, proficiencyBonus, cantrips, level1Spells, level2Spells, level3Spells, level4Spells, level5Spells, level6Spells, level7Spells, level8Spells, level9Spells, expectedGeneratedText, expectedRenderedText}) => {
      abilitiesModel.abilities[abilityName].score = abilityScore;
      challengeRatingModel.proficiencyBonus = proficiencyBonus;

      const spellcastingModel = new Spellcasting();
      spellcastingModel.spellcasterType = 'innate';
      spellcastingModel.spellcasterAbility = abilityName;
      spellcastingModel.spellcasterLevel = level;

      setDialogControls(spellcastingModel, true);

      verifyDialogModel(spellcastingModel);
      verifyDialogControls(spellcastingModel, expectedRenderedText);
      saveDialogAndVerifySpecialTraitBlocks(expectedGeneratedText, expectedRenderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('and the dialog is submitted for a bard spellcaster, it should add a new spellcasting block under special traits', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description        | level | abilityScore | proficiencyBonus | cantrips | level1Spells | level2Spells | level3Spells | level4Spells | level5Spells | level6Spells | level7Spells | level8Spells | level9Spells | expectedGeneratedText | expectedRenderedText
      ${'Level 1 Bard'}  | ${1}  | ${12}        | ${2}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 2 Bard'}  | ${2}  | ${12}        | ${2}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 3 Bard'}  | ${3}  | ${12}        | ${2}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 4 Bard'}  | ${4}  | ${14}        | ${2}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 5 Bard'}  | ${5}  | ${14}        | ${3}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 6 Bard'}  | ${6}  | ${14}        | ${3}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 7 Bard'}  | ${7}  | ${14}        | ${3}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 8 Bard'}  | ${8}  | ${16}        | ${3}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 9 Bard'}  | ${9}  | ${16}        | ${4}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 10 Bard'} | ${10} | ${16}        | ${4}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 11 Bard'} | ${11} | ${16}        | ${4}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 12 Bard'} | ${12} | ${18}        | ${4}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 13 Bard'} | ${13} | ${18}        | ${5}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 14 Bard'} | ${14} | ${18}        | ${5}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 15 Bard'} | ${15} | ${18}        | ${5}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 16 Bard'} | ${16} | ${18}        | ${5}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 17 Bard'} | ${17} | ${20}        | ${6}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 18 Bard'} | ${18} | ${20}        | ${6}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 19 Bard'} | ${19} | ${22}        | ${6}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
      ${'Level 20 Bard'} | ${20} | ${22}        | ${6}             | ${[]}    | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${[]}        | ${''}                 | ${''}
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

  // When the Spellcaster Type is changed, the Spellcaster Ability is
  // automatically set to the corresponding value. If we need to manually set
  // it to some other ability, set 'setSpellcasterAbility' to true.
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

  if (expectedModel.spellcasterType === 'innate') {
    const atWillSpellCategoryBox = generateSpellcastingDialog.spellCategoryBoxes[0];
    const threePerDaySpellCategoryBox = generateSpellcastingDialog.spellCategoryBoxes[1];
    const twoPerDaySpellCategoryBox = generateSpellcastingDialog.spellCategoryBoxes[2];
    const onePerDaySpellCategoryBox = generateSpellcastingDialog.spellCategoryBoxes[3];

    expect(atWillSpellCategoryBox.disabled).toBe(false);
    expect(threePerDaySpellCategoryBox.disabled).toBe(false);
    expect(twoPerDaySpellCategoryBox.disabled).toBe(false);
    expect(onePerDaySpellCategoryBox.disabled).toBe(false);

    expect(atWillSpellCategoryBox.heading).toHaveTextContent('At-will');
    expect(threePerDaySpellCategoryBox.heading).toHaveTextContent('3/day');
    expect(twoPerDaySpellCategoryBox.heading).toHaveTextContent('2/day');
    expect(onePerDaySpellCategoryBox.heading).toHaveTextContent('1/day');

    for (let spellLevel = 4; spellLevel <= 9; spellLevel++) {
      const spellCategoryBox = generateSpellcastingDialog.spellCategoryBoxes[spellLevel];

      expect(spellCategoryBox.disabled).toBe(true);
      expect(spellCategoryBox.heading).toHaveTextContent('');
    }
  } else {
    expect(generateSpellcastingDialog.spellCategoryBoxes[0].heading).toHaveTextContent('Cantrips');

    const expectedSpellSlots = SpellcasterTypes[expectedModel.spellcasterType].levels[expectedModel.spellcasterLevel].spellSlots;

    for (let spellLevel = 1; spellLevel <= 9; spellLevel++) {
      const spellCategoryBox = generateSpellcastingDialog.spellCategoryBoxes[spellLevel];

      if (spellLevel <= expectedSpellSlots.length) {
        const expectedSlotQuantity = expectedSpellSlots[spellLevel - 1];
        const formattedSlotQuantity = formatSpellSlotQuantity(expectedSlotQuantity);

        expect(spellCategoryBox.disabled).toBe(false);
        expect(spellCategoryBox.heading).toHaveTextContent(`Level ${spellLevel} (${formattedSlotQuantity})`);
      } else {
        expect(spellCategoryBox.disabled).toBe(true);
        expect(spellCategoryBox.heading).toHaveTextContent('');
      }
    }
  }
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