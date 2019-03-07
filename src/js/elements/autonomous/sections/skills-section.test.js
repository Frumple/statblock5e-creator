import SkillsSection from './skills-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { formatModifier } from '../../../helpers/string-formatter.js';

import Abilities from '../../../stats/abilities.js';
import ProficiencyBonus from '../../../stats/proficiency-bonus.js';
import Skills from '../../../stats/skills.js';

const labelDisabledClass = 'section__label_disabled';
const singleSkillUnderTest = 'investigation';
const singleAbilityUnderTest = 'intelligence';

let skillsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SkillsSection.define();
});

beforeEach(() => {
  Abilities.reset();
  ProficiencyBonus.reset();
  Skills.reset();

  skillsSection = new SkillsSection();
  TestCustomElements.initializeSection(skillsSection);
  skillsSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    skillsSection.showElements.section.click(); 
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
        
        Abilities.abilities[singleAbilityUnderTest].score = abilityScore;
        ProficiencyBonus.proficiencyBonus = proficiencyBonus;

        if (skillEnabled) {
          skillElements.enable.click();
          expectSkillChangedEvent(receivedEvent, singleSkillUnderTest);
          receivedEvent = null;

          if (! skillProficient) {
            skillElements.proficient.click();
            expectSkillChangedEvent(receivedEvent, singleSkillUnderTest);
            receivedEvent = null;
          }

          if (! isNaN(skillOverride)) {
            inputValueAndTriggerEvent(skillElements.override, skillOverride);
            expectSkillChangedEvent(receivedEvent, singleSkillUnderTest);
            receivedEvent = null;
          }
        }

        const skill = Skills.skills[singleSkillUnderTest];
        expect(skill.isEnabled).toBe(skillEnabled);
        expect(skill.isProficient).toBe(skillProficient);
        if (skillOverride === '') {
          expect(skill.override).toBe(NaN);
        } else {
          expect(skill.override).toBe(skillOverride);
        }        
        expect(skill.calculateModifier()).toBe(expectedModifier);

        let formattedModifier = formatModifier(expectedModifier);
        expect(skillElements.modifier).toHaveTextContent(formattedModifier);

        skillsSection.editElements.submitForm();

        expect(skillsSection.showElements.text).toHaveTextContent(expectedText);

        if (expectedText === '') {
          expect(skillsSection.showElements.section).toHaveClass('section_empty');
        } else {
          expect(skillsSection.showElements.section).not.toHaveClass('section_empty');
        }
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
        Abilities.abilities['strength'].score = 7;
        Abilities.abilities['dexterity'].score = 14;
        Abilities.abilities['intelligence'].score = 13;
        Abilities.abilities['wisdom'].score = 11;
        Abilities.abilities['charisma'].score = 20;
        ProficiencyBonus.proficiencyBonus = 3;

        if (athletics) {
          let elements = skillsSection.editElements.skill['athletics'];
          elements.enable.click();
          elements.proficient.click();
        }

        if (history) {
          let elements = skillsSection.editElements.skill['history'];
          elements.enable.click();
          elements.proficient.click();          
        }

        if (insight) {
          let elements = skillsSection.editElements.skill['insight'];
          elements.enable.click();
          inputValueAndTriggerEvent(elements.override, -3);
        }

        if (persuasion) {
          let elements = skillsSection.editElements.skill['persuasion'];
          elements.enable.click();
        }

        if (sleightOfHand) {
          let elements = skillsSection.editElements.skill['sleight-of-hand'];
          elements.enable.click();
          elements.proficient.click();
          inputValueAndTriggerEvent(elements.override, 0);
        }

        skillsSection.editElements.submitForm();

        expect(skillsSection.showElements.text).toHaveTextContent(expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });
});

function expectSkillChangedEvent(event, skillName) {
  expect(event).not.toBeNull();
  expect(event.detail.skillName).toBe(skillName);
}