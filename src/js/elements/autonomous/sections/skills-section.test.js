import SkillsSection from './skills-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { formatModifier, nullIfEmptyString } from '../../../helpers/string-formatter.js';

import CurrentContext from '../../../models/current-context.js';

const labelDisabledClass = 'section__label_disabled';
const singleSkillUnderTest = 'investigation';
const singleAbilityUnderTest = 'intelligence';

const expectedHeading = 'Skills';

const abilitiesModel = CurrentContext.creature.abilities;
const proficiencyBonusModel = CurrentContext.creature.proficiencyBonus;
const skillsModel = CurrentContext.creature.skills;

let skillsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SkillsSection.define();
});

beforeEach(() => {
  abilitiesModel.reset();
  proficiencyBonusModel.reset();
  skillsModel.reset();

  skillsSection = new SkillsSection();
  TestCustomElements.initializeSection(skillsSection);
  skillsSection.connect();
});

it('show section should have default values', () => {
  expect(skillsSection.showElements.heading).toHaveTextContent('Skills');
  expect(skillsSection.showElements.text).toHaveTextContent('');
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    skillsSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    const expectedSkills = createDefaultExpectedSkills();
    verifyEditModeView(expectedSkills);
  });

  it('should switch to edit mode and focus on the acrobatics enable checkbox', () => {
    expect(skillsSection).toBeInMode('edit');
    expect(skillsSection.editElements.skill['acrobatics'].enable).toHaveFocus();
  });

  describe('and the enable checkbox is checked', () => {
    it('should enable the proficient checkbox and override field, and check the proficient checkbox', () => {
      const skillElements = skillsSection.editElements.skill[singleSkillUnderTest];

      skillElements.enable.click();

      expect(skillElements.label).not.toHaveClass(labelDisabledClass);
      expect(skillElements.modifier).not.toHaveClass(labelDisabledClass);

      expect(skillElements.modifier).toHaveTextContent('+2');
      expect(skillElements.proficient.checked).toBe(true);
      expect(skillElements.override.value).toBe('');
    });
  });

  describe('and the enable checkbox is unchecked', () => {
    it('should disable the proficient checkbox and override field, uncheck the proficient checkbox, and clear the override field', () => {
      const skillElements = skillsSection.editElements.skill[singleSkillUnderTest];

      skillElements.enable.click();

      skillElements.override.value = 7;

      skillElements.enable.click();

      expect(skillElements.label).toHaveClass(labelDisabledClass);
      expect(skillElements.modifier).toHaveClass(labelDisabledClass);

      expect(skillElements.modifier).toHaveTextContent('+0');
      expect(skillElements.proficient.checked).toBe(false);
      expect(skillElements.override.value).toBe('');
    });
  });

  describe('and the ability score and proficiency bonus are set, the skill fields are set, and the edit section is submitted', () => {
    describe('should update the skill modifier, switch to show mode, and display the skill modifier in show mode if enabled', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                      | abilityScore | proficiencyBonus | skillEnabled | skillProficient | skillOverride | expectedModifier | expectedText
        ${'skill disabled, not proficient, no override'} | ${10}        | ${2}             | ${false}     | ${false}        | ${''}         | ${0}             | ${''}
        ${'skill enabled, not proficient, no override'}  | ${10}        | ${2}             | ${true}      | ${false}        | ${''}         | ${0}             | ${'Investigation +0'}
        ${'skill enabled, proficient, no override'}      | ${10}        | ${2}             | ${true}      | ${true}         | ${''}         | ${2}             | ${'Investigation +2'}
        ${'skill enabled, not proficient, override'}     | ${10}        | ${2}             | ${true}      | ${false}        | ${7}          | ${7}             | ${'Investigation +7'}
        ${'skill enabled, proficient, override'}         | ${10}        | ${2}             | ${true}      | ${true}         | ${8}          | ${8}             | ${'Investigation +8'}
        ${'- ability score and - proficiency bonus'}     | ${3}         | ${-1}            | ${true}      | ${true}         | ${''}         | ${-5}            | ${'Investigation –5'}
        ${'- ability score and 0 proficiency bonus'}     | ${3}         | ${0}             | ${true}      | ${true}         | ${''}         | ${-4}            | ${'Investigation –4'}
        ${'- ability score and + proficiency bonus'}     | ${3}         | ${3}             | ${true}      | ${true}         | ${''}         | ${-1}            | ${'Investigation –1'}
        ${'0 ability score and - proficiency bonus'}     | ${10}        | ${-1}            | ${true}      | ${true}         | ${''}         | ${-1}            | ${'Investigation –1'}
        ${'0 ability score and 0 proficiency bonus'}     | ${10}        | ${0}             | ${true}      | ${true}         | ${''}         | ${0}             | ${'Investigation +0'}
        ${'0 ability score and + proficiency bonus'}     | ${10}        | ${3}             | ${true}      | ${true}         | ${''}         | ${3}             | ${'Investigation +3'}
        ${'+ ability score and - proficiency bonus'}     | ${14}        | ${-1}            | ${true}      | ${true}         | ${''}         | ${1}             | ${'Investigation +1'}
        ${'+ ability score and 0 proficiency bonus'}     | ${14}        | ${0}             | ${true}      | ${true}         | ${''}         | ${2}             | ${'Investigation +2'}
        ${'+ ability score and + proficiency bonus'}     | ${14}        | ${3}             | ${true}      | ${true}         | ${''}         | ${5}             | ${'Investigation +5'}
      `
      ('$description: {abilityScore="$abilityScore", proficiencyBonus="$proficiencyBonus", skillEnabled="$skillEnabled", skillProficient="$skillProficient", skillOverride="$skillOverride"} => {expectedModifier="$expectedModifier", expectedText="$expectedText"}',
      ({abilityScore, proficiencyBonus, skillEnabled, skillProficient, skillOverride, expectedModifier, expectedText}) => {
        let receivedEvent = null;
        skillsSection.addEventListener('skillChanged', (event) => {
          receivedEvent = event;
        });

        const skillElements = skillsSection.editElements.skill[singleSkillUnderTest];
        const expectedSkills = createDefaultExpectedSkills();
        for (const [key, value] of skillsModel.entries) {
          if (value.ability === abilitiesModel.abilities[singleAbilityUnderTest]) {
            if (abilityScore === 3) {
              expectedSkills[key].modifier = -4;
            } else if (abilityScore === 14) {
              expectedSkills[key].modifier = 2;
            }
          }
        }
        const expectedSkill = expectedSkills[singleSkillUnderTest];
        expectedSkill.isEnabled = skillEnabled;
        expectedSkill.isProficient = skillProficient;
        expectedSkill.override = nullIfEmptyString(skillOverride);
        expectedSkill.modifier = expectedModifier;

        abilitiesModel.abilities[singleAbilityUnderTest].score = abilityScore;
        proficiencyBonusModel.proficiencyBonus = proficiencyBonus;

        if (skillEnabled) {
          skillElements.enable.click();
          expectSkillChangedEvent(receivedEvent, singleSkillUnderTest);
          receivedEvent = null;

          if (! skillProficient) {
            skillElements.proficient.click();
            expectSkillChangedEvent(receivedEvent, singleSkillUnderTest);
            receivedEvent = null;
          }

          if (skillOverride !== '') {
            inputValueAndTriggerEvent(skillElements.override, skillOverride);
            expectSkillChangedEvent(receivedEvent, singleSkillUnderTest);
            receivedEvent = null;
          }
        }

        const skill = skillsModel.skills[singleSkillUnderTest];
        expect(skill.isEnabled).toBe(skillEnabled);
        expect(skill.isProficient).toBe(skillProficient);
        expect(skill.override).toBe(nullIfEmptyString(skillOverride));
        expect(skill.modifier).toBe(expectedModifier);

        const formattedModifier = formatModifier(expectedModifier);
        expect(skillElements.modifier).toHaveTextContent(formattedModifier);

        skillsSection.editElements.submitForm();

        expect(skillsSection).toBeInMode('show');
        expect(skillsSection).toShowPropertyLine(expectedHeading, expectedText);
        if (expectedText === '') {
          expect(skillsSection.showElements.section).toHaveClass('section_empty');
        } else {
          expect(skillsSection.showElements.section).not.toHaveClass('section_empty');
        }

        const json = verifyJsonExport(expectedSkills);
        expect(skillsSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(skillsSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

        reset();
        abilitiesModel.abilities[singleAbilityUnderTest].score = abilityScore;
        proficiencyBonusModel.proficiencyBonus = proficiencyBonus;
        skillsSection.importFromJson(json);

        verifyModel(expectedSkills);
        verifyEditModeView(expectedSkills);
        expect(skillsSection).toShowPropertyLine(expectedHeading, expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and multiple skills are enabled in various configurations, and the edit section is submitted', () => {
    describe('should update the corresponding skill modifiers, switch to show mode, and display the skill modifiers in show mode if enabled', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description   | athletics | history  | insight  | persuasion | sleightOfHand | expectedText
        ${'1 skill'}  | ${false}  | ${true}  | ${false} | ${false}   | ${false}      | ${'History +1'}
        ${'2 skills'} | ${false}  | ${true}  | ${false} | ${false}   | ${true}       | ${'History +1, Sleight of Hand +0'}
        ${'3 skills'} | ${false}  | ${true}  | ${false} | ${true}    | ${true}       | ${'History +1, Persuasion +8, Sleight of Hand +0'}
        ${'4 skills'} | ${true}   | ${true}  | ${false} | ${true}    | ${true}       | ${'Athletics –2, History +1, Persuasion +8, Sleight of Hand +0'}
        ${'5 skills'} | ${true}   | ${true}  | ${true}  | ${true}    | ${true}       | ${'Athletics –2, History +1, Insight –3, Persuasion +8, Sleight of Hand +0'}
      `
      ('$description: {athletics="$athletics", history="$history", insight="$insight", persuasion="$persuasion", sleightOfHand="$sleightOfHand"} => "$expectedText"',
      ({athletics, history, insight, persuasion, sleightOfHand, expectedText}) => {
        const expectedSkills = createDefaultExpectedSkills();
        setAbilityScoresAndProficiencyBonus();

        if (athletics) {
          const elements = skillsSection.editElements.skill['athletics'];
          elements.enable.click();
          elements.proficient.click();

          expectedSkills['athletics'] = {
            isEnabled: true,
            isProficient: false,
            override: null,
            modifier: -2
          };
        }

        if (history) {
          const elements = skillsSection.editElements.skill['history'];
          elements.enable.click();
          elements.proficient.click();

          expectedSkills['history'] = {
            isEnabled: true,
            isProficient: false,
            override: null,
            modifier: 1
          };
        }

        if (insight) {
          const elements = skillsSection.editElements.skill['insight'];
          elements.enable.click();
          inputValueAndTriggerEvent(elements.override, -3);

          expectedSkills['insight'] = {
            isEnabled: true,
            isProficient: true,
            override: -3,
            modifier: -3
          };
        }

        if (persuasion) {
          const elements = skillsSection.editElements.skill['persuasion'];
          elements.enable.click();

          expectedSkills['persuasion'] = {
            isEnabled: true,
            isProficient: true,
            override: null,
            modifier: 8
          };
        }

        if (sleightOfHand) {
          const elements = skillsSection.editElements.skill['sleightOfHand'];
          elements.enable.click();
          elements.proficient.click();
          inputValueAndTriggerEvent(elements.override, 0);

          expectedSkills['sleightOfHand'] = {
            isEnabled: true,
            isProficient: false,
            override: 0,
            modifier: 0
          };
        }

        skillsSection.editElements.submitForm();

        expect(skillsSection).toBeInMode('show');
        expect(skillsSection).toShowPropertyLine(expectedHeading, expectedText);

        const json = verifyJsonExport(expectedSkills);
        expect(skillsSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(skillsSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

        reset();
        setAbilityScoresAndProficiencyBonus();
        skillsSection.importFromJson(json);

        expect(skillsSection).toShowPropertyLine(expectedHeading, expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });

    function setAbilityScoresAndProficiencyBonus() {
      abilitiesModel.abilities['strength'].score = 7;
      abilitiesModel.abilities['dexterity'].score = 14;
      abilitiesModel.abilities['intelligence'].score = 13;
      abilitiesModel.abilities['wisdom'].score = 11;
      abilitiesModel.abilities['charisma'].score = 20;
      proficiencyBonusModel.proficiencyBonus = 3;
    }
  });
});

function expectSkillChangedEvent(event, skillName) {
  expect(event).not.toBeNull();
  expect(event.detail.skillName).toBe(skillName);
}

function reset() {
  abilitiesModel.reset();
  proficiencyBonusModel.reset();
  skillsModel.reset();
  skillsSection.updateView();
}

function createDefaultExpectedSkills() {
  const expectedSkills = {};
  for (const key of skillsModel.keys) {
    expectedSkills[key] = {
      isEnabled: false,
      isProficient: false,
      override: null,
      modifier: 0
    };
  }

  return expectedSkills;
}

function verifyModel(expectedSkills) {
  for (const [key, value] of skillsModel.entries) {
    const expectedSkill = expectedSkills[key];
    expect(value.isEnabled).toBe(expectedSkill.isEnabled);
    expect(value.isProficient).toBe(expectedSkill.isProficient);
    expect(value.override).toBe(expectedSkill.override);
    expect(value.modifier).toBe(expectedSkill.modifier);
  }
}

function verifyEditModeView(expectedSkills) {
  for (const [key, value] of skillsModel.entries) {
    const expectedSkill = expectedSkills[key];
    const skillElements = skillsSection.editElements.skill[key];
    const formattedModifier = formatModifier(expectedSkill.modifier);

    expect(skillElements.enable.checked).toBe(expectedSkill.isEnabled);
    expect(skillElements.label).toHaveTextContent(value.prettyName);
    expect(skillElements.modifier).toHaveTextContent(formattedModifier);
    expect(skillElements.proficient.checked).toBe(expectedSkill.isProficient);
    expect(skillElements.override).toHaveValue(expectedSkill.override);
  }
}

function verifyJsonExport(expectedSkills) {
  const json = skillsSection.exportToJson();

  const expectedJson = {};
  for (const key of skillsModel.keys) {
    const expectedSkill = expectedSkills[key];

    expectedJson[key] = {
      isEnabled: expectedSkill.isEnabled,

      isProficient: expectedSkill.isProficient,
      override: expectedSkill.override
    };
  }

  expect(json).toStrictEqual(expectedJson);

  return json;
}