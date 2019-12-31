import AbilityScoresSection from './ability-scores-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { formatModifier } from '../../../helpers/string-formatter.js';

import Abilities from '../../../models/abilities.js';
import ProficiencyBonus from '../../../models/proficiency-bonus.js';

let abilityScoresSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await AbilityScoresSection.define();
});

beforeEach(() => {
  Abilities.reset();
  ProficiencyBonus.reset();

  abilityScoresSection = new AbilityScoresSection();
  TestCustomElements.initializeSection(abilityScoresSection);
  abilityScoresSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    abilityScoresSection.showElements.section.click();
  });

  it('should switch to edit mode and focus on the strength score field', () => {
    expect(abilityScoresSection).toBeInMode('edit');
    expect(abilityScoresSection.editElements.score['strength']).toHaveFocus();
  });

  describe('and one of the ability score fields is changed and the edit section is submitted', () => {
    describe('should switch to show mode, save the ability score, and update the ability score modifiers on both edit and show mode', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description         | abilityName       | score   | expectedModifier
        ${'+ STR mod'}      | ${'strength'}     | ${12}   | ${1}
        ${'0 STR mod'}      | ${'strength'}     | ${11}   | ${0}
        ${'- STR mod'}      | ${'strength'}     | ${8}    | ${-1}
        ${'+ DEX mod'}      | ${'dexterity'}    | ${15}   | ${2}
        ${'0 DEX mod'}      | ${'dexterity'}    | ${11}   | ${0}
        ${'- DEX mod'}      | ${'dexterity'}    | ${7}    | ${-2}
        ${'+ CON mod'}      | ${'constitution'} | ${16}   | ${3}
        ${'0 CON mod'}      | ${'constitution'} | ${11}   | ${0}
        ${'- CON mod'}      | ${'constitution'} | ${4}    | ${-3}
        ${'+ INT mod'}      | ${'intelligence'} | ${19}   | ${4}
        ${'0 INT mod'}      | ${'intelligence'} | ${11}   | ${0}
        ${'- INT mod'}      | ${'intelligence'} | ${3}    | ${-4}
        ${'+ WIS mod'}      | ${'wisdom'}       | ${20}   | ${5}
        ${'0 WIS mod'}      | ${'wisdom'}       | ${11}   | ${0}
        ${'- WIS mod'}      | ${'wisdom'}       | ${1}    | ${-5}
        ${'+ CHA mod'}      | ${'charisma'}     | ${23}   | ${6}
        ${'0 CHA mod'}      | ${'charisma'}     | ${11}   | ${0}
        ${'- CHA mod'}      | ${'charisma'}     | ${9}    | ${-1}
        ${'maximum values'} | ${'charisma'}     | ${999}  | ${494}
      `
      ('$description: {abilityName="$abilityName", score="$score"} => $expectedModifier',
      ({abilityName, score, expectedModifier}) => {
        let receivedEvent = null;
        abilityScoresSection.addEventListener('abilityScoreChanged', (event) => {
          receivedEvent = event;
        });

        // Collect expected values into nested JS object structure
        const expectedAbilities = createDefaultExpectedAbilities();
        const expectedAbility = expectedAbilities.get(abilityName);
        expectedAbility.score = score;
        expectedAbility.modifier = expectedModifier;

        // Input ability scores and proficiency bonus into UI
        inputValueAndTriggerEvent(abilityScoresSection.editElements.score[abilityName], score);

        // Verify model
        const ability = Abilities.abilities[abilityName];
        expect(ability.score).toBe(score);
        expect(ability.modifier).toBe(expectedModifier);

        const formattedModifier = `(${formatModifier(expectedModifier)})`;
        expect(abilityScoresSection.editElements.modifier[abilityName]).toHaveTextContent(formattedModifier);

        expect(receivedEvent).not.toBeNull();
        expect(receivedEvent.detail.abilityName).toBe(abilityName);

        abilityScoresSection.editElements.submitForm();

        expect(abilityScoresSection.showElements.modifier[abilityName]).toHaveTextContent(formattedModifier);

        // Verify exports
        verifyJsonExport(expectedAbilities, 2);
        verifyHtmlExport(expectedAbilities);
        verifyHomebreweryExport(expectedAbilities);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });

    describe('should display an error if the ability score field is not a valid number, and the ability score should not be saved', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description           | abilityName       | expectedErrorMessage
        ${'STR not a number'} | ${'strength'}     | ${'Strength Score must be a valid number.'}
        ${'DEX not a number'} | ${'dexterity'}    | ${'Dexterity Score must be a valid number.'}
        ${'CON not a number'} | ${'constitution'} | ${'Constitution Score must be a valid number.'}
        ${'INT not a number'} | ${'intelligence'} | ${'Intelligence Score must be a valid number.'}
        ${'WIS not a number'} | ${'wisdom'}       | ${'Wisdom Score must be a valid number.'}
        ${'CHA not a number'} | ${'charisma'}     | ${'Charisma Score must be a valid number.'}
      `
      ('$description: $abilityName => $expectedErrorMessage',
      ({abilityName, expectedErrorMessage}) => {
        let receivedEvent = null;
        abilityScoresSection.addEventListener('abilityScoreChanged', (event) => {
          receivedEvent = event;
        });

        const ability = Abilities.abilities[abilityName];
        const oldScore = ability.score;
        const oldModifier = ability.modifier;

        inputValueAndTriggerEvent(abilityScoresSection.editElements.score[abilityName], '');

        expect(ability.score).toBe(oldScore);
        expect(ability.modifier).toBe(oldModifier);

        const formattedOldModifier = `(${formatModifier(oldModifier)})`;
        expect(abilityScoresSection.editElements.modifier[abilityName]).toHaveTextContent(formattedOldModifier);

        expect(receivedEvent).toBeNull();

        abilityScoresSection.editElements.submitForm();

        expect(abilityScoresSection.showElements.modifier[abilityName]).toHaveTextContent(formattedOldModifier);

        expect(abilityScoresSection).toBeInMode('edit');
        expect(abilityScoresSection).toHaveError(
          abilityScoresSection.editElements.score[abilityName],
          expectedErrorMessage);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and the proficiency bonus is changed and the edit section is submitted', () => {
    describe('should save the proficiency bonus', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description  | proficiencyBonus
        ${'+ bonus'} | ${5}
        ${'0 bonus'} | ${0}
        ${'- bonus'} | ${-2}
      `
      ('$description: $proficiencyBonus',
      ({proficiencyBonus}) => {
        let receivedEvent = null;
        abilityScoresSection.addEventListener('proficiencyBonusChanged', (event) => {
          receivedEvent = event;
        });

        const expectedAbilities = createDefaultExpectedAbilities();

        inputValueAndTriggerEvent(abilityScoresSection.editElements.proficiencyBonus, proficiencyBonus);

        expect(ProficiencyBonus.proficiencyBonus).toBe(proficiencyBonus);
        expect(receivedEvent).not.toBeNull();

        abilityScoresSection.editElements.submitForm();

        expect(ProficiencyBonus.proficiencyBonus).toBe(proficiencyBonus);
        verifyJsonExport(expectedAbilities, proficiencyBonus);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });

    it('should display an error if the proficiency bonus is not a valid number, and the proficiency bonus is not saved', () => {
      let receivedEvent = null;
      abilityScoresSection.addEventListener('proficiencyBonusChanged', (event) => {
        receivedEvent = event;
      });

      const oldProficiencyBonus = ProficiencyBonus.proficiencyBonus;

      inputValueAndTriggerEvent(abilityScoresSection.editElements.proficiencyBonus, '');

      expect(ProficiencyBonus.proficiencyBonus).toBe(oldProficiencyBonus);
      expect(receivedEvent).toBeNull();

      abilityScoresSection.editElements.submitForm();

      expect(abilityScoresSection).toBeInMode('edit');
      expect(abilityScoresSection).toHaveError(
        abilityScoresSection.editElements.proficiencyBonus,
        'Proficiency Bonus must be a valid number.');
    });
  });

  describe('and all of the fields are populated and the edit section is submitted', () => {
    describe('should switch to show mode, save the fields, and update the ability score modifiers on both edit and show mode', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description             | strScore | dexScore | conScore | intScore | wisScore | chaScore | proficiencyBonus | strMod  | dexMod  | conMod  | intMod  | wisMod  | chaMod
        ${'ancient red dragon'} | ${30}    | ${10}    | ${29}    | ${18}    | ${15}    | ${23}    | ${7}             | ${10}   | ${0}    | ${9}    | ${4}    | ${2}    | ${6}
        ${'basilisk'}           | ${16}    | ${8}     | ${15}    | ${2}     | ${8}     | ${7}     | ${2}             | ${3}    | ${-1}   | ${2}    | ${-4}   | ${-1}   | ${-2}
        ${'commoner'}           | ${10}    | ${10}    | ${10}    | ${10}    | ${10}    | ${10}    | ${2}             | ${0}    | ${0}    | ${0}    | ${0}    | ${0}    | ${0}
        ${'gelatinous cube'}    | ${14}    | ${3}     | ${20}    | ${1}     | ${6}     | ${1}     | ${2}             | ${2}    | ${-4}   | ${5}    | ${-5}   | ${-2}   | ${-5}
        ${'lich'}               | ${11}    | ${16}    | ${16}    | ${20}    | ${14}    | ${16}    | ${7}             | ${0}    | ${3}    | ${3}    | ${5}    | ${2}    | ${3}
        ${'mage'}               | ${9}     | ${14}    | ${11}    | ${17}    | ${12}    | ${11}    | ${3}             | ${-1}   | ${2}    | ${0}    | ${3}    | ${1}    | ${0}
        ${'phase spider'}       | ${15}    | ${15}    | ${12}    | ${6}     | ${10}    | ${6}     | ${2}             | ${2}    | ${2}    | ${1}    | ${-2}   | ${0}    | ${-2}
        ${'priest'}             | ${10}    | ${10}    | ${12}    | ${13}    | ${16}    | ${13}    | ${2}             | ${0}    | ${0}    | ${1}    | ${1}    | ${3}    | ${1}
        ${'treant'}             | ${23}    | ${8}     | ${21}    | ${12}    | ${16}    | ${12}    | ${4}             | ${6}    | ${-1}   | ${5}    | ${1}    | ${3}    | ${1}
        ${'vampire'}            | ${18}    | ${18}    | ${18}    | ${17}    | ${15}    | ${18}    | ${5}             | ${4}    | ${4}    | ${4}    | ${3}    | ${2}    | ${4}
        ${'minimum values'}     | ${1}     | ${1}     | ${1}     | ${1}     | ${1}     | ${1}     | ${-999}          | ${-5}   | ${-5}   | ${-5}   | ${-5}   | ${-5}   | ${-5}
        ${'maximum values'}     | ${999}   | ${999}   | ${999}   | ${999}   | ${999}   | ${999}   | ${999}           | ${494}  | ${494}  | ${494}  | ${494}  | ${494}  | ${494}
      `
      ('$description: {strScore="$strScore", dexScore="$dexScore", conScore="$conScore", intScore="$intScore", wisScore="$wisScore", chaScore="$chaScore", proficiencyBonus="$proficiencyBonus"} => {strMod="$strMod", dexMod="$dexMod", conMod="$conMod", intMod="$intMod", wisMod="$wisMod", chaMod="$chaMod"}',
      ({strScore, dexScore, conScore, intScore, wisScore, chaScore, proficiencyBonus, strMod, dexMod, conMod, intMod, wisMod, chaMod}) => { // eslint-disable-line no-unused-vars

        // Collect expected values into nested JS object structure
        const expectedAbilities = createDefaultExpectedAbilities();
        for (const [key, value] of Abilities.entries) {
          const abbreviation = value.abbreviation;
          const score = eval(`${abbreviation}Score`);
          const modifier = eval(`${abbreviation}Mod`);

          const expectedAbility = expectedAbilities.get(key);
          expectedAbility.score = score;
          expectedAbility.modifier = modifier;
        }

        // Input ability scores and proficiency bonus into UI
        for (const key of Abilities.keys) {
          const score = expectedAbilities.get(key).score;
          inputValueAndTriggerEvent(abilityScoresSection.editElements.score[key], score);
        }
        inputValueAndTriggerEvent(abilityScoresSection.editElements.proficiencyBonus, proficiencyBonus);

        // Verify model
        for (const [key, value] of Abilities.entries) {
          const expectedAbility = expectedAbilities.get(key);

          expect(value.score).toBe(expectedAbility.score);
          expect(value.modifier).toBe(expectedAbility.modifier);

          const formattedModifier = `(${formatModifier(expectedAbility.modifier)})`;
          expect(abilityScoresSection.editElements.modifier[key]).toHaveTextContent(formattedModifier);
        }
        expect(ProficiencyBonus.proficiencyBonus).toBe(proficiencyBonus);

        // Switch the section to "show" mode
        abilityScoresSection.editElements.submitForm();

        // Verify exports
        verifyJsonExport(expectedAbilities, proficiencyBonus);
        verifyHtmlExport(expectedAbilities);
        verifyHomebreweryExport(expectedAbilities);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});

function createDefaultExpectedAbilities() {
  const expectedAbilities = new Map();
  for (const key of Abilities.orderedKeys) {
    const expectedAbility = {
      score: 10,
      modifier: 0
    };

    expectedAbilities.set(key, expectedAbility);
  }

  return expectedAbilities;
}

function verifyJsonExport(expectedAbilities, expectedProficiencyBonus) {
  const jsObject = abilityScoresSection.exportToJson();

  const expectedAbilityScores = {};
  for (const key of Abilities.keys) {
    expectedAbilityScores[key] = expectedAbilities.get(key).score;
  }

  const expectedJsObject = {
    abilityScores: expectedAbilityScores,
    proficiencyBonus: expectedProficiencyBonus
  };

  expect(jsObject).toStrictEqual(expectedJsObject);
}

function verifyHtmlExport(expectedAbilities) {
  const htmlExport = abilityScoresSection.exportToHtml();
  expect(htmlExport.tagName).toBe('ABILITIES-BLOCK');

  for (const [key, value] of Abilities.entries) {
    const expectedAbility = expectedAbilities.get(key);

    const abbreviation = value.abbreviation;
    const expectedScore = expectedAbility.score;
    const expectedModifier = `(${formatModifier(expectedAbility.modifier)})`;

    expect(abilityScoresSection.showElements.score[key]).toHaveTextContent(expectedScore);
    expect(abilityScoresSection.showElements.modifier[key]).toHaveTextContent(expectedModifier);

    expect(htmlExport.dataset[abbreviation]).toBe(expectedScore.toString());
  }
}

function verifyHomebreweryExport(expectedAbilities) {
  const homebreweryExport = abilityScoresSection.exportToHomebrewery();

  const expectedAbilitiesArray = Array.from(expectedAbilities.values());
  const abilityStrings = expectedAbilitiesArray.map(ability => `${ability.score} (${formatModifier(ability.modifier)})`);
  const abilityLine = abilityStrings.join('|');

  const expectedText =
`>|STR|DEX|CON|INT|WIS|CHA|
>|:---:|:---:|:---:|:---:|:---:|:---:|
>|${abilityLine}|`;

  expect(homebreweryExport).toBe(expectedText);
}