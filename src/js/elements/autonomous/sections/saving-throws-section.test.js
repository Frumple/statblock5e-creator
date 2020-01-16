import SavingThrowsSection from './saving-throws-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { formatModifier, nullIfEmptyString } from '../../../helpers/string-formatter.js';

import CurrentContext from '../../../models/current-context.js';

const labelDisabledClass = 'section__label_disabled';
const singleSavingThrowUnderTest = 'intelligence';

const expectedHeading = 'Saving Throws';

const abilitiesModel = CurrentContext.creature.abilities;
const proficiencyBonusModel = CurrentContext.creature.proficiencyBonus;
const savingThrowsModel = CurrentContext.creature.savingThrows;

let savingThrowsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SavingThrowsSection.define();
});

beforeEach(() => {
  abilitiesModel.reset();
  proficiencyBonusModel.reset();
  savingThrowsModel.reset();

  savingThrowsSection = new SavingThrowsSection();
  TestCustomElements.initializeSection(savingThrowsSection);
  savingThrowsSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    savingThrowsSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the strength enable checkbox', () => {
    expect(savingThrowsSection).toBeInMode('edit');
    expect(savingThrowsSection.editElements.savingThrow['strength'].enable).toHaveFocus();
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

  describe('and the ability score and proficiency bonus are set, the saving throw fields are set, and the edit section is submitted', () => {
    describe('should update the saving throw modifier, switch to show mode, and display the saving throw modifier in show mode if enabled', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                             | abilityScore | proficiencyBonus | savingThrowEnabled | savingThrowProficient | savingThrowOverride | expectedModifier | expectedText
        ${'saving throw disabled, not proficient, no override'} | ${10}        | ${2}             | ${false}           | ${false}              | ${''}               | ${0}             | ${''}
        ${'saving throw enabled, not proficient, no override'}  | ${10}        | ${2}             | ${true}            | ${false}              | ${''}               | ${0}             | ${'Int +0'}
        ${'saving throw enabled, proficient, no override'}      | ${10}        | ${2}             | ${true}            | ${true}               | ${''}               | ${2}             | ${'Int +2'}
        ${'saving throw enabled, not proficient, override'}     | ${10}        | ${2}             | ${true}            | ${false}              | ${7}                | ${7}             | ${'Int +7'}
        ${'saving throw enabled, proficient, override'}         | ${10}        | ${2}             | ${true}            | ${true}               | ${8}                | ${8}             | ${'Int +8'}
        ${'- ability score and - proficiency bonus'}            | ${3}         | ${-1}            | ${true}            | ${true}               | ${''}               | ${-5}            | ${'Int –5'}
        ${'- ability score and 0 proficiency bonus'}            | ${3}         | ${0}             | ${true}            | ${true}               | ${''}               | ${-4}            | ${'Int –4'}
        ${'- ability score and + proficiency bonus'}            | ${3}         | ${3}             | ${true}            | ${true}               | ${''}               | ${-1}            | ${'Int –1'}
        ${'0 ability score and - proficiency bonus'}            | ${10}        | ${-1}            | ${true}            | ${true}               | ${''}               | ${-1}            | ${'Int –1'}
        ${'0 ability score and 0 proficiency bonus'}            | ${10}        | ${0}             | ${true}            | ${true}               | ${''}               | ${0}             | ${'Int +0'}
        ${'0 ability score and + proficiency bonus'}            | ${10}        | ${3}             | ${true}            | ${true}               | ${''}               | ${3}             | ${'Int +3'}
        ${'+ ability score and - proficiency bonus'}            | ${14}        | ${-1}            | ${true}            | ${true}               | ${''}               | ${1}             | ${'Int +1'}
        ${'+ ability score and 0 proficiency bonus'}            | ${14}        | ${0}             | ${true}            | ${true}               | ${''}               | ${2}             | ${'Int +2'}
        ${'+ ability score and + proficiency bonus'}            | ${14}        | ${3}             | ${true}            | ${true}               | ${''}               | ${5}             | ${'Int +5'}
      `
      ('$description: {abilityScore="$abilityScore", proficiencyBonus="$proficiencyBonus", savingThrowEnabled="$savingThrowEnabled", savingThrowProficient="$savingThrowProficient", savingThrowOverride="$savingThrowOverride"} => {expectedModifier="$expectedModifier", expectedText="$expectedText"}',
      ({abilityScore, proficiencyBonus, savingThrowEnabled, savingThrowProficient, savingThrowOverride, expectedModifier, expectedText}) => {
        const savingThrowElements = savingThrowsSection.editElements.savingThrow[singleSavingThrowUnderTest];
        const expectedJson = createDefaultExpectedJson();
        const expectedJsonSavingThrow = expectedJson[singleSavingThrowUnderTest];
        expectedJsonSavingThrow.isEnabled = savingThrowEnabled;
        expectedJsonSavingThrow.isProficient = savingThrowProficient;
        expectedJsonSavingThrow.override = savingThrowOverride === '' ? null : savingThrowOverride;

        abilitiesModel.abilities[singleSavingThrowUnderTest].score = abilityScore;
        proficiencyBonusModel.proficiencyBonus = proficiencyBonus;

        if (savingThrowEnabled) {
          savingThrowElements.enable.click();

          if (! savingThrowProficient) {
            savingThrowElements.proficient.click();
          }

          if (savingThrowOverride !== '') {
            inputValueAndTriggerEvent(savingThrowElements.override, savingThrowOverride);
          }
        }

        const savingThrow = savingThrowsModel.savingThrows[singleSavingThrowUnderTest];
        expect(savingThrow.isEnabled).toBe(savingThrowEnabled);
        expect(savingThrow.isProficient).toBe(savingThrowProficient);
        expect(savingThrow.override).toBe(nullIfEmptyString(savingThrowOverride));
        expect(savingThrow.modifier).toBe(expectedModifier);

        const formattedModifier = formatModifier(expectedModifier);
        expect(savingThrowElements.modifier).toHaveTextContent(formattedModifier);

        savingThrowsSection.editElements.submitForm();

        expect(savingThrowsSection).toBeInMode('show');
        expect(savingThrowsSection).toShowPropertyLine(expectedHeading, expectedText);

        verifyJsonExport(expectedJson);
        expect(savingThrowsSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(savingThrowsSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

        if (expectedText === '') {
          expect(savingThrowsSection.showElements.section).toHaveClass('section_empty');
        } else {
          expect(savingThrowsSection.showElements.section).not.toHaveClass('section_empty');
        }
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and multiple saving throws are enabled in various configurations, and the edit section is submitted', () => {
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
        abilitiesModel.abilities['strength'].score = 18;
        abilitiesModel.abilities['dexterity'].score = 11;
        abilitiesModel.abilities['constitution'].score = 25;
        abilitiesModel.abilities['intelligence'].score = 1;
        abilitiesModel.abilities['wisdom'].score = 4;
        abilitiesModel.abilities['charisma'].score = 12;
        proficiencyBonusModel.proficiencyBonus = 5;

        const expectedJson = createDefaultExpectedJson();

        if (strength) {
          const elements = savingThrowsSection.editElements.savingThrow['strength'];
          elements.enable.click();
          elements.proficient.click();
          inputValueAndTriggerEvent(elements.override, -3);

          expectedJson['strength'] = {
            isEnabled: true,
            isProficient: false,
            override: -3
          };
        }

        if (dexterity) {
          const elements = savingThrowsSection.editElements.savingThrow['dexterity'];
          elements.enable.click();
          inputValueAndTriggerEvent(elements.override, 0);

          expectedJson['dexterity'] = {
            isEnabled: true,
            isProficient: true,
            override: 0
          };
        }

        if (constitution) {
          const elements = savingThrowsSection.editElements.savingThrow['constitution'];
          elements.enable.click();

          expectedJson['constitution'] = {
            isEnabled: true,
            isProficient: true,
            override: null
          };
        }

        if (intelligence) {
          const elements = savingThrowsSection.editElements.savingThrow['intelligence'];
          elements.enable.click();
          elements.proficient.click();

          expectedJson['intelligence'] = {
            isEnabled: true,
            isProficient: false,
            override: null
          };
        }

        if (wisdom) {
          const elements = savingThrowsSection.editElements.savingThrow['wisdom'];
          elements.enable.click();

          expectedJson['wisdom'] = {
            isEnabled: true,
            isProficient: true,
            override: null
          };
        }

        if (charisma) {
          const elements = savingThrowsSection.editElements.savingThrow['charisma'];
          elements.enable.click();
          elements.proficient.click();
          inputValueAndTriggerEvent(elements.override, 9);

          expectedJson['charisma'] = {
            isEnabled: true,
            isProficient: false,
            override: 9
          };
        }

        savingThrowsSection.editElements.submitForm();

        expect(savingThrowsSection).toBeInMode('show');
        expect(savingThrowsSection).toShowPropertyLine(expectedHeading, expectedText);

        verifyJsonExport(expectedJson);
        expect(savingThrowsSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(savingThrowsSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});

function createDefaultExpectedJson() {
  const expectedJson = {};
  for (const key of abilitiesModel.keys) {
    expectedJson[key] = {
      isEnabled: false,
      isProficient: false,
      override: null
    };
  }

  return expectedJson;
}

function verifyJsonExport(expectedJson) {
  const jsObject = savingThrowsSection.exportToJson();
  expect(jsObject).toStrictEqual(expectedJson);
}