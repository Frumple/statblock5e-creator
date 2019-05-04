import ActionsSection from '../sections/actions-section.js';
import Actions from '../../../models/lists/block/actions.js';

import GenerateAttackDialog from './generate-attack-dialog.js';

import Abilities from '../../../models/abilities.js';
import ProficiencyBonus from '../../../models/proficiency-bonus.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

let actionsSection;
let generateAttackDialog;

beforeAll(async() => {
  await TestCustomElements.define();
  await ActionsSection.define();
  await GenerateAttackDialog.define();
});

beforeEach(() => {
  Abilities.reset();
  ProficiencyBonus.reset();
  Actions.reset();

  actionsSection = new ActionsSection();
  TestCustomElements.initializeSection(actionsSection);
  actionsSection.connect();

  generateAttackDialog = actionsSection.editElements.generateAttackDialog;
  generateAttackDialog.connect();
});

describe('when the generate attack dialog is opened', () => {
  beforeEach(() => {
    actionsSection.showElements.section.click();
    actionsSection.editElements.generateAttackButton.click();
  });

  it('should initially have its model and controls set to their defaults', () => {
    verifyDialogReset();
  });

  describe('and the dialog is filled out and the reset button is clicked', () => {
    it('should reset the dialog model and controls back to their defaults', () => {
      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, 'Ice Javelin');
      generateAttackDialog.finesseInput.click();

      setCategoryInputs('melee', false, 'piercing', 2, 6);
      setCategoryInputs('ranged', true, 'piercing', 1, 6);
      setCategoryInputs('bonus', true, 'cold', 1, 4);

      inputValueAndTriggerEvent(generateAttackDialog.reachInput, 10);
      inputValueAndTriggerEvent(generateAttackDialog.normalRangeInput, 30);
      inputValueAndTriggerEvent(generateAttackDialog.longRangeInput, 120);

      generateAttackDialog.resetButton.click();

      verifyDialogReset();
    });
  });

  describe('and the dialog is submitted and then opened again', () => {
    it('should reset the dialog model and controls back to their defaults', () => {
      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, 'Ice Javelin');
      generateAttackDialog.finesseInput.click();

      setCategoryInputs('melee', false, 'piercing', 2, 6);
      setCategoryInputs('ranged', true, 'piercing', 1, 6);
      setCategoryInputs('bonus', true, 'cold', 1, 4);

      generateAttackDialog.generateAttackButton.click();

      actionsSection.editElements.generateAttackButton.click();

      verifyDialogReset();
    });
  });

  describe('and the dialog is submitted with a blank weapon name', () => {

  });

  describe('and the dialog is submitted with neither melee or ranged checked, it should display an error', () => {

  });

  describe('and the dialog is submitted with melee checked, it should add a new action block for a melee weapon', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                                           | isFinesse | isVersatile | hasBonus | generatedText                                                                                                                                                                                                      | renderedText
      ${'melee weapon'}                                     | ${false}  | ${false}    | ${false} | ${'*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d8 + strmod} slashing damage.'}                                                                                          | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 5 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage.'}
      ${'melee versatile weapon'}                           | ${false}  | ${true}     | ${false} | ${'*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d8 + strmod} slashing damage, or dmg{1d10 + strmod} slashing damage if used with two hands.'}                            | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 5 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage, or 6 (1d10 + 1) slashing damage if used with two hands.'}
      ${'melee weapon with bonus damage'}                   | ${false}  | ${false}    | ${true}  | ${'*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d8 + strmod} slashing damage plus dmg{2d6} fire damage.'}                                                                | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 5 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage plus 7 (2d6) fire damage.'}
      ${'melee versatile weapon with bonus damage'}         | ${false}  | ${true}     | ${true}  | ${'*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d8 + strmod} slashing damage, or dmg{1d10 + strmod} slashing damage if used with two hands, plus dmg{2d6} fire damage.'} | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 5 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage, or 6 (1d10 + 1) slashing damage if used with two hands, plus 7 (2d6) fire damage.'}
      ${'melee finesse weapon'}                             | ${true}   | ${false}    | ${false} | ${'*Melee Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d8 + dexmod} slashing damage.'}                                                                                          | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 5 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage.'}
      ${'melee finesse versatile weapon'}                   | ${true}   | ${true}     | ${false} | ${'*Melee Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d8 + dexmod} slashing damage, or dmg{1d10 + dexmod} slashing damage if used with two hands.'}                            | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 5 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands.'}
      ${'melee finesse weapon with bonus damage'}           | ${true}   | ${false}    | ${true}  | ${'*Melee Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d8 + dexmod} slashing damage plus dmg{2d6} fire damage.'}                                                                | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 5 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage plus 7 (2d6) fire damage.'}
      ${'melee finesse versatile weapon with bonus damage'} | ${true}   | ${true}     | ${true}  | ${'*Melee Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d8 + dexmod} slashing damage, or dmg{1d10 + dexmod} slashing damage if used with two hands, plus dmg{2d6} fire damage.'} | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 5 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 7 (2d6) fire damage.'}
    `
    ('$description: {isFinesse="$isFinesse", isVersatile="$isVersatile", hasBonus="$hasBonus"} => {generatedText="$generatedText", renderedText="$renderedText"}',
    ({isFinesse, isVersatile, hasBonus, generatedText, renderedText}) => {
      const weaponName = 'Claws';

      Abilities.abilities['strength'].score = 12;
      Abilities.abilities['dexterity'].score = 18;
      ProficiencyBonus.proficiencyBonus = 2;

      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, weaponName);

      setCategoryInputs('melee', false, 'slashing', 1, 8);

      if (isFinesse) {
        generateAttackDialog.finesseInput.click();
      }

      if (isVersatile) {
        setCategoryInputs('versatile', true, 'slashing', 1, 10);
      }

      if (hasBonus) {
        setCategoryInputs('bonus', true, 'fire', 2, 6);
      }

      expect(generateAttackDialog.generatedText).toBe(generatedText);
      expect(generateAttackDialog.renderedText).toBe(renderedText);

      generateAttackDialog.generateAttackButton.click();

      const editableBlock = actionsSection.editElements.editableList.blocks[0];
      expect(editableBlock.name).toBe(weaponName);
      expect(editableBlock.originalText).toBe(generatedText);
      expect(editableBlock.previewText).toBe(renderedText);

      actionsSection.editElements.submitForm();

      const displayBlock = actionsSection.showElements.displayList.blocks[0];
      expect(displayBlock.name).toBe(weaponName);
      expect(displayBlock.text).toBe(renderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('and the dialog is submitted with ranged checked, it should add a new action block for a ranged weapon', () => {

  });

  describe('and the dialog is submitted with melee and checked both checked, it should add a new action block for a combined melee/ranged weapon', () => {

  });
});

function setCategoryInputs(categoryKey, clickEnable = true, damageType = '', damageDieQuantity = 1, damageDieSize = 8) {
  const categoryInputs = generateAttackDialog.damageCategoryInputs[categoryKey];

  if (clickEnable) {
    categoryInputs.enabled.click();
  }

  inputValueAndTriggerEvent(categoryInputs.damageType, damageType);
  inputValueAndTriggerEvent(categoryInputs.damageDieQuantity, damageDieQuantity);
  inputValueAndTriggerEvent(categoryInputs.damageDieSize, damageDieSize);
}

function verifyCategoryModel(categoryKey, isEnabled = true, damageType = '', damageDieQuantity = 1, damageDieSize = 8) {
  const categoryModel = generateAttackDialog.attackModel.damageCategories[categoryKey];
  expect(categoryModel.isEnabled).toBe(isEnabled);
  expect(categoryModel.damageType).toBe(damageType);
  expect(categoryModel.damageDieQuantity).toBe(damageDieQuantity);
  expect(categoryModel.damageDieSize).toBe(damageDieSize);
}

function verifyCategoryInputs(categoryKey, isEnabled = true, damageType = '', damageDieQuantity = 1, damageDieSize = 8) {
  const categoryInputs = generateAttackDialog.damageCategoryInputs[categoryKey];
  expect(categoryInputs.enabled.checked).toBe(isEnabled);

  expect(categoryInputs.damageType.disabled).not.toBe(isEnabled);
  expect(categoryInputs.damageType.value).toBe(damageType);

  expect(categoryInputs.damageDieQuantity.disabled).not.toBe(isEnabled);
  expect(categoryInputs.damageDieQuantity.valueAsInt).toBe(damageDieQuantity);

  expect(categoryInputs.damageDieSize.disabled).not.toBe(isEnabled);
  expect(parseInt(categoryInputs.damageDieSize.value, 10)).toBe(damageDieSize);

  if (categoryKey === 'melee') {
    expect(generateAttackDialog.reachInput.disabled).not.toBe(isEnabled);
  } else if(categoryKey === 'ranged') {
    expect(generateAttackDialog.normalRangeInput.disabled).not.toBe(isEnabled);
    expect(generateAttackDialog.longRangeInput.disabled).not.toBe(isEnabled);
  }
}

function verifyDialogReset() {
  verifyDialogModelReset();
  verifyDialogControlsReset();
}

function verifyDialogModelReset() {
  const attackModel = generateAttackDialog.attackModel;

  expect(attackModel.weaponName).toBe('');
  expect(attackModel.isFinesse).toBe(false);

  verifyCategoryModel('melee');

  for (const key of ['ranged', 'versatile', 'bonus']) {
    verifyCategoryModel(key, false);
  }

  expect(attackModel.reach).toBe(5);
  expect(attackModel.normalRange).toBe(0);
  expect(attackModel.longRange).toBe(0);
}

function verifyDialogControlsReset() {
  expect(generateAttackDialog.weaponNameInput.value).toBe('');
  expect(generateAttackDialog.finesseInput.checked).toBe(false);

  verifyCategoryInputs('melee');

  for (const key of ['ranged', 'versatile', 'bonus']) {
    verifyCategoryInputs(key, false);
  }

  expect(generateAttackDialog.reachInput.valueAsInt).toBe(5);
  expect(generateAttackDialog.normalRangeInput.valueAsInt).toBe(0);
  expect(generateAttackDialog.longRangeInput.valueAsInt).toBe(0);

  const expectedGeneratedText = '*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d8 + strmod} damage.';
  const expectedRenderedText = '<em>Melee Weapon Attack:</em> +2 to hit, reach 5 ft., one target. <em>Hit:</em> 4 (1d8) damage.';

  expect(generateAttackDialog.generatedTextElement).toHaveTextContent(expectedGeneratedText);
  expect(generateAttackDialog.renderedTextElement.innerHTMLSanitized).toBe(expectedRenderedText);
}