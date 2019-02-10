import SavingThrowsSection from '/src/js/sections/saving-throws-section.js';
import { EnableDisableElementsCheckboxInternal } from '/src/js/extensions/enable-disable-elements-checkbox.js';
import ErrorMessages from '/src/js/elements/error-messages.js';
jest.mock('/src/js/elements/error-messages.js');

import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';
import { formatModifier } from '/src/js/helpers/string-formatter.js';

import Abilities from '/src/js/stats/abilities.js';
import ProficiencyBonus from '/src/js/stats/proficiency-bonus.js';
import SavingThrows from '/src/js/stats/saving-throws.js';

const labelDisabledClass = 'section__label_disabled';
const singleSavingThrowUnderTest = 'intelligence';

let savingThrowsSection;

beforeAll(async() => {
  await SavingThrowsSection.define();
});

beforeEach(() => {
  Abilities.reset();
  ProficiencyBonus.reset();
  SavingThrows.reset();

  savingThrowsSection = new SavingThrowsSection();
  savingThrowsSection.errorMessages = new ErrorMessages();
  for (const key of Abilities.keys) {
    savingThrowsSection.editElements.savingThrow[key].enable = new EnableDisableElementsCheckboxInternal(savingThrowsSection.editElements.savingThrow[key].enable);
  }
  savingThrowsSection.forceConnect();
});

afterEach(() => {
  document.clear();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    savingThrowsSection.showElements.section.click(); 
  });

  it('should switch to edit mode and focus on the strength enable checkbox', () => {
    expect(savingThrowsSection).toBeInMode('edit');
    expect(savingThrowsSection.editElements.savingThrow['strength'].enable.checkboxElement).toHaveFocus();
  });

  describe('and the enable checkbox is checked', () => {
    it('should enable the proficient checkbox and override field, and check the proficient checkbox', () => {
      const savingThrowElements = savingThrowsSection.editElements.savingThrow[singleSavingThrowUnderTest];

      savingThrowElements.enable.click();

      expect(savingThrowElements.label).not.toHaveClass(labelDisabledClass);
      expect(savingThrowElements.modifier).not.toHaveClass(labelDisabledClass);

      expect(savingThrowElements.modifier).toHaveTextContent('+2');
      expect(savingThrowElements.proficient.checked).toBe(true);
      expect(savingThrowElements.override.value).toBe('');
    });
  });

  describe('and the enable checkbox is unchecked', () => {
    it('should disable the proficient checkbox and override field, uncheck the proficient checkbox, and clear the override field', () => {
      const savingThrowElements = savingThrowsSection.editElements.savingThrow[singleSavingThrowUnderTest];

      savingThrowElements.enable.click();

      savingThrowElements.override.value = 7;

      savingThrowElements.enable.click();

      expect(savingThrowElements.label).toHaveClass(labelDisabledClass);
      expect(savingThrowElements.modifier).toHaveClass(labelDisabledClass);

      expect(savingThrowElements.modifier).toHaveTextContent('+0');
      expect(savingThrowElements.proficient.checked).toBe(false);
      expect(savingThrowElements.override.value).toBe('');
    });
  });

  describe('and the ability score and proficiency bonus are set, the saving throw fields are set, and the save button is clicked', () => {
    describe('should update the saving throw modifier, switch to show mode, and display the saving throw modifier in show mode if enabled', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                             | abilityScore | proficiencyBonus | savingThrowEnabled | savingThrowProficient | savingThrowOverride | expectedModifier    | expectedText
        ${'saving throw disabled, not proficient, no override'} | ${10}        | ${2}             | ${false}           | ${false}              | ${NaN}              | ${0}             | ${''}
        ${'saving throw enabled, not proficient, no override'}  | ${10}        | ${2}             | ${true}            | ${false}              | ${NaN}              | ${0}             | ${'Int +0'}
        ${'saving throw enabled, proficient, no override'}      | ${10}        | ${2}             | ${true}            | ${true}               | ${NaN}              | ${2}             | ${'Int +2'}
        ${'saving throw enabled, not proficient, override'}     | ${10}        | ${2}             | ${true}            | ${false}              | ${7}                | ${7}             | ${'Int +7'}
        ${'saving throw enabled, proficient, override'}         | ${10}        | ${2}             | ${true}            | ${true}               | ${8}                | ${8}             | ${'Int +8'}
        ${'- ability score and - proficiency bonus'}            | ${3}         | ${-1}            | ${true}            | ${true}               | ${NaN}              | ${-5}             | ${'Int –5'}
        ${'- ability score and 0 proficiency bonus'}            | ${3}         | ${0}             | ${true}            | ${true}               | ${NaN}              | ${-4}             | ${'Int –4'}
        ${'- ability score and + proficiency bonus'}            | ${3}         | ${3}             | ${true}            | ${true}               | ${NaN}              | ${-1}             | ${'Int –1'}
        ${'0 ability score and - proficiency bonus'}            | ${10}        | ${-1}            | ${true}            | ${true}               | ${NaN}              | ${-1}             | ${'Int –1'}
        ${'0 ability score and 0 proficiency bonus'}            | ${10}        | ${0}             | ${true}            | ${true}               | ${NaN}              | ${0}             | ${'Int +0'}
        ${'0 ability score and + proficiency bonus'}            | ${10}        | ${3}             | ${true}            | ${true}               | ${NaN}              | ${3}             | ${'Int +3'}
        ${'+ ability score and - proficiency bonus'}            | ${14}        | ${-1}            | ${true}            | ${true}               | ${NaN}              | ${1}             | ${'Int +1'}
        ${'+ ability score and 0 proficiency bonus'}            | ${14}        | ${0}             | ${true}            | ${true}               | ${NaN}              | ${2}             | ${'Int +2'}
        ${'+ ability score and + proficiency bonus'}            | ${14}        | ${3}             | ${true}            | ${true}               | ${NaN}              | ${5}             | ${'Int +5'}
      `
      ('$description: {abilityScore="$abilityScore", proficiencyBonus="$proficiencyBonus", savingThrowEnabled="$savingThrowEnabled", savingThrowProficient="$savingThrowProficient", savingThrowOverride="$savingThrowOverride"} => {expectedModifier="$expectedModifier", expectedText="$expectedText"}',
      ({abilityScore, proficiencyBonus, savingThrowEnabled, savingThrowProficient, savingThrowOverride, expectedModifier, expectedText}) => {
        const savingThrowElements = savingThrowsSection.editElements.savingThrow[singleSavingThrowUnderTest];
        
        Abilities.abilities[singleSavingThrowUnderTest].score = abilityScore;
        ProficiencyBonus.value = proficiencyBonus;

        if (savingThrowEnabled) {
          savingThrowElements.enable.click();
        }
        if (! savingThrowProficient) {
          savingThrowElements.proficient.click();
        }
        if (! isNaN(savingThrowOverride)) {
          inputValueAndTriggerEvent(savingThrowElements.override, savingThrowOverride);
        }
       
        const savingThrow = SavingThrows.savingThrows[singleSavingThrowUnderTest];
        expect(savingThrow.isEnabled).toBe(savingThrowEnabled);
        expect(savingThrow.isProficient).toBe(savingThrowProficient);
        expect(savingThrow.override).toBe(savingThrowOverride);
        expect(savingThrow.calculateModifier()).toBe(expectedModifier);

        let formattedModifier = formatModifier(expectedModifier);
        expect(savingThrowElements.modifier).toHaveTextContent(formattedModifier);

        savingThrowsSection.editElements.saveAction.click();

        expect(savingThrowsSection.showElements.text).toHaveTextContent(expectedText);

        if (expectedText === '') {
          expect(savingThrowsSection.showElements.section).toHaveClass('section_empty');
        } else {
          expect(savingThrowsSection.showElements.section).not.toHaveClass('section_empty');
        }
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and multiple saving throws are enabled in various configurations, and the save button is clicked', () => {
    describe('should update the corresponding saving throw modifiers, switch to show mode, and display the saving throw modifiers in show mode if enabled', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description          | strength | dexterity | constitution | intelligence | wisdom   | charisma | expectedText
        ${'1 saving throw'}  | ${false} | ${false}  | ${true}      | ${false}     | ${false} | ${false} | ${'Con +12'}
        ${'2 saving throws'} | ${false} | ${false}  | ${true}      | ${false}     | ${true}  | ${false} | ${'Con +12, Wis +2'}
        ${'3 saving throws'} | ${false} | ${false}  | ${true}      | ${false}     | ${true}  | ${true}  | ${'Con +12, Wis +2, Cha +9'}
        ${'4 saving throws'} | ${true}  | ${false}  | ${true}      | ${false}     | ${true}  | ${true}  | ${'Str –3, Con +12, Wis +2, Cha +9'}
        ${'5 saving throws'} | ${true}  | ${false}  | ${true}      | ${true}      | ${true}  | ${true}  | ${'Str –3, Con +12, Int –5, Wis +2, Cha +9'}
        ${'6 saving throws'} | ${true}  | ${true}   | ${true}      | ${true}      | ${true}  | ${true}  | ${'Str –3, Dex +0, Con +12, Int –5, Wis +2, Cha +9'}
      `
      ('$description: {strength="$strength", dexterity="$dexterity", constitution="$constitution", intelligence="$intelligence", wisdom="$wisdom", charisma="$charisma"} => "$expectedText"',
      ({strength, dexterity, constitution, intelligence, wisdom, charisma, expectedText}) => {
        Abilities.abilities['strength'].score = 18;
        Abilities.abilities['dexterity'].score = 11;
        Abilities.abilities['constitution'].score = 25;
        Abilities.abilities['intelligence'].score = 1;
        Abilities.abilities['wisdom'].score = 4;
        Abilities.abilities['charisma'].score = 12;
        ProficiencyBonus.value = 5;

        if (strength) {
          let elements = savingThrowsSection.editElements.savingThrow['strength'];
          elements.enable.click();
          elements.proficient.click();
          inputValueAndTriggerEvent(elements.override, -3);
        }

        if (dexterity) {
          let elements = savingThrowsSection.editElements.savingThrow['dexterity'];
          elements.enable.click();          
          inputValueAndTriggerEvent(elements.override, 0);
        }

        if (constitution) {
          let elements = savingThrowsSection.editElements.savingThrow['constitution'];
          elements.enable.click();
        }

        if (intelligence) {
          let elements = savingThrowsSection.editElements.savingThrow['intelligence'];
          elements.enable.click();
          elements.proficient.click();
        }

        if (wisdom) {
          let elements = savingThrowsSection.editElements.savingThrow['wisdom'];
          elements.enable.click();
        }

        if (charisma) {
          let elements = savingThrowsSection.editElements.savingThrow['charisma'];
          elements.enable.click();
          elements.proficient.click();
          inputValueAndTriggerEvent(elements.override, 9);
        }

        savingThrowsSection.editElements.saveAction.click();

        expect(savingThrowsSection.showElements.text).toHaveTextContent(expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});