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
    verifyDialogResetToDefaults();
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

      verifyDialogResetToDefaults();
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
      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, 'Dummy');

      setCategoryInputs('melee', false);

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
      ${'melee weapon'}                                     | ${false}  | ${false}    | ${false} | ${'*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 10 ft., one target. *Hit:* dmg{1d8 + strmod} slashing damage.'}                                                                                          | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 10 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage.'}
      ${'melee versatile weapon'}                           | ${false}  | ${true}     | ${false} | ${'*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 10 ft., one target. *Hit:* dmg{1d8 + strmod} slashing damage, or dmg{1d10 + strmod} slashing damage if used with two hands.'}                            | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 10 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage, or 6 (1d10 + 1) slashing damage if used with two hands.'}
      ${'melee weapon with bonus damage'}                   | ${false}  | ${false}    | ${true}  | ${'*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 10 ft., one target. *Hit:* dmg{1d8 + strmod} slashing damage plus dmg{2d6} fire damage.'}                                                                | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 10 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage plus 7 (2d6) fire damage.'}
      ${'melee versatile weapon with bonus damage'}         | ${false}  | ${true}     | ${true}  | ${'*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 10 ft., one target. *Hit:* dmg{1d8 + strmod} slashing damage, or dmg{1d10 + strmod} slashing damage if used with two hands, plus dmg{2d6} fire damage.'} | ${'<em>Melee Weapon Attack:</em> +3 to hit, reach 10 ft., one target. <em>Hit:</em> 5 (1d8 + 1) slashing damage, or 6 (1d10 + 1) slashing damage if used with two hands, plus 7 (2d6) fire damage.'}
      ${'melee finesse weapon'}                             | ${true}   | ${false}    | ${false} | ${'*Melee Weapon Attack:* mod{dexmod + prof} to hit, reach 10 ft., one target. *Hit:* dmg{1d8 + dexmod} slashing damage.'}                                                                                          | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage.'}
      ${'melee finesse versatile weapon'}                   | ${true}   | ${true}     | ${false} | ${'*Melee Weapon Attack:* mod{dexmod + prof} to hit, reach 10 ft., one target. *Hit:* dmg{1d8 + dexmod} slashing damage, or dmg{1d10 + dexmod} slashing damage if used with two hands.'}                            | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands.'}
      ${'melee finesse weapon with bonus damage'}           | ${true}   | ${false}    | ${true}  | ${'*Melee Weapon Attack:* mod{dexmod + prof} to hit, reach 10 ft., one target. *Hit:* dmg{1d8 + dexmod} slashing damage plus dmg{2d6} fire damage.'}                                                                | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage plus 7 (2d6) fire damage.'}
      ${'melee finesse versatile weapon with bonus damage'} | ${true}   | ${true}     | ${true}  | ${'*Melee Weapon Attack:* mod{dexmod + prof} to hit, reach 10 ft., one target. *Hit:* dmg{1d8 + dexmod} slashing damage, or dmg{1d10 + dexmod} slashing damage if used with two hands, plus dmg{2d6} fire damage.'} | ${'<em>Melee Weapon Attack:</em> +6 to hit, reach 10 ft., one target. <em>Hit:</em> 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 7 (2d6) fire damage.'}
    `
    ('$description: {isFinesse="$isFinesse", isVersatile="$isVersatile", hasBonus="$hasBonus"} => {generatedText="$generatedText", renderedText="$renderedText"}',
    ({isFinesse, isVersatile, hasBonus, generatedText, renderedText}) => {
      const weaponName = 'Claws';

      Abilities.abilities['strength'].score = 12;
      Abilities.abilities['dexterity'].score = 18;
      ProficiencyBonus.proficiencyBonus = 2;

      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, weaponName);

      setCategoryInputs('melee', true, 'slashing', 1, 8);

      if (isFinesse) {
        generateAttackDialog.finesseInput.click();
      }

      if (isVersatile) {
        setCategoryInputs('versatile', true, 'slashing', 1, 10);
      }

      if (hasBonus) {
        setCategoryInputs('bonus', true, 'fire', 2, 6);
      }

      inputValueAndTriggerEvent(generateAttackDialog.reachInput, 10);

      verifyWeapon(weaponName, generatedText, renderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('and the dialog is submitted with ranged checked, it should add a new action block for a ranged weapon', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
      `
      description                                            | isFinesse | isVersatile | hasBonus | generatedText                                                                                                                                                                                                               | renderedText
      ${'ranged weapon'}                                     | ${false}  | ${false}    | ${false} | ${'*Ranged Weapon Attack:* mod{dexmod + prof} to hit, range 30/120 ft., one target. *Hit:* dmg{2d10 + dexmod} piercing damage.'}                                                                                            | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 30/120 ft., one target. <em>Hit:</em> 13 (2d10 + 2) piercing damage.'}
      ${'ranged versatile weapon'}                           | ${false}  | ${true}     | ${false} | ${'*Ranged Weapon Attack:* mod{dexmod + prof} to hit, range 30/120 ft., one target. *Hit:* dmg{2d10 + dexmod} piercing damage, or dmg{2d12 + dexmod} piercing damage if used with two hands.'}                              | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 30/120 ft., one target. <em>Hit:</em> 13 (2d10 + 2) piercing damage, or 15 (2d12 + 2) piercing damage if used with two hands.'}
      ${'ranged weapon with bonus damage'}                   | ${false}  | ${false}    | ${true}  | ${'*Ranged Weapon Attack:* mod{dexmod + prof} to hit, range 30/120 ft., one target. *Hit:* dmg{2d10 + dexmod} piercing damage plus dmg{4d4} poison damage.'}                                                                | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 30/120 ft., one target. <em>Hit:</em> 13 (2d10 + 2) piercing damage plus 10 (4d4) poison damage.'}
      ${'ranged versatile weapon with bonus damage'}         | ${false}  | ${true}     | ${true}  | ${'*Ranged Weapon Attack:* mod{dexmod + prof} to hit, range 30/120 ft., one target. *Hit:* dmg{2d10 + dexmod} piercing damage, or dmg{2d12 + dexmod} piercing damage if used with two hands, plus dmg{4d4} poison damage.'} | ${'<em>Ranged Weapon Attack:</em> +5 to hit, range 30/120 ft., one target. <em>Hit:</em> 13 (2d10 + 2) piercing damage, or 15 (2d12 + 2) piercing damage if used with two hands, plus 10 (4d4) poison damage.'}
      ${'ranged finesse weapon'}                             | ${true}   | ${false}    | ${false} | ${'*Ranged Weapon Attack:* mod{strmod + prof} to hit, range 30/120 ft., one target. *Hit:* dmg{2d10 + strmod} piercing damage.'}                                                                                            | ${'<em>Ranged Weapon Attack:</em> +8 to hit, range 30/120 ft., one target. <em>Hit:</em> 16 (2d10 + 5) piercing damage.'}
      ${'ranged finesse versatile weapon'}                   | ${true}   | ${true}     | ${false} | ${'*Ranged Weapon Attack:* mod{strmod + prof} to hit, range 30/120 ft., one target. *Hit:* dmg{2d10 + strmod} piercing damage, or dmg{2d12 + strmod} piercing damage if used with two hands.'}                              | ${'<em>Ranged Weapon Attack:</em> +8 to hit, range 30/120 ft., one target. <em>Hit:</em> 16 (2d10 + 5) piercing damage, or 18 (2d12 + 5) piercing damage if used with two hands.'}
      ${'ranged finesse weapon with bonus damage'}           | ${true}   | ${false}    | ${true}  | ${'*Ranged Weapon Attack:* mod{strmod + prof} to hit, range 30/120 ft., one target. *Hit:* dmg{2d10 + strmod} piercing damage plus dmg{4d4} poison damage.'}                                                                | ${'<em>Ranged Weapon Attack:</em> +8 to hit, range 30/120 ft., one target. <em>Hit:</em> 16 (2d10 + 5) piercing damage plus 10 (4d4) poison damage.'}
      ${'ranged finesse versatile weapon with bonus damage'} | ${true}   | ${true}     | ${true}  | ${'*Ranged Weapon Attack:* mod{strmod + prof} to hit, range 30/120 ft., one target. *Hit:* dmg{2d10 + strmod} piercing damage, or dmg{2d12 + strmod} piercing damage if used with two hands, plus dmg{4d4} poison damage.'} | ${'<em>Ranged Weapon Attack:</em> +8 to hit, range 30/120 ft., one target. <em>Hit:</em> 16 (2d10 + 5) piercing damage, or 18 (2d12 + 5) piercing damage if used with two hands, plus 10 (4d4) poison damage.'}
    `
    ('$description: {isFinesse="$isFinesse", isVersatile="$isVersatile", hasBonus="$hasBonus"} => {generatedText="$generatedText", renderedText="$renderedText"}',
    ({isFinesse, isVersatile, hasBonus, generatedText, renderedText}) => {
      const weaponName = 'Spikes';

      Abilities.abilities['strength'].score = 20;
      Abilities.abilities['dexterity'].score = 14;
      ProficiencyBonus.proficiencyBonus = 3;

      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, weaponName);

      setCategoryInputs('melee', false);
      setCategoryInputs('ranged', true, 'piercing', 2, 10);

      if (isFinesse) {
        generateAttackDialog.finesseInput.click();
      }

      if (isVersatile) {
        setCategoryInputs('versatile', true, 'piercing', 2, 12);
      }

      if (hasBonus) {
        setCategoryInputs('bonus', true, 'poison', 4, 4);
      }

      inputValueAndTriggerEvent(generateAttackDialog.normalRangeInput, 30);
      inputValueAndTriggerEvent(generateAttackDialog.longRangeInput, 120);

      verifyWeapon(weaponName, generatedText, renderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });

  describe('and the dialog is submitted with melee and checked both checked, it should add a new action block for a combined melee/ranged weapon', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
      `
      description                                                                   | meleeDieQuantity | meleeDieSize | rangedDieQuantity | rangedDieSize | isFinesse | isVersatile | hasBonus | generatedText                                                                                                                                                                                                                                                                                                                       | renderedText
      ${'melee/ranged (equal damage) weapon'}                                       | ${2}             | ${6}         | ${2}              | ${6}          | ${false}  | ${false}    | ${false} | ${'*Melee or Ranged Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + strmod} piercing damage.'}                                                                                                                                                                              | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage.'}
      ${'melee/ranged (equal damage) versatile weapon'}                             | ${2}             | ${6}         | ${2}              | ${6}          | ${false}  | ${true}     | ${false} | ${'*Melee or Ranged Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + strmod} piercing damage, or dmg{2d10 + strmod} piercing damage if used with two hands to make a melee attack.'}                                                                                         | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage, or 13 (2d10 + 2) piercing damage if used with two hands to make a melee attack.'}
      ${'melee/ranged (equal damage) weapon with bonus damage'}                     | ${2}             | ${6}         | ${2}              | ${6}          | ${false}  | ${false}    | ${true}  | ${'*Melee or Ranged Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + strmod} piercing damage plus dmg{1d12} lightning damage.'}                                                                                                                                              | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (equal damage) versatile weapon with bonus damage'}           | ${2}             | ${6}         | ${2}              | ${6}          | ${false}  | ${true}     | ${true}  | ${'*Melee or Ranged Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + strmod} piercing damage, or dmg{2d10 + strmod} piercing damage if used with two hands to make a melee attack, plus dmg{1d12} lightning damage.'}                                                        | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage, or 13 (2d10 + 2) piercing damage if used with two hands to make a melee attack, plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (equal damage) finesse weapon'}                               | ${2}             | ${6}         | ${2}              | ${6}          | ${true}   | ${false}    | ${false} | ${'*Melee or Ranged Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + dexmod} piercing damage.'}                                                                                                                                                                              | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage.'}
      ${'melee/ranged (equal damage) finesse versatile weapon'}                     | ${2}             | ${6}         | ${2}              | ${6}          | ${true}   | ${true}     | ${false} | ${'*Melee or Ranged Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + dexmod} piercing damage, or dmg{2d10 + dexmod} piercing damage if used with two hands to make a melee attack.'}                                                                                         | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage, or 14 (2d10 + 3) piercing damage if used with two hands to make a melee attack.'}
      ${'melee/ranged (equal damage) finesse weapon with bonus damage'}             | ${2}             | ${6}         | ${2}              | ${6}          | ${true}   | ${false}    | ${true}  | ${'*Melee or Ranged Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + dexmod} piercing damage plus dmg{1d12} lightning damage.'}                                                                                                                                              | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (equal damage) finesse versatile weapon with bonus damage'}   | ${2}             | ${6}         | ${2}              | ${6}          | ${true}   | ${true}     | ${true}  | ${'*Melee or Ranged Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + dexmod} piercing damage, or dmg{2d10 + dexmod} piercing damage if used with two hands to make a melee attack, plus dmg{1d12} lightning damage.'}                                                        | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage, or 14 (2d10 + 3) piercing damage if used with two hands to make a melee attack, plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (unequal damage) weapon'}                                     | ${2}             | ${6}         | ${1}              | ${8}          | ${false}  | ${false}    | ${false} | ${'*Melee or Ranged Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + strmod} piercing damage in melee or dmg{1d8 + strmod} piercing damage at range.'}                                                                                                                       | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage in melee or 6 (1d8 + 2) piercing damage at range.'}
      ${'melee/ranged (unequal damage) versatile weapon'}                           | ${2}             | ${6}         | ${1}              | ${8}          | ${false}  | ${true}     | ${false} | ${'*Melee or Ranged Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + strmod} piercing damage in melee or dmg{1d8 + strmod} piercing damage at range, or dmg{2d10 + strmod} piercing damage if used with two hands to make a melee attack.'}                                  | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage in melee or 6 (1d8 + 2) piercing damage at range, or 13 (2d10 + 2) piercing damage if used with two hands to make a melee attack.'}
      ${'melee/ranged (unequal damage) weapon with bonus damage'}                   | ${2}             | ${6}         | ${1}              | ${8}          | ${false}  | ${false}    | ${true}  | ${'*Melee or Ranged Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + strmod} piercing damage in melee or dmg{1d8 + strmod} piercing damage at range, plus dmg{1d12} lightning damage.'}                                                                                      | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage in melee or 6 (1d8 + 2) piercing damage at range, plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (unequal damage) versatile weapon with bonus damage'}         | ${2}             | ${6}         | ${1}              | ${8}          | ${false}  | ${true}     | ${true}  | ${'*Melee or Ranged Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + strmod} piercing damage in melee or dmg{1d8 + strmod} piercing damage at range, or dmg{2d10 + strmod} piercing damage if used with two hands to make a melee attack, plus dmg{1d12} lightning damage.'} | ${'<em>Melee or Ranged Weapon Attack:</em> +6 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 9 (2d6 + 2) piercing damage in melee or 6 (1d8 + 2) piercing damage at range, or 13 (2d10 + 2) piercing damage if used with two hands to make a melee attack, plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (unequal damage) finesse weapon'}                             | ${2}             | ${6}         | ${1}              | ${8}          | ${true}   | ${false}    | ${false} | ${'*Melee or Ranged Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + dexmod} piercing damage in melee or dmg{1d8 + dexmod} piercing damage at range.'}                                                                                                                       | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage in melee or 7 (1d8 + 3) piercing damage at range.'}
      ${'melee/ranged (unequal damage) finesse versatile weapon'}                   | ${2}             | ${6}         | ${1}              | ${8}          | ${true}   | ${true}     | ${false} | ${'*Melee or Ranged Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + dexmod} piercing damage in melee or dmg{1d8 + dexmod} piercing damage at range, or dmg{2d10 + dexmod} piercing damage if used with two hands to make a melee attack.'}                                  | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage in melee or 7 (1d8 + 3) piercing damage at range, or 14 (2d10 + 3) piercing damage if used with two hands to make a melee attack.'}
      ${'melee/ranged (unequal damage) finesse weapon with bonus damage'}           | ${2}             | ${6}         | ${1}              | ${8}          | ${true}   | ${false}    | ${true}  | ${'*Melee or Ranged Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + dexmod} piercing damage in melee or dmg{1d8 + dexmod} piercing damage at range, plus dmg{1d12} lightning damage.'}                                                                                      | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage in melee or 7 (1d8 + 3) piercing damage at range, plus 6 (1d12) lightning damage.'}
      ${'melee/ranged (unequal damage) finesse versatile weapon with bonus damage'} | ${2}             | ${6}         | ${1}              | ${8}          | ${true}   | ${true}     | ${true}  | ${'*Melee or Ranged Weapon Attack:* mod{dexmod + prof} to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* dmg{2d6 + dexmod} piercing damage in melee or dmg{1d8 + dexmod} piercing damage at range, or dmg{2d10 + dexmod} piercing damage if used with two hands to make a melee attack, plus dmg{1d12} lightning damage.'} | ${'<em>Melee or Ranged Weapon Attack:</em> +7 to hit, reach 5 ft. or range 20/60 ft., one target. <em>Hit:</em> 10 (2d6 + 3) piercing damage in melee or 7 (1d8 + 3) piercing damage at range, or 14 (2d10 + 3) piercing damage if used with two hands to make a melee attack, plus 6 (1d12) lightning damage.'}
    `
    ('$description: {isFinesse="$isFinesse", isVersatile="$isVersatile", hasBonus="$hasBonus"} => {generatedText="$generatedText", renderedText="$renderedText"}',
    ({meleeDieQuantity, meleeDieSize, rangedDieQuantity, rangedDieSize, isFinesse, isVersatile, hasBonus, generatedText, renderedText}) => {
      const weaponName = 'Spear of Lightning';

      Abilities.abilities['strength'].score = 14;
      Abilities.abilities['dexterity'].score = 16;
      ProficiencyBonus.proficiencyBonus = 4;

      inputValueAndTriggerEvent(generateAttackDialog.weaponNameInput, weaponName);

      setCategoryInputs('melee', true, 'piercing', meleeDieQuantity, meleeDieSize);
      setCategoryInputs('ranged', true, 'piercing', rangedDieQuantity, rangedDieSize);

      if (isFinesse) {
        generateAttackDialog.finesseInput.click();
      }

      if (isVersatile) {
        setCategoryInputs('versatile', true, 'piercing', 2, 10);
      }

      if (hasBonus) {
        setCategoryInputs('bonus', true, 'lightning', 1, 12);
      }

      inputValueAndTriggerEvent(generateAttackDialog.reachInput, 5);
      inputValueAndTriggerEvent(generateAttackDialog.normalRangeInput, 20);
      inputValueAndTriggerEvent(generateAttackDialog.longRangeInput, 60);

      verifyWeapon(weaponName, generatedText, renderedText);
    });
    /* eslint-enable indent, no-unexpected-multiline */
  });
});

function setCategoryInputs(categoryKey, isEnabled = true, damageType = '', damageDieQuantity = 1, damageDieSize = 8) {
  const categoryInputs = generateAttackDialog.damageCategoryInputs[categoryKey];

  if (categoryInputs.enabled.checked !== isEnabled) {
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

function verifyDialogResetToDefaults() {
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

function verifyWeapon(weaponName, generatedText, renderedText) {
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
}