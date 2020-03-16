import SavingThrowsSection from './saving-throws-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { capitalizeFirstLetter, formatModifier, nullIfEmptyString } from '../../../helpers/string-formatter.js';

import CurrentContext from '../../../models/current-context.js';

const singleSavingThrowUnderTest = 'intelligence';

const expectedHeading = 'Saving Throws';

const abilitiesModel = CurrentContext.creature.abilities;
const challengeRatingModel = CurrentContext.creature.challengeRating;
const savingThrowsModel = CurrentContext.creature.savingThrows;

let savingThrowsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SavingThrowsSection.define();
});

beforeEach(() => {
  abilitiesModel.reset();
  challengeRatingModel.reset();
  savingThrowsModel.reset();

  savingThrowsSection = new SavingThrowsSection();
  TestCustomElements.initializeSection(savingThrowsSection);
  savingThrowsSection.connect();
});

it('show section should have default values', () => {
  verifyShowModeView();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    savingThrowsSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    const expectedSavingThrows = createDefaultExpectedSavingThrows();
    verifyEditModeView(expectedSavingThrows);
  });

  it('should switch to edit mode and focus on the strength enable checkbox', () => {
    expect(savingThrowsSection).toBeInMode('edit');
    expect(savingThrowsSection.editElements.savingThrow['strength'].enable).toHaveFocus();
  });

  describe('and the enable checkbox is checked', () => {
    it('should enable the override field', () => {
      const savingThrowElements = savingThrowsSection.editElements.savingThrow[singleSavingThrowUnderTest];

      savingThrowElements.enable.click();

      verifySavingThrowEditElementsEnabledOrDisabled(savingThrowElements);

      expect(savingThrowElements.modifier).toHaveTextContent('+2');
      expect(savingThrowElements.override.value).toBe('');
    });
  });

  describe('and the enable checkbox is unchecked', () => {
    it('should disable the and clear the override field', () => {
      const savingThrowElements = savingThrowsSection.editElements.savingThrow[singleSavingThrowUnderTest];

      savingThrowElements.enable.click();

      savingThrowElements.override.value = 7;

      savingThrowElements.enable.click();

      verifySavingThrowEditElementsEnabledOrDisabled(savingThrowElements);

      expect(savingThrowElements.modifier).toHaveTextContent('+0');
      expect(savingThrowElements.override.value).toBe('');
    });
  });

  describe('and the ability score and proficiency bonus are set, the saving throw fields are set, and the edit section is submitted', () => {
    describe('should update the saving throw modifier, switch to show mode, and display the saving throw modifier in show mode if enabled', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                  | abilityScore | proficiencyBonus | savingThrowEnabled | savingThrowOverride | expectedModifier | expectedText
        ${'saving throw disabled with no override'}  | ${10}        | ${2}             | ${false}           | ${''}               | ${0}             | ${''}
        ${'saving throw enabled with no override'}   | ${10}        | ${2}             | ${true}            | ${''}               | ${2}             | ${'Int +2'}
        ${'saving throw enabled with override'}      | ${10}        | ${2}             | ${true}            | ${8}                | ${8}             | ${'Int +8'}
        ${'- ability score and - proficiency bonus'} | ${3}         | ${-1}            | ${true}            | ${''}               | ${-5}            | ${'Int –5'}
        ${'- ability score and 0 proficiency bonus'} | ${3}         | ${0}             | ${true}            | ${''}               | ${-4}            | ${'Int –4'}
        ${'- ability score and + proficiency bonus'} | ${3}         | ${3}             | ${true}            | ${''}               | ${-1}            | ${'Int –1'}
        ${'0 ability score and - proficiency bonus'} | ${10}        | ${-1}            | ${true}            | ${''}               | ${-1}            | ${'Int –1'}
        ${'0 ability score and 0 proficiency bonus'} | ${10}        | ${0}             | ${true}            | ${''}               | ${0}             | ${'Int +0'}
        ${'0 ability score and + proficiency bonus'} | ${10}        | ${3}             | ${true}            | ${''}               | ${3}             | ${'Int +3'}
        ${'+ ability score and - proficiency bonus'} | ${14}        | ${-1}            | ${true}            | ${''}               | ${1}             | ${'Int +1'}
        ${'+ ability score and 0 proficiency bonus'} | ${14}        | ${0}             | ${true}            | ${''}               | ${2}             | ${'Int +2'}
        ${'+ ability score and + proficiency bonus'} | ${14}        | ${3}             | ${true}            | ${''}               | ${5}             | ${'Int +5'}
      `
      ('$description: {abilityScore="$abilityScore", proficiencyBonus="$proficiencyBonus", savingThrowEnabled="$savingThrowEnabled", savingThrowOverride="$savingThrowOverride"} => {expectedModifier="$expectedModifier", expectedText="$expectedText"}',
      ({abilityScore, proficiencyBonus, savingThrowEnabled, savingThrowOverride, expectedModifier, expectedText}) => {
        const savingThrowElements = savingThrowsSection.editElements.savingThrow[singleSavingThrowUnderTest];
        const expectedSavingThrows = createDefaultExpectedSavingThrows();
        const expectedSavingThrow = expectedSavingThrows[singleSavingThrowUnderTest];
        expectedSavingThrow.isEnabled = savingThrowEnabled;
        expectedSavingThrow.override = nullIfEmptyString(savingThrowOverride);
        expectedSavingThrow.modifier = expectedModifier;

        abilitiesModel.abilities[singleSavingThrowUnderTest].score = abilityScore;
        challengeRatingModel.proficiencyBonus = proficiencyBonus;

        if (savingThrowEnabled) {
          savingThrowElements.enable.click();

          if (savingThrowOverride !== '') {
            inputValueAndTriggerEvent(savingThrowElements.override, savingThrowOverride);
          }
        }

        verifyModel(expectedSavingThrows);
        verifyEditModeView(expectedSavingThrows);

        savingThrowsSection.editElements.submitForm();

        expect(savingThrowsSection).toBeInMode('show');
        verifyShowModeView(expectedText);
        if (expectedText === '') {
          expect(savingThrowsSection.showElements.section).toHaveClass('section_empty');
        } else {
          expect(savingThrowsSection.showElements.section).not.toHaveClass('section_empty');
        }

        const json = verifyJsonExport(expectedSavingThrows);
        expect(savingThrowsSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(savingThrowsSection).toExportPropertyLineToMarkdown(expectedHeading, expectedText);

        reset();
        abilitiesModel.abilities[singleSavingThrowUnderTest].score = abilityScore;
        challengeRatingModel.proficiencyBonus = proficiencyBonus;
        savingThrowsSection.importFromJson(json);

        verifyModel(expectedSavingThrows);
        verifyEditModeView(expectedSavingThrows);
        verifyShowModeView(expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and multiple saving throws are enabled, and the edit section is submitted', () => {
    describe('should update the corresponding saving throw modifiers, switch to show mode, and display the saving throw modifiers in show mode if enabled', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description              | strScore | dexScore | conScore | intScore | wisScore | chaScore | profBonus | strEnabled | dexEnabled | conEnabled | intEnabled | wisEnabled | chaEnabled | strOverride | dexOverride | conOverride | intOverride | wisOverride | chaOverride | expectedText
        ${'ancient gold dragon'} | ${30}    | ${14}    | ${29}    | ${18}    | ${17}    | ${28}    | ${7}      | ${false}   | ${true}    | ${true}    | ${false}   | ${true}    | ${true}    | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${'Dex +9, Con +16, Wis +10, Cha +16'}
        ${'gladiator'}           | ${18}    | ${15}    | ${16}    | ${10}    | ${12}    | ${15}    | ${3}      | ${true}    | ${true}    | ${true}    | ${false}   | ${false}   | ${false}   | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${'Str +7, Dex +5, Con +6'}
        ${'lich'}                | ${11}    | ${16}    | ${16}    | ${20}    | ${14}    | ${16}    | ${7}      | ${false}   | ${false}   | ${true}    | ${true}    | ${true}    | ${false}   | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${'Con +10, Int +12, Wis +9'}
        ${'mage'}                | ${9}     | ${14}    | ${11}    | ${17}    | ${12}    | ${11}    | ${3}      | ${false}   | ${false}   | ${false}   | ${true}    | ${true}    | ${false}   | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${'Int +6, Wis +4'}
        ${'mummy lord'}          | ${18}    | ${10}    | ${17}    | ${11}    | ${18}    | ${16}    | ${5}      | ${false}   | ${false}   | ${true}    | ${true}    | ${true}    | ${true}    | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${'Con +8, Int +5, Wis +9, Cha +8'}
        ${'storm giant'}         | ${29}    | ${14}    | ${20}    | ${16}    | ${18}    | ${18}    | ${5}      | ${true}    | ${false}   | ${true}    | ${false}   | ${true}    | ${true}    | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${''}       | ${'Str +14, Con +10, Wis +9, Cha +9'}
        ${'override test'}       | ${10}    | ${10}    | ${10}    | ${10}    | ${10}    | ${10}    | ${2}      | ${true}    | ${true}    | ${true}    | ${true}    | ${true}    | ${true}    | ${-2}       | ${-1}       | ${0}        | ${1}        | ${2}        | ${3}        | ${'Str –2, Dex –1, Con +0, Int +1, Wis +2, Cha +3'}
      `
      ('$description',
      ({strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus, strEnabled, dexEnabled, conEnabled, intEnabled, wisEnabled, chaEnabled, strOverride, dexOverride, conOverride, intOverride, wisOverride, chaOverride, expectedText}) => {
        populateAbilityScoresAndProficiencyBonus(strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus);

        const expectedSavingThrows = createDefaultExpectedSavingThrows();
        populateExpectedSavingThrows(expectedSavingThrows, profBonus, strEnabled, dexEnabled, conEnabled, intEnabled, wisEnabled, chaEnabled, strOverride, dexOverride, conOverride, intOverride, wisOverride, chaOverride);

        for (const [key, value] of savingThrowsModel.entries) {
          const abbreviation = value.abilityModel.abbreviation;
          const enabled = eval(`${abbreviation}Enabled`);
          const override = eval(`${abbreviation}Override`);

          const elements = savingThrowsSection.editElements.savingThrow[key];

          if (enabled) {
            elements.enable.click();

            if (override !== '') {
              inputValueAndTriggerEvent(elements.override, override);
            }
          }
        }

        verifyModel(expectedSavingThrows);
        verifyEditModeView(expectedSavingThrows);

        savingThrowsSection.editElements.submitForm();

        expect(savingThrowsSection).toBeInMode('show');
        verifyShowModeView(expectedText);

        const json = verifyJsonExport(expectedSavingThrows);
        expect(savingThrowsSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(savingThrowsSection).toExportPropertyLineToMarkdown(expectedHeading, expectedText);

        reset();
        populateAbilityScoresAndProficiencyBonus(strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus);
        savingThrowsSection.importFromJson(json);

        verifyModel(expectedSavingThrows);
        verifyEditModeView(expectedSavingThrows);
        verifyShowModeView(expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});

describe('when importing from Open5e', () => {
  describe('should import as normal', () => {
    /* eslint-disable indent, no-unexpected-multiline */
    it.each
    `
      description              | strScore | dexScore | conScore | intScore | wisScore | chaScore | profBonus | strSave | dexSave | conSave | intSave | wisSave | chaSave | expectedText
      ${'ancient gold dragon'} | ${30}    | ${14}    | ${29}    | ${18}    | ${17}    | ${28}    | ${7}      | ${null} | ${9}    | ${16}   | ${null} | ${10}   | ${16}   | ${'Dex +9, Con +16, Wis +10, Cha +16'}
      ${'gladiator'}           | ${18}    | ${15}    | ${16}    | ${10}    | ${12}    | ${15}    | ${3}      | ${7}    | ${5}    | ${6}    | ${null} | ${null} | ${null} | ${'Str +7, Dex +5, Con +6'}
      ${'lich'}                | ${11}    | ${16}    | ${16}    | ${20}    | ${14}    | ${16}    | ${7}      | ${null} | ${null} | ${10}   | ${12}   | ${9}    | ${null} | ${'Con +10, Int +12, Wis +9'}
      ${'mage'}                | ${9}     | ${14}    | ${11}    | ${17}    | ${12}    | ${11}    | ${3}      | ${null} | ${null} | ${null} | ${6}    | ${4}    | ${null} | ${'Int +6, Wis +4'}
      ${'mummy lord'}          | ${18}    | ${10}    | ${17}    | ${11}    | ${18}    | ${16}    | ${5}      | ${null} | ${null} | ${8}    | ${5}    | ${9}    | ${8}    | ${'Con +8, Int +5, Wis +9, Cha +8'}
      ${'storm giant'}         | ${29}    | ${14}    | ${20}    | ${16}    | ${18}    | ${18}    | ${5}      | ${14}   | ${null} | ${10}   | ${null} | ${9}    | ${9}    | ${'Str +14, Con +10, Wis +9, Cha +9'}
    `
    ('$description',
    ({strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus, strSave, dexSave, conSave, intSave, wisSave, chaSave, expectedText}) => {
      populateAbilityScoresAndProficiencyBonus(strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus);

      const expectedSavingThrows = createDefaultExpectedSavingThrows();
      populateExpectedSavingThrows(expectedSavingThrows,
        profBonus,
        (strSave !== null),
        (dexSave !== null),
        (conSave !== null),
        (intSave !== null),
        (wisSave !== null),
        (chaSave !== null));

      const json = {
        strength_save: strSave,
        dexterity_save: dexSave,
        constitution_save: conSave,
        intelligence_save: intSave,
        wisdom_save: wisSave,
        charisma_save: chaSave,
      };

      savingThrowsSection.importFromOpen5e(json);

      verifyModel(expectedSavingThrows);
      verifyEditModeView(expectedSavingThrows);
      verifyShowModeView(expectedText);
    });
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with saving throws is imported from JSON', () => {
    it('should show the new saving throws', () => {
      const expectedText = 'Con +2';
      const json = createDefaultExpectedSavingThrows();
      json.constitution.isEnabled = true;

      savingThrowsSection.mode = 'hidden';
      savingThrowsSection.importFromJson(json);

      expect(savingThrowsSection).toBeInMode('show');
      verifyShowModeView(expectedText);
    });
  });
});

function reset() {
  abilitiesModel.reset();
  challengeRatingModel.reset();
  savingThrowsModel.reset();
  savingThrowsSection.updateView();
}

function populateAbilityScoresAndProficiencyBonus(strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus) {
  for (const [key, value] of savingThrowsModel.entries) {
    const abbreviation = value.abilityModel.abbreviation;
    const score = eval(`${abbreviation}Score`);
    abilitiesModel.abilities[key].score = score;
  }

  challengeRatingModel.proficiencyBonus = profBonus;

  savingThrowsSection.updateView();
}

function createDefaultExpectedSavingThrows() {
  const expectedSavingThrows = {};
  for (const key of savingThrowsModel.keys) {
    expectedSavingThrows[key] = {
      isEnabled: false,
      override: null,
      modifier: 0
    };
  }

  return expectedSavingThrows;
}

// eslint-disable-next-line no-unused-vars
function populateExpectedSavingThrows(expectedSavingThrows, profBonus, strEnabled, dexEnabled, conEnabled, intEnabled, wisEnabled, chaEnabled, strOverride = '', dexOverride = '', conOverride = '', intOverride = '', wisOverride = '', chaOverride = '') {
  for (const [key, value] of savingThrowsModel.entries) {
    const abbreviation = value.abilityModel.abbreviation;
    const enabled = eval(`${abbreviation}Enabled`);
    const override = nullIfEmptyString(eval(`${abbreviation}Override`));

    let modifier = value.abilityModel.modifier;

    if (enabled) {
      if (override !== null) {
        modifier = override;
      } else {
        modifier += profBonus;
      }
    }

    expectedSavingThrows[key] = {
      isEnabled: enabled,
      override: override,
      modifier: modifier
    };
  }
}

function verifyModel(expectedSavingThrows) {
  for (const [key, value] of savingThrowsModel.entries) {
    const expectedSavingThrow = expectedSavingThrows[key];
    expect(value.isEnabled).toBe(expectedSavingThrow.isEnabled);
    expect(value.override).toBe(expectedSavingThrow.override);
    expect(value.modifier).toBe(expectedSavingThrow.modifier);
  }
}

function verifyEditModeView(expectedSavingThrows) {
  for (const key of savingThrowsModel.keys) {
    const expectedSavingThrow = expectedSavingThrows[key];
    const savingThrowElements = savingThrowsSection.editElements.savingThrow[key];
    const formattedModifier = formatModifier(expectedSavingThrow.modifier);

    expect(savingThrowElements.enable.checked).toBe(expectedSavingThrow.isEnabled);
    expect(savingThrowElements.label).toHaveTextContent(capitalizeFirstLetter(key));
    expect(savingThrowElements.modifier).toHaveTextContent(formattedModifier);
    expect(savingThrowElements.override).toHaveValue(expectedSavingThrow.override);

    verifySavingThrowEditElementsEnabledOrDisabled(savingThrowElements);
  }
}

function verifySavingThrowEditElementsEnabledOrDisabled(savingThrowElements) {
  if (savingThrowElements.enable.checked) {
    expect(savingThrowElements.label).not.toHaveAttribute('disabled');
    expect(savingThrowElements.modifier).not.toHaveAttribute('disabled');
    expect(savingThrowElements.override).not.toHaveAttribute('disabled');
  } else {
    expect(savingThrowElements.label).toHaveAttribute('disabled');
    expect(savingThrowElements.modifier).toHaveAttribute('disabled');
    expect(savingThrowElements.override).toHaveAttribute('disabled');
  }
}

function verifyShowModeView(expectedText = '') {
  expect(savingThrowsSection).toShowPropertyLine(expectedHeading, expectedText);
}

function verifyJsonExport(expectedSavingThrows) {
  const json = savingThrowsSection.exportToJson();

  const expectedJson = {};
  for (const key of savingThrowsModel.keys) {
    const expectedSavingThrow = expectedSavingThrows[key];

    expectedJson[key] = {
      isEnabled: expectedSavingThrow.isEnabled,
      override: expectedSavingThrow.override
    };
  }

  expect(json).toStrictEqual(expectedJson);

  return json;
}