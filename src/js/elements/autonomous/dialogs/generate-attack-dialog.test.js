import ActionsSection from '../sections/actions-section.js';
import GenerateAttackDialog from './generate-attack-dialog.js';

import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { nullIfEmptyString } from '../../../helpers/string-formatter.js';
import Attack from '../../../models/attack.js';

const abilitiesModel = CurrentContext.creature.abilities;
const challengeRatingModel = CurrentContext.creature.challengeRating;
const actions = CurrentContext.creature.actions;

let actionsSection;
let generateAttackDialog;

beforeAll(async() => {
  await TestCustomElements.define();
  await ActionsSection.define();
  await GenerateAttackDialog.define();
});

beforeEach(() => {
  abilitiesModel.reset();
  challengeRatingModel.reset();
  actions.reset();

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

  it('should initially have its model and controls set to their defaults, and focus on the weapon name field', () => {
    verifyDialogResetToDefaults();
    expect(generateAttackDialog.weaponNameInput).toHaveFocus();
  });

  describe('and the dialog is filled out and the reset button is clicked', () => {
    it('should reset the dialog model and controls back to their defaults, and focus on the weapon name field', () => {
      const attackModel = new Attack();
      const meleeCategory = attackModel.damageCategories['melee'];
      meleeCategory.isEnabled = false;
      meleeCategory.damageType = 'piercing';
      meleeCategory.damageDieQuantity = 2;
      meleeCategory.dmageDieSize = 6;

      const rangedCategory = attackModel.damageCategories['ranged'];
      rangedCategory.isEnabled = true;
      rangedCategory.damageType = 'piercing';
      rangedCategory.damageDieQuantity = 1;
      rangedCategory.dmageDieSize = 6;

      const bonusCategory = attackModel.damageCategories['bonus'];
      bonusCategory.isEnabled = true;
      bonusCategory.damageType = 'cold';
      bonusCategory.damageDieQuantity = 1;
      bonusCategory.dmageDieSize = 4;

      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, 'Ice Javelin');
      generateAttackDialog.finesseInput.click();

      setDamageCategoryControls('melee', meleeCategory);
      setDamageCategoryControls('ranged', rangedCategory);
      setDamageCategoryControls('bonus', bonusCategory);

      inputValueAndTriggerEvent(generateAttackDialog.reachInput, 10);
      inputValueAndTriggerEvent(generateAttackDialog.normalRangeInput, 30);
      inputValueAndTriggerEvent(generateAttackDialog.longRangeInput, 120);

      generateAttackDialog.resetButton.click();

      verifyDialogResetToDefaults();
      expect(generateAttackDialog.weaponNameInput).toHaveFocus();
    });
  });

  describe('and the dialog is submitted and then opened again', () => {
    it('should reset the dialog model and controls back to their defaults', () => {
      const attackModel = new Attack();
      const meleeCategory = attackModel.damageCategories['melee'];
      meleeCategory.isEnabled = false;
      meleeCategory.damageType = 'piercing';
      meleeCategory.damageDieQuantity = 2;
      meleeCategory.dmageDieSize = 6;

      const rangedCategory = attackModel.damageCategories['ranged'];
      rangedCategory.isEnabled = true;
      rangedCategory.damageType = 'piercing';
      rangedCategory.damageDieQuantity = 1;
      rangedCategory.dmageDieSize = 6;

      const bonusCategory = attackModel.damageCategories['bonus'];
      bonusCategory.isEnabled = true;
      bonusCategory.damageType = 'cold';
      bonusCategory.damageDieQuantity = 1;
      bonusCategory.dmageDieSize = 4;

      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, 'Ice Javelin');
      generateAttackDialog.finesseInput.click();

      setDamageCategoryControls('melee', meleeCategory);
      setDamageCategoryControls('ranged', rangedCategory);
      setDamageCategoryControls('bonus', bonusCategory);

      generateAttackDialog.generateAttackButton.click();

      actionsSection.editElements.generateAttackButton.click();

      verifyDialogResetToDefaults();
    });
  });

  describe('and the dialog is submitted with a blank weapon name', () => {
    it('should display an error', () => {
      generateAttackDialog.generateAttackButton.click();

      expect(generateAttackDialog).toHaveError(
        generateAttackDialog.weaponNameInput,
        'Weapon Name cannot be blank.');
    });
  });

  describe('and the dialog is submitted with neither melee or ranged checked', () => {
    it('should display an error', () => {
      const attackModel = new Attack();
      const meleeCategory = attackModel.damageCategories['melee'];
      meleeCategory.isEnabled = false;

      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, 'Dummy');

      setDamageCategoryControls('melee', meleeCategory);

      expect(generateAttackDialog.generatedText).toBe('');
      expect(generateAttackDialog.renderedText).toBe('');

      generateAttackDialog.generateAttackButton.click();

      expect(generateAttackDialog).toHaveError(
        generateAttackDialog.damageCategoryInputs['melee'].enabled,
        'At least one of "Melee" or "Ranged" must be enabled.');
    });
  });

  describe('and the dialog is submitted with melee checked, it should add a new action block for a melee weapon', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                                           | isFinesse | isVersatile | hasBonus | generatedText                                                                                                                                                                                                      | renderedText
      ${'melee weapon'}                                     | ${false}  | ${false}    | ${false} | ${'*Melee Weapon Attack:* atk[str] to hit, reach 10 ft., one target. *Hit:* dmg[1d8 + str] slashing damage.'}                                                                                          | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 10 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage.'}
      ${'melee versatile weapon'}                           | ${false}  | ${true}     | ${false} | ${'*Melee Weapon Attack:* atk[str] to hit, reach 10 ft., one target. *Hit:* dmg[1d8 + str] slashing damage, or dmg[1d10 + str] slashing damage if used with two hands.'}                            | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 10 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage, or 6 (1d10 + 1) slashing damage if used with two hands.'}
      ${'melee weapon with bonus damage'}                   | ${false}  | ${false}    | ${true}  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 10 ft., one target. *Hit:* dmg[1d8 + str] slashing damage plus dmg[2d6] fire damage.'}                                                                | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 10 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage plus 7 (2d6) fire damage.'}
      ${'melee versatile weapon with bonus damage'}         | ${false}  | ${true}     | ${true}  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 10 ft., one target. *Hit:* dmg[1d8 + str] slashing damage, or dmg[1d10 + str] slashing damage if used with two hands, plus dmg[2d6] fire damage.'} | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 10 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage, or 6 (1d10 + 1) slashing damage if used with two hands, plus 7 (2d6) fire damage.'}
      ${'melee finesse weapon'}                             | ${true}   | ${false}    | ${false} | ${'*Melee Weapon Attack:* atk[fin] to hit, reach 10 ft., one target. *Hit:* dmg[1d8 + fin] slashing damage.'}                                                                                          | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage.'}
      ${'melee finesse versatile weapon'}                   | ${true}   | ${true}     | ${false} | ${'*Melee Weapon Attack:* atk[fin] to hit, reach 10 ft., one target. *Hit:* dmg[1d8 + fin] slashing damage, or dmg[1d10 + fin] slashing damage if used with two hands.'}                            | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands.'}
      ${'melee finesse weapon with bonus damage'}           | ${true}   | ${false}    | ${true}  | ${'*Melee Weapon Attack:* atk[fin] to hit, reach 10 ft., one target. *Hit:* dmg[1d8 + fin] slashing damage plus dmg[2d6] fire damage.'}                                                                | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage plus 7 (2d6) fire damage.'}
      ${'melee finesse versatile weapon with bonus damage'} | ${true}   | ${true}     | ${true}  | ${'*Melee Weapon Attack:* atk[fin] to hit, reach 10 ft., one target. *Hit:* dmg[1d8 + fin] slashing damage, or dmg[1d10 + fin] slashing damage if used with two hands, plus dmg[2d6] fire damage.'} | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 7 (2d6) fire damage.'}
    `
    ('$description: {isFinesse="$isFinesse", isVersatile="$isVersatile", hasBonus="$hasBonus"} => {generatedText="$generatedText", renderedText="$renderedText"}',
    ({isFinesse, isVersatile, hasBonus, generatedText, renderedText}) => {
      abilitiesModel.abilities['strength'].score = 12;
      abilitiesModel.abilities['dexterity'].score = 18;
      challengeRatingModel.proficiencyBonus = 2;

      const attackModel = new Attack();
      attackModel.weaponName = 'Claws';
      attackModel.isFinesse = isFinesse;
      attackModel.reach = 10;

      const meleeCategory = attackModel.damageCategories['melee'];
      meleeCategory.isEnabled = true;
      meleeCategory.damageType = 'slashing';
      meleeCategory.damageDieQuantity = 1;
      meleeCategory.damageDieSize = 8;

      const rangedCategory = attackModel.damageCategories['ranged'];
      rangedCategory.isEnabled = false;

      const versatileCategory = attackModel.damageCategories['versatile'];
      versatileCategory.isEnabled = isVersatile;
      versatileCategory.damageType = 'slashing';
      versatileCategory.damageDieQuantity = 1;
      versatileCategory.damageDieSize = 10;

      const bonusCategory = attackModel.damageCategories['bonus'];
      bonusCategory.isEnabled = hasBonus;
      bonusCategory.damageType = 'fire';
      bonusCategory.damageDieQuantity = 2;
      bonusCategory.damageDieSize = 6;

      setDialogControls(attackModel);

      verifyDialogModel(attackModel);
      verifyDialogControls(attackModel, generatedText, renderedText);
      saveDialogAndVerifyActionBlocks(attackModel.weaponName, generatedText, renderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('and the dialog is submitted with ranged checked, it should add a new action block for a ranged weapon', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
      `
      description                                            | isFinesse | isVersatile | hasBonus | generatedText                                                                                                                                                                                                               | renderedText
      ${'ranged weapon'}                                     | ${false}  | ${false}    | ${false} | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 30/120 ft., one target. *Hit:* dmg[2d10 + dex] piercing damage.'}                                                                                            | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 30/120 ft., one target. <em>Hit:</em> 13 (2d10 + 2) piercing damage.'}
      ${'ranged versatile weapon'}                           | ${false}  | ${true}     | ${false} | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 30/120 ft., one target. *Hit:* dmg[2d10 + dex] piercing damage, or dmg[2d12 + dex] piercing damage if used with two hands.'}                              | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 30/120 ft., one target. <em>Hit:</em> 13 (2d10 + 2) piercing damage, or 15 (2d12 + 2) piercing damage if used with two hands.'}
      ${'ranged weapon with bonus damage'}                   | ${false}  | ${false}    | ${true}  | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 30/120 ft., one target. *Hit:* dmg[2d10 + dex] piercing damage plus dmg[4d4] poison damage.'}                                                                | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 30/120 ft., one target. <em>Hit:</em> 13 (2d10 + 2) piercing damage plus 10 (4d4) poison damage.'}
      ${'ranged versatile weapon with bonus damage'}         | ${false}  | ${true}     | ${true}  | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 30/120 ft., one target. *Hit:* dmg[2d10 + dex] piercing damage, or dmg[2d12 + dex] piercing damage if used with two hands, plus dmg[4d4] poison damage.'} | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 30/120 ft., one target. <em>Hit:</em> 13 (2d10 + 2) piercing damage, or 15 (2d12 + 2) piercing damage if used with two hands, plus 10 (4d4) poison damage.'}
      ${'ranged finesse weapon'}                             | ${true}   | ${false}    | ${false} | ${'*Ranged Weapon Attack:* atk[fin] to hit, range 30/120 ft., one target. *Hit:* dmg[2d10 + fin] piercing damage.'}                                                                                            | ${'<em>Ranged Weapon Attack:</em> +8 to hit, range 30/120 ft., one target. <em>Hit:</em> 16 (2d10 + 5) piercing damage.'}
      ${'ranged finesse versatile weapon'}                   | ${true}   | ${true}     | ${false} | ${'*Ranged Weapon Attack:* atk[fin] to hit, range 30/120 ft., one target. *Hit:* dmg[2d10 + fin] piercing damage, or dmg[2d12 + fin] piercing damage if used with two hands.'}                              | ${'<em>Ranged Weapon Attack:</em> +8 to hit, range 30/120 ft., one target. <em>Hit:</em> 16 (2d10 + 5) piercing damage, or 18 (2d12 + 5) piercing damage if used with two hands.'}
      ${'ranged finesse weapon with bonus damage'}           | ${true}   | ${false}    | ${true}  | ${'*Ranged Weapon Attack:* atk[fin] to hit, range 30/120 ft., one target. *Hit:* dmg[2d10 + fin] piercing damage plus dmg[4d4] poison damage.'}                                                                | ${'<em>Ranged Weapon Attack:</em> +8 to hit, range 30/120 ft., one target. <em>Hit:</em> 16 (2d10 + 5) piercing damage plus 10 (4d4) poison damage.'}
      ${'ranged finesse versatile weapon with bonus damage'} | ${true}   | ${true}     | ${true}  | ${'*Ranged Weapon Attack:* atk[fin] to hit, range 30/120 ft., one target. *Hit:* dmg[2d10 + fin] piercing damage, or dmg[2d12 + fin] piercing damage if used with two hands, plus dmg[4d4] poison damage.'} | ${'<em>Ranged Weapon Attack:</em> +8 to hit, range 30/120 ft., one target. <em>Hit:</em> 16 (2d10 + 5) piercing damage, or 18 (2d12 + 5) piercing damage if used with two hands, plus 10 (4d4) poison damage.'}
    `
    ('$description: {isFinesse="$isFinesse", isVersatile="$isVersatile", hasBonus="$hasBonus"} => {generatedText="$generatedText", renderedText="$renderedText"}',
    ({isFinesse, isVersatile, hasBonus, generatedText, renderedText}) => {
      abilitiesModel.abilities['strength'].score = 20;
      abilitiesModel.abilities['dexterity'].score = 14;
      challengeRatingModel.proficiencyBonus = 3;

      const attackModel = new Attack();
      attackModel.weaponName = 'Spikes';
      attackModel.isFinesse = isFinesse;
      attackModel.normalRange = 30;
      attackModel.longRange = 120;

      const meleeCategory = attackModel.damageCategories['melee'];
      meleeCategory.isEnabled = false;

      const rangedCategory = attackModel.damageCategories['ranged'];
      rangedCategory.isEnabled = true;
      rangedCategory.damageType = 'piercing';
      rangedCategory.damageDieQuantity = 2;
      rangedCategory.damageDieSize = 10;

      const versatileCategory = attackModel.damageCategories['versatile'];
      versatileCategory.isEnabled = isVersatile;
      versatileCategory.damageType = 'piercing';
      versatileCategory.damageDieQuantity = 2;
      versatileCategory.damageDieSize = 12;

      const bonusCategory = attackModel.damageCategories['bonus'];
      bonusCategory.isEnabled = hasBonus;
      bonusCategory.damageType = 'poison';
      bonusCategory.damageDieQuantity = 4;
      bonusCategory.damageDieSize = 4;

      setDialogControls(attackModel);

      verifyDialogModel(attackModel);
      verifyDialogControls(attackModel, generatedText, renderedText);
      saveDialogAndVerifyActionBlocks(attackModel.weaponName, generatedText, renderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('and the dialog is submitted with melee and checked both checked, it should add a new action block for a combined melee/ranged weapon', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
      `
      description                                                                   | meleeDieQuantity | meleeDieSize | rangedDieQuantity | rangedDieSize | isFinesse | isVersatile | hasBonus | generatedText                                                                                                                                                                                                                                                                                                                       | renderedText
      ${'melee/ranged (equal damage) weapon'}                                       | ${2}             | ${6}         | ${2}              | ${6}          | ${false}  | ${false}    | ${false} | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + str] piercing damage.'}                                                                                                                                                                              | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage.'}
      ${'melee/ranged (equal damage) versatile weapon'}                             | ${2}             | ${6}         | ${2}              | ${6}          | ${false}  | ${true}     | ${false} | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + str] piercing damage, or dmg[2d10 + str] piercing damage if used with two hands to make a melee attack.'}                                                                                         | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage, or 13 (2d10 + 2) piercing damage if used with two hands to make a melee attack.'}
      ${'melee/ranged (equal damage) weapon with bonus damage'}                     | ${2}             | ${6}         | ${2}              | ${6}          | ${false}  | ${false}    | ${true}  | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + str] piercing damage plus dmg[1d12] lightning damage.'}                                                                                                                                              | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (equal damage) versatile weapon with bonus damage'}           | ${2}             | ${6}         | ${2}              | ${6}          | ${false}  | ${true}     | ${true}  | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + str] piercing damage, or dmg[2d10 + str] piercing damage if used with two hands to make a melee attack, plus dmg[1d12] lightning damage.'}                                                        | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage, or 13 (2d10 + 2) piercing damage if used with two hands to make a melee attack, plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (equal damage) finesse weapon'}                               | ${2}             | ${6}         | ${2}              | ${6}          | ${true}   | ${false}    | ${false} | ${'*Melee or Ranged Weapon Attack:* atk[fin] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + fin] piercing damage.'}                                                                                                                                                                              | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage.'}
      ${'melee/ranged (equal damage) finesse versatile weapon'}                     | ${2}             | ${6}         | ${2}              | ${6}          | ${true}   | ${true}     | ${false} | ${'*Melee or Ranged Weapon Attack:* atk[fin] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + fin] piercing damage, or dmg[2d10 + fin] piercing damage if used with two hands to make a melee attack.'}                                                                                         | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage, or 14 (2d10 + 3) piercing damage if used with two hands to make a melee attack.'}
      ${'melee/ranged (equal damage) finesse weapon with bonus damage'}             | ${2}             | ${6}         | ${2}              | ${6}          | ${true}   | ${false}    | ${true}  | ${'*Melee or Ranged Weapon Attack:* atk[fin] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + fin] piercing damage plus dmg[1d12] lightning damage.'}                                                                                                                                              | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (equal damage) finesse versatile weapon with bonus damage'}   | ${2}             | ${6}         | ${2}              | ${6}          | ${true}   | ${true}     | ${true}  | ${'*Melee or Ranged Weapon Attack:* atk[fin] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + fin] piercing damage, or dmg[2d10 + fin] piercing damage if used with two hands to make a melee attack, plus dmg[1d12] lightning damage.'}                                                        | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage, or 14 (2d10 + 3) piercing damage if used with two hands to make a melee attack, plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (unequal damage) weapon'}                                     | ${2}             | ${6}         | ${1}              | ${8}          | ${false}  | ${false}    | ${false} | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + str] piercing damage in melee or dmg[1d8 + str] piercing damage at range.'}                                                                                                                       | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage in melee or 6 (1d8 + 2) piercing damage at range.'}
      ${'melee/ranged (unequal damage) versatile weapon'}                           | ${2}             | ${6}         | ${1}              | ${8}          | ${false}  | ${true}     | ${false} | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + str] piercing damage in melee or dmg[1d8 + str] piercing damage at range, or dmg[2d10 + str] piercing damage if used with two hands to make a melee attack.'}                                  | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage in melee or 6 (1d8 + 2) piercing damage at range, or 13 (2d10 + 2) piercing damage if used with two hands to make a melee attack.'}
      ${'melee/ranged (unequal damage) weapon with bonus damage'}                   | ${2}             | ${6}         | ${1}              | ${8}          | ${false}  | ${false}    | ${true}  | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + str] piercing damage in melee or dmg[1d8 + str] piercing damage at range, plus dmg[1d12] lightning damage.'}                                                                                      | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage in melee or 6 (1d8 + 2) piercing damage at range, plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (unequal damage) versatile weapon with bonus damage'}         | ${2}             | ${6}         | ${1}              | ${8}          | ${false}  | ${true}     | ${true}  | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + str] piercing damage in melee or dmg[1d8 + str] piercing damage at range, or dmg[2d10 + str] piercing damage if used with two hands to make a melee attack, plus dmg[1d12] lightning damage.'} | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage in melee or 6 (1d8 + 2) piercing damage at range, or 13 (2d10 + 2) piercing damage if used with two hands to make a melee attack, plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (unequal damage) finesse weapon'}                             | ${2}             | ${6}         | ${1}              | ${8}          | ${true}   | ${false}    | ${false} | ${'*Melee or Ranged Weapon Attack:* atk[fin] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + fin] piercing damage in melee or dmg[1d8 + fin] piercing damage at range.'}                                                                                                                       | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage in melee or 7 (1d8 + 3) piercing damage at range.'}
      ${'melee/ranged (unequal damage) finesse versatile weapon'}                   | ${2}             | ${6}         | ${1}              | ${8}          | ${true}   | ${true}     | ${false} | ${'*Melee or Ranged Weapon Attack:* atk[fin] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + fin] piercing damage in melee or dmg[1d8 + fin] piercing damage at range, or dmg[2d10 + fin] piercing damage if used with two hands to make a melee attack.'}                                  | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage in melee or 7 (1d8 + 3) piercing damage at range, or 14 (2d10 + 3) piercing damage if used with two hands to make a melee attack.'}
      ${'melee/ranged (unequal damage) finesse weapon with bonus damage'}           | ${2}             | ${6}         | ${1}              | ${8}          | ${true}   | ${false}    | ${true}  | ${'*Melee or Ranged Weapon Attack:* atk[fin] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + fin] piercing damage in melee or dmg[1d8 + fin] piercing damage at range, plus dmg[1d12] lightning damage.'}                                                                                      | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage in melee or 7 (1d8 + 3) piercing damage at range, plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (unequal damage) finesse versatile weapon with bonus damage'} | ${2}             | ${6}         | ${1}              | ${8}          | ${true}   | ${true}     | ${true}  | ${'*Melee or Ranged Weapon Attack:* atk[fin] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[2d6 + fin] piercing damage in melee or dmg[1d8 + fin] piercing damage at range, or dmg[2d10 + fin] piercing damage if used with two hands to make a melee attack, plus dmg[1d12] lightning damage.'} | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage in melee or 7 (1d8 + 3) piercing damage at range, or 14 (2d10 + 3) piercing damage if used with two hands to make a melee attack, plus 6 (1d12) lightning damage.'}
    `
    ('$description: {isFinesse="$isFinesse", isVersatile="$isVersatile", hasBonus="$hasBonus"} => {generatedText="$generatedText", renderedText="$renderedText"}',
    ({meleeDieQuantity, meleeDieSize, rangedDieQuantity, rangedDieSize, isFinesse, isVersatile, hasBonus, generatedText, renderedText}) => {
      abilitiesModel.abilities['strength'].score = 14;
      abilitiesModel.abilities['dexterity'].score = 16;
      challengeRatingModel.proficiencyBonus = 4;

      const attackModel = new Attack();
      attackModel.weaponName = 'Spear of Lightning';
      attackModel.isFinesse = isFinesse;
      attackModel.normalRange = 20;
      attackModel.longRange = 60;

      const meleeCategory = attackModel.damageCategories['melee'];
      meleeCategory.isEnabled = true;
      meleeCategory.damageType = 'piercing';
      meleeCategory.damageDieQuantity = meleeDieQuantity;
      meleeCategory.damageDieSize = meleeDieSize;

      const rangedCategory = attackModel.damageCategories['ranged'];
      rangedCategory.isEnabled = true;
      rangedCategory.damageType = 'piercing';
      rangedCategory.damageDieQuantity = rangedDieQuantity;
      rangedCategory.damageDieSize = rangedDieSize;

      const versatileCategory = attackModel.damageCategories['versatile'];
      versatileCategory.isEnabled = isVersatile;
      versatileCategory.damageType = 'piercing';
      versatileCategory.damageDieQuantity = 2;
      versatileCategory.damageDieSize = 10;

      const bonusCategory = attackModel.damageCategories['bonus'];
      bonusCategory.isEnabled = hasBonus;
      bonusCategory.damageType = 'lightning';
      bonusCategory.damageDieQuantity = 1;
      bonusCategory.damageDieSize = 12;

      setDialogControls(attackModel);

      verifyDialogModel(attackModel);
      verifyDialogControls(attackModel, generatedText, renderedText);
      saveDialogAndVerifyActionBlocks(attackModel.weaponName, generatedText, renderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('and the dialog is submitted with damage die sizes of 1, it should add a new action block for a weapon that deals a specific amount of damage', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description                   | damageDieQuantity | generatedText                                                                                              | renderedText
      ${'weapon dealing 1 damage'}  | ${1}              | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* 1 slashing damage.'}  | ${'<em>Melee Weapon Attack:</em> +4 to hit, reach 5 ft., one target. <em>Hit:</em> 1 slashing damage.'}
      ${'weapon dealing 25 damage'} | ${25}             | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* 25 slashing damage.'} | ${'<em>Melee Weapon Attack:</em> +4 to hit, reach 5 ft., one target. <em>Hit:</em> 25 slashing damage.'}
    `
    ('$description: {damageDieQuantity="$damageDieQuantity"} => {generatedText="$generatedText", renderedText="$renderedText"}',
    ({damageDieQuantity, generatedText, renderedText}) => {
      abilitiesModel.abilities['strength'].score = 14;
      challengeRatingModel.proficiencyBonus = 2;

      const attackModel = new Attack();
      attackModel.weaponName = 'Machete';
      attackModel.reach = 5;

      const meleeCategory = attackModel.damageCategories['melee'];
      meleeCategory.isEnabled = true;
      meleeCategory.damageType = 'slashing';
      meleeCategory.damageDieQuantity = damageDieQuantity;
      meleeCategory.damageDieSize = 1;

      setDialogControls(attackModel);

      verifyDialogModel(attackModel);
      verifyDialogControls(attackModel, generatedText, renderedText);
      saveDialogAndVerifyActionBlocks(attackModel.weaponName, generatedText, renderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('and a predefined weapon is entered, it should auto-fill the dialog fields and add a new action block for that weapon', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      weaponName          | isFinesse | reach  | normalRange | longRange | damageType       | meleeEnabled | meleeDamageDieQuantity | meleeDamageDieSize | rangedEnabled | rangedDamageDieQuantity | rangedDamageDieSize | versatileEnabled | versatileDamageDieQuantity | versatileDamageDieSize | generatedText                                                                                                                                                                                                                              | renderedText
      ${'Club'}           | ${false}  | ${5}   | ${''}       | ${''}     | ${'bludgeoning'} | ${true}      | ${1}                   | ${4}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d4 + str] bludgeoning damage.'}                                                                                                               | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 5 (1d4 + 3) bludgeoning damage.'}
      ${'Dagger'}         | ${true}   | ${5}   | ${20}       | ${60}     | ${'piercing'}    | ${true}      | ${1}                   | ${4}               | ${true}       | ${1}                    | ${4}                | ${false}         | ${''}                      | ${''}                  | ${'*Melee or Ranged Weapon Attack:* atk[fin] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[1d4 + fin] piercing damage.'}                                                                                     | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 6 (1d4 + 4) piercing damage.'}
      ${'Greatclub'}      | ${false}  | ${5}   | ${''}       | ${''}     | ${'bludgeoning'} | ${true}      | ${1}                   | ${8}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d8 + str] bludgeoning damage.'}                                                                                                               | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 7 (1d8 + 3) bludgeoning damage.'}
      ${'Handaxe'}        | ${false}  | ${5}   | ${20}       | ${60}     | ${'slashing'}    | ${true}      | ${1}                   | ${6}               | ${true}       | ${1}                    | ${6}                | ${false}         | ${''}                      | ${''}                  | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[1d6 + str] slashing damage.'}                                                                                     | ${'<em>Melee or Ranged Weapon Attack:</em> +5 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 6 (1d6 + 3) slashing damage.'}
      ${'Javelin'}        | ${false}  | ${5}   | ${30}       | ${120}    | ${'piercing'}    | ${true}      | ${1}                   | ${6}               | ${true}       | ${1}                    | ${6}                | ${false}         | ${''}                      | ${''}                  | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* dmg[1d6 + str] piercing damage.'}                                                                                    | ${'<em>Melee or Ranged Weapon Attack:</em> +5 to hit, reach 5 ft. or range 30/120 ft., one target. <em>Hit:</em> 6 (1d6 + 3) piercing damage.'}
      ${'Light Hammer'}   | ${false}  | ${5}   | ${20}       | ${60}     | ${'bludgeoning'} | ${true}      | ${1}                   | ${4}               | ${true}       | ${1}                    | ${4}                | ${false}         | ${''}                      | ${''}                  | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[1d4 + str] bludgeoning damage.'}                                                                                  | ${'<em>Melee or Ranged Weapon Attack:</em> +5 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 5 (1d4 + 3) bludgeoning damage.'}
      ${'Mace'}           | ${false}  | ${5}   | ${''}       | ${''}     | ${'bludgeoning'} | ${true}      | ${1}                   | ${6}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d6 + str] bludgeoning damage.'}                                                                                                               | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 6 (1d6 + 3) bludgeoning damage.'}
      ${'Quarterstaff'}   | ${false}  | ${5}   | ${''}       | ${''}     | ${'bludgeoning'} | ${true}      | ${1}                   | ${6}               | ${false}      | ${''}                   | ${''}               | ${true}          | ${1}                       | ${8}                   | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d6 + str] bludgeoning damage, or dmg[1d8 + str] bludgeoning damage if used with two hands.'}                                               | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 6 (1d6 + 3) bludgeoning damage, or 7 (1d8 + 3) bludgeoning damage if used with two hands.'}
      ${'Sickle'}         | ${false}  | ${5}   | ${''}       | ${''}     | ${'slashing'}    | ${true}      | ${1}                   | ${4}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d4 + str] slashing damage.'}                                                                                                                  | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 5 (1d4 + 3) slashing damage.'}
      ${'Spear'}          | ${false}  | ${5}   | ${20}       | ${60}     | ${'piercing'}    | ${true}      | ${1}                   | ${6}               | ${true}       | ${1}                    | ${6}                | ${true}          | ${1}                       | ${8}                   | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[1d6 + str] piercing damage, or dmg[1d8 + str] piercing damage if used with two hands to make a melee attack.'} | ${'<em>Melee or Ranged Weapon Attack:</em> +5 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 6 (1d6 + 3) piercing damage, or 7 (1d8 + 3) piercing damage if used with two hands to make a melee attack.'}
      ${'Light Crossbow'} | ${false}  | ${''}  | ${80}       | ${320}    | ${'piercing'}    | ${false}     | ${''}                  | ${''}              | ${true}       | ${1}                    | ${8}                | ${false}         | ${''}                      | ${''}                  | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 80/320 ft., one target. *Hit:* dmg[1d8 + dex] piercing damage.'}                                                                                                            | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 80/320 ft., one target. <em>Hit:</em> 7 (1d8 + 3) piercing damage.'}
      ${'Dart'}           | ${true}   | ${''}  | ${20}       | ${60}     | ${'piercing'}    | ${false}     | ${''}                  | ${''}              | ${true}       | ${1}                    | ${4}                | ${false}         | ${''}                      | ${''}                  | ${'*Ranged Weapon Attack:* atk[fin] to hit, range 20/60 ft., one target. *Hit:* dmg[1d4 + fin] piercing damage.'}                                                                                                             | ${'<em>Ranged Weapon Attack:</em> +6 to hit, range 20/60 ft., one target. <em>Hit:</em> 6 (1d4 + 4) piercing damage.'}
      ${'Shortbow'}       | ${false}  | ${''}  | ${80}       | ${320}    | ${'piercing'}    | ${false}     | ${''}                  | ${''}              | ${true}       | ${1}                    | ${6}                | ${false}         | ${''}                      | ${''}                  | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 80/320 ft., one target. *Hit:* dmg[1d6 + dex] piercing damage.'}                                                                                                            | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 80/320 ft., one target. <em>Hit:</em> 6 (1d6 + 3) piercing damage.'}
      ${'Sling'}          | ${false}  | ${''}  | ${30}       | ${120}    | ${'bludgeoning'} | ${false}     | ${''}                  | ${''}              | ${true}       | ${1}                    | ${4}                | ${false}         | ${''}                      | ${''}                  | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 30/120 ft., one target. *Hit:* dmg[1d4 + dex] bludgeoning damage.'}                                                                                                         | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 30/120 ft., one target. <em>Hit:</em> 5 (1d4 + 3) bludgeoning damage.'}
      ${'Battleaxe'}      | ${false}  | ${5}   | ${''}       | ${''}     | ${'slashing'}    | ${true}      | ${1}                   | ${8}               | ${false}      | ${''}                   | ${''}               | ${true}          | ${1}                       | ${10}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d8 + str] slashing damage, or dmg[1d10 + str] slashing damage if used with two hands.'}                                                    | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.'}
      ${'Flail'}          | ${false}  | ${5}   | ${''}       | ${''}     | ${'bludgeoning'} | ${true}      | ${1}                   | ${8}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d8 + str] bludgeoning damage.'}                                                                                                               | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 7 (1d8 + 3) bludgeoning damage.'}
      ${'Glaive'}         | ${false}  | ${10}  | ${''}       | ${''}     | ${'slashing'}    | ${true}      | ${1}                   | ${10}              | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 10 ft., one target. *Hit:* dmg[1d10 + str] slashing damage.'}                                                                                                                | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d10 + 3) slashing damage.'}
      ${'Greataxe'}       | ${false}  | ${5}   | ${''}       | ${''}     | ${'slashing'}    | ${true}      | ${1}                   | ${12}              | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d12 + str] slashing damage.'}                                                                                                                 | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 9 (1d12 + 3) slashing damage.'}
      ${'Greatsword'}     | ${false}  | ${5}   | ${''}       | ${''}     | ${'slashing'}    | ${true}      | ${2}                   | ${6}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[2d6 + str] slashing damage.'}                                                                                                                  | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 10 (2d6 + 3) slashing damage.'}
      ${'Halberd'}        | ${false}  | ${10}  | ${''}       | ${''}     | ${'slashing'}    | ${true}      | ${1}                   | ${10}              | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 10 ft., one target. *Hit:* dmg[1d10 + str] slashing damage.'}                                                                                                                | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d10 + 3) slashing damage.'}
      ${'Lance'}          | ${false}  | ${10}  | ${''}       | ${''}     | ${'piercing'}    | ${true}      | ${1}                   | ${12}              | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 10 ft., one target. *Hit:* dmg[1d12 + str] piercing damage.'}                                                                                                                | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 10 ft., one target. <em>Hit:</em> 9 (1d12 + 3) piercing damage.'}
      ${'Longsword'}      | ${false}  | ${5}   | ${''}       | ${''}     | ${'slashing'}    | ${true}      | ${1}                   | ${8}               | ${false}      | ${''}                   | ${''}               | ${true}          | ${1}                       | ${10}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d8 + str] slashing damage, or dmg[1d10 + str] slashing damage if used with two hands.'}                                                    | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.'}
      ${'Maul'}           | ${false}  | ${5}   | ${''}       | ${''}     | ${'bludgeoning'} | ${true}      | ${2}                   | ${6}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[2d6 + str] bludgeoning damage.'}                                                                                                               | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 10 (2d6 + 3) bludgeoning damage.'}
      ${'Morningstar'}    | ${false}  | ${5}   | ${''}       | ${''}     | ${'piercing'}    | ${true}      | ${1}                   | ${8}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d8 + str] piercing damage.'}                                                                                                                  | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 7 (1d8 + 3) piercing damage.'}
      ${'Pike'}           | ${false}  | ${10}  | ${''}       | ${''}     | ${'piercing'}    | ${true}      | ${1}                   | ${10}              | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 10 ft., one target. *Hit:* dmg[1d10 + str] piercing damage.'}                                                                                                                | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d10 + 3) piercing damage.'}
      ${'Rapier'}         | ${true}   | ${5}   | ${''}       | ${''}     | ${'piercing'}    | ${true}      | ${1}                   | ${8}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[fin] to hit, reach 5 ft., one target. *Hit:* dmg[1d8 + fin] piercing damage.'}                                                                                                                  | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 5 ft., one target. <em>Hit:</em> 8 (1d8 + 4) piercing damage.'}
      ${'Scimitar'}       | ${true}   | ${5}   | ${''}       | ${''}     | ${'slashing'}    | ${true}      | ${1}                   | ${6}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[fin] to hit, reach 5 ft., one target. *Hit:* dmg[1d6 + fin] slashing damage.'}                                                                                                                  | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 5 ft., one target. <em>Hit:</em> 7 (1d6 + 4) slashing damage.'}
      ${'Shortsword'}     | ${true}   | ${5}   | ${''}       | ${''}     | ${'piercing'}    | ${true}      | ${1}                   | ${6}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[fin] to hit, reach 5 ft., one target. *Hit:* dmg[1d6 + fin] piercing damage.'}                                                                                                                  | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 5 ft., one target. <em>Hit:</em> 7 (1d6 + 4) piercing damage.'}
      ${'Trident'}        | ${false}  | ${5}   | ${20}       | ${60}     | ${'piercing'}    | ${true}      | ${1}                   | ${6}               | ${true}       | ${1}                    | ${6}                | ${true}          | ${1}                       | ${8}                   | ${'*Melee or Ranged Weapon Attack:* atk[str] to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg[1d6 + str] piercing damage, or dmg[1d8 + str] piercing damage if used with two hands to make a melee attack.'} | ${'<em>Melee or Ranged Weapon Attack:</em> +5 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 6 (1d6 + 3) piercing damage, or 7 (1d8 + 3) piercing damage if used with two hands to make a melee attack.'}
      ${'War Pick'}       | ${false}  | ${5}   | ${''}       | ${''}     | ${'piercing'}    | ${true}      | ${1}                   | ${8}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d8 + str] piercing damage.'}                                                                                                                  | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 7 (1d8 + 3) piercing damage.'}
      ${'Warhammer'}      | ${false}  | ${5}   | ${''}       | ${''}     | ${'bludgeoning'} | ${true}      | ${1}                   | ${8}               | ${false}      | ${''}                   | ${''}               | ${true}          | ${1}                       | ${10}                  | ${'*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d8 + str] bludgeoning damage, or dmg[1d10 + str] bludgeoning damage if used with two hands.'}                                              | ${'<em>Melee Weapon Attack:</em> +5 to hit, reach 5 ft., one target. <em>Hit:</em> 7 (1d8 + 3) bludgeoning damage, or 8 (1d10 + 3) bludgeoning damage if used with two hands.'}
      ${'Whip'}           | ${true}   | ${10}  | ${''}       | ${''}     | ${'slashing'}    | ${true}      | ${1}                   | ${4}               | ${false}      | ${''}                   | ${''}               | ${false}         | ${''}                      | ${''}                  | ${'*Melee Weapon Attack:* atk[fin] to hit, reach 10 ft., one target. *Hit:* dmg[1d4 + fin] slashing damage.'}                                                                                                                 | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 10 ft., one target. <em>Hit:</em> 6 (1d4 + 4) slashing damage.'}
      ${'Blowgun'}        | ${false}  | ${''}  | ${25}       | ${100}    | ${'piercing'}    | ${false}     | ${''}                  | ${''}              | ${true}       | ${1}                    | ${1}                | ${false}         | ${''}                      | ${''}                  | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 25/100 ft., one target. *Hit:* 1 piercing damage.'}                                                                                                                            | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 25/100 ft., one target. <em>Hit:</em> 1 piercing damage.'}
      ${'Hand Crossbow'}  | ${false}  | ${''}  | ${30}       | ${120}    | ${'piercing'}    | ${false}     | ${''}                  | ${''}              | ${true}       | ${1}                    | ${6}                | ${false}         | ${''}                      | ${''}                  | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 30/120 ft., one target. *Hit:* dmg[1d6 + dex] piercing damage.'}                                                                                                            | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 30/120 ft., one target. <em>Hit:</em> 6 (1d6 + 3) piercing damage.'}
      ${'Heavy Crossbow'} | ${false}  | ${''}  | ${100}      | ${400}    | ${'piercing'}    | ${false}     | ${''}                  | ${''}              | ${true}       | ${1}                    | ${10}               | ${false}         | ${''}                      | ${''}                  | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 100/400 ft., one target. *Hit:* dmg[1d10 + dex] piercing damage.'}                                                                                                          | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 100/400 ft., one target. <em>Hit:</em> 8 (1d10 + 3) piercing damage.'}
      ${'Longbow'}        | ${false}  | ${''}  | ${150}      | ${600}    | ${'piercing'}    | ${false}     | ${''}                  | ${''}              | ${true}       | ${1}                    | ${8}                | ${false}         | ${''}                      | ${''}                  | ${'*Ranged Weapon Attack:* atk[dex] to hit, range 150/600 ft., one target. *Hit:* dmg[1d8 + dex] piercing damage.'}                                                                                                           | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 150/600 ft., one target. <em>Hit:</em> 7 (1d8 + 3) piercing damage.'}
    `
    ('$weaponName => {isFinesse="$isFinesse", reach="$reach", normalRange="$normalRange", longRange="$longRange", damageType="$damageType", meleeEnabled="$meleeEnabled", meleeDamageDieQuantity="$meleeDamageDieQuantity", meleeDamageDieSize="$meleeDamageDieSize", rangedEnabled="$rangedEnabled", rangedDamageDieQuantity="$rangedDamageDieQuantity", rangedDamageDieSize="$rangedDamageDieSize", versatileEnabled="$versatileEnabled", versatileDamageDieQuantity="$versatileDamageDieQuantity", versatileDamageDieSize="$versatileDamageDieSize", generatedText="$generatedText", renderedText="$renderedText"}',
    ({weaponName, isFinesse, reach, normalRange, longRange, damageType, meleeEnabled, meleeDamageDieQuantity, meleeDamageDieSize, rangedEnabled, rangedDamageDieQuantity, rangedDamageDieSize, versatileEnabled, versatileDamageDieQuantity, versatileDamageDieSize, generatedText, renderedText}) => {
      const attackModel = new Attack();
      attackModel.weaponName = weaponName;
      attackModel.isFinesse = isFinesse;
      attackModel.reach = nullIfEmptyString(reach);
      attackModel.normalRange = nullIfEmptyString(normalRange);
      attackModel.longRange = nullIfEmptyString(longRange);

      const meleeCategory = attackModel.damageCategories['melee'];
      meleeCategory.isEnabled = meleeEnabled;
      meleeCategory.damageType = damageType;
      meleeCategory.damageDieQuantity = nullIfEmptyString(meleeDamageDieQuantity);
      meleeCategory.damageDieSize = nullIfEmptyString(meleeDamageDieSize);

      const rangedCategory = attackModel.damageCategories['ranged'];
      rangedCategory.isEnabled = rangedEnabled;
      rangedCategory.damageType = damageType;
      rangedCategory.damageDieQuantity = nullIfEmptyString(rangedDamageDieQuantity);
      rangedCategory.damageDieSize = nullIfEmptyString(rangedDamageDieSize);

      const versatileCategory = attackModel.damageCategories['versatile'];
      versatileCategory.isEnabled = versatileEnabled;
      versatileCategory.damageType = damageType;
      versatileCategory.damageDieQuantity = nullIfEmptyString(versatileDamageDieQuantity);
      versatileCategory.damageDieSize =nullIfEmptyString( versatileDamageDieSize);

      if (meleeEnabled) {
        abilitiesModel.abilities['strength'].score = 16;
        abilitiesModel.abilities['dexterity'].score = 18;
      } else if (rangedEnabled) {
        abilitiesModel.abilities['strength'].score = 18;
        abilitiesModel.abilities['dexterity'].score = 16;
      }
      challengeRatingModel.proficiencyBonus = 2;

      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, weaponName);

      verifyDialogModel(attackModel);
      verifyDialogControls(attackModel, generatedText, renderedText);
      saveDialogAndVerifyActionBlocks(attackModel.weaponName, generatedText, renderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

function setDialogControls(attackModel) {
  inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, attackModel.weaponName);

  if (attackModel.isFinesse) {
    generateAttackDialog.finesseInput.click();
  }

  for (const [key, categoryModel] of attackModel.damageCategoryEntries) {
    setDamageCategoryControls(key, categoryModel);
  }

  if (attackModel.damageCategories['melee'].isEnabled) {
    inputValueAndTriggerEvent(generateAttackDialog.reachInput, attackModel.reach);
  }
  if(attackModel.damageCategories['ranged'].isEnabled) {
    inputValueAndTriggerEvent(generateAttackDialog.normalRangeInput, attackModel.normalRange);
    inputValueAndTriggerEvent(generateAttackDialog.longRangeInput, attackModel.longRange);
  }
}

function setDamageCategoryControls(categoryKey, categoryModel) {
  const categoryInputs = generateAttackDialog.damageCategoryInputs[categoryKey];

  if (categoryInputs.enabled.checked !== categoryModel.isEnabled) {
    categoryInputs.enabled.click();
  }

  if (categoryModel.isEnabled) {
    inputValueAndTriggerEvent(categoryInputs.damageType, categoryModel.damageType);
    inputValueAndTriggerEvent(categoryInputs.damageDieQuantity, categoryModel.damageDieQuantity);
    inputValueAndTriggerEvent(categoryInputs.damageDieSize, categoryModel.damageDieSize);
  }
}

function verifyDialogModel(expectedModel) {
  const attackModel = generateAttackDialog.attackModel;

  expect(attackModel.weaponName).toBe(expectedModel.weaponName);
  expect(attackModel.isFinesse).toBe(expectedModel.isFinesse);

  for (const [categoryKey, expectedCategoryModel] of Object.entries(expectedModel.damageCategories)) {
    verifyDamageCategoryModel(categoryKey, expectedCategoryModel);
  }

  if (expectedModel.damageCategories['melee'].isEnabled) {
    expect(attackModel.reach).toBe(expectedModel.reach);
  } else if(expectedModel.damageCategories['ranged'].isEnabled) {
    expect(attackModel.normalRange).toBe(expectedModel.normalRange);
    expect(attackModel.longRange).toBe(expectedModel.longRange);
  }
}

function verifyDialogControls(expectedModel, expectedGeneratedText, expectedRenderedText) {
  expect(generateAttackDialog.weaponNameInput.value).toBe(expectedModel.weaponName);
  expect(generateAttackDialog.finesseInput.checked).toBe(expectedModel.isFinesse);

  if (expectedModel.damageCategories['melee'].isEnabled) {
    expect(generateAttackDialog.reachInput.valueAsInt).toBe(expectedModel.reach);
  } else if(expectedModel.damageCategories['ranged'].isEnabled) {
    expect(generateAttackDialog.normalRangeInput.valueAsInt).toBe(expectedModel.normalRange);
    expect(generateAttackDialog.longRangeInput.valueAsInt).toBe(expectedModel.longRange);
  }

  for (const [categoryKey, expectedCategoryModel] of Object.entries(expectedModel.damageCategories)) {
    verifyDamageCategoryControls(categoryKey, expectedCategoryModel);
  }

  expect(generateAttackDialog.generatedTextElement).toHaveTextContent(expectedGeneratedText);
  expect(generateAttackDialog.renderedTextElement.innerHTMLSanitized).toBe(expectedRenderedText);
}

function verifyDamageCategoryModel(categoryKey, expectedCategoryModel) {
  const categoryModel = generateAttackDialog.attackModel.damageCategories[categoryKey];

  expect(categoryModel.isEnabled).toBe(expectedCategoryModel.isEnabled);

  if (expectedCategoryModel.isEnabled) {
    expect(categoryModel.damageType).toBe(expectedCategoryModel.damageType);
    expect(categoryModel.damageDieQuantity).toBe(expectedCategoryModel.damageDieQuantity);
    expect(categoryModel.damageDieSize).toBe(expectedCategoryModel.damageDieSize);
  }
}

function verifyDamageCategoryControls(categoryKey, expectedCategoryModel) {
  const categoryInputs = generateAttackDialog.damageCategoryInputs[categoryKey];
  expect(categoryInputs.enabled.checked).toBe(expectedCategoryModel.isEnabled);

  expect(categoryInputs.damageType.disabled).not.toBe(expectedCategoryModel.isEnabled);
  expect(categoryInputs.damageDieQuantity.disabled).not.toBe(expectedCategoryModel.isEnabled);
  expect(categoryInputs.damageDieSize.disabled).not.toBe(expectedCategoryModel.isEnabled);

  if (expectedCategoryModel.isEnabled) {
    expect(categoryInputs.damageType.value).toBe(expectedCategoryModel.damageType);
    expect(categoryInputs.damageDieQuantity.valueAsInt).toBe(expectedCategoryModel.damageDieQuantity);
    expect(categoryInputs.damageDieSize.valueAsInt).toBe(expectedCategoryModel.damageDieSize);
  }

  if (categoryKey === 'melee') {
    expect(generateAttackDialog.reachInput.disabled).not.toBe(expectedCategoryModel.isEnabled);
  } else if(categoryKey === 'ranged') {
    expect(generateAttackDialog.normalRangeInput.disabled).not.toBe(expectedCategoryModel.isEnabled);
    expect(generateAttackDialog.longRangeInput.disabled).not.toBe(expectedCategoryModel.isEnabled);
  }
}

function verifyDialogResetToDefaults() {
  verifyDialogModelResetToDefaults();
  verifyDialogControlsResetToDefaults();
}

function verifyDialogModelResetToDefaults() {
  verifyDialogModel(new Attack());
}

function verifyDialogControlsResetToDefaults() {
  const expectedGeneratedText = '*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d8 + str] damage.';
  const expectedRenderedText = '<em>Melee Weapon Attack:</em> +2 to hit, reach 5 ft., one target. <em>Hit:</em> 4 (1d8) damage.';

  verifyDialogControls(new Attack(), expectedGeneratedText, expectedRenderedText);
}

function saveDialogAndVerifyActionBlocks(weaponName, expectedGeneratedText, expectedRenderedText) {
  generateAttackDialog.generateAttackButton.click();

  const editableBlock = actionsSection.editElements.editableBlockList.blocks[0];
  expect(editableBlock.name).toBe(weaponName);
  expect(editableBlock.text).toBe(expectedGeneratedText);
  expect(editableBlock.previewText).toBe(expectedRenderedText);

  actionsSection.editElements.submitForm();

  const displayBlock = actionsSection.showElements.displayBlockList.blocks[0];
  expect(displayBlock.name).toBe(weaponName);
  expect(displayBlock.text).toBe(expectedRenderedText);
}