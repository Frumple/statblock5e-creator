import SkillsSection from './skills-section.js';
import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';

import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { formatModifier, nullIfEmptyString } from '../../../helpers/string-formatter.js';

import CurrentContext from '../../../models/current-context.js';

const singleSkillUnderTest = 'investigation';
const singleAbilityUnderTest = 'intelligence';

const expectedHeading = 'Skills';

const abilitiesModel = CurrentContext.creature.abilities;
const challengeRatingModel = CurrentContext.creature.challengeRating;
const skillsModel = CurrentContext.creature.skills;

let skillsSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await SkillsSection.define();
});

beforeEach(() => {
  abilitiesModel.reset();
  challengeRatingModel.reset();
  skillsModel.reset();

  skillsSection = new SkillsSection();
  TestCustomElements.initializeSection(skillsSection);
  skillsSection.connect();
});

it('show section should have default values', () => {
  verifyShowModeView();
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
    it('should enable the expert checkbox and override field', () => {
      const skillElements = skillsSection.editElements.skill[singleSkillUnderTest];

      skillElements.enable.click();

      verifySkillEditElementsEnabledOrDisabled(skillElements);

      expect(skillElements.modifier).toHaveTextContent('+2');
      expect(skillElements.expert.checked).toBe(false);
      expect(skillElements.override.value).toBe('');
    });
  });

  describe('and the enable checkbox is unchecked', () => {
    it('should disable the expert checkbox and override field, uncheck the expert checkbox, and clear the override field', () => {
      const skillElements = skillsSection.editElements.skill[singleSkillUnderTest];

      skillElements.enable.click();

      skillElements.override.value = 7;

      skillElements.enable.click();

      verifySkillEditElementsEnabledOrDisabled(skillElements);

      expect(skillElements.modifier).toHaveTextContent('+0');
      expect(skillElements.expert.checked).toBe(false);
      expect(skillElements.override.value).toBe('');
    });
  });

  describe('and the ability score and proficiency bonus are set, the skill fields are set, and the edit section is submitted', () => {
    describe('should update the skill modifier, switch to show mode, and display the skill modifier in show mode if enabled', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description                                  | abilityScore | proficiencyBonus | skillEnabled | skillExpertise | skillOverride | expectedModifier | expectedText
        ${'skill disabled, not expert, no override'} | ${10}        | ${2}             | ${false}     | ${false}       | ${''}         | ${0}             | ${''}
        ${'skill enabled, not expert, no override'}  | ${10}        | ${2}             | ${true}      | ${false}       | ${''}         | ${2}             | ${'Investigation +2'}
        ${'skill enabled, expert, no override'}      | ${10}        | ${2}             | ${true}      | ${true}        | ${''}         | ${4}             | ${'Investigation +4'}
        ${'skill enabled, not expert, override'}     | ${10}        | ${2}             | ${true}      | ${false}       | ${7}          | ${7}             | ${'Investigation +7'}
        ${'skill enabled, expert, override'}         | ${10}        | ${2}             | ${true}      | ${true}        | ${8}          | ${8}             | ${'Investigation +8'}
        ${'- ability score and - proficiency bonus'} | ${3}         | ${-1}            | ${true}      | ${false}       | ${''}         | ${-5}            | ${'Investigation –5'}
        ${'- ability score and 0 proficiency bonus'} | ${3}         | ${0}             | ${true}      | ${false}       | ${''}         | ${-4}            | ${'Investigation –4'}
        ${'- ability score and + proficiency bonus'} | ${3}         | ${3}             | ${true}      | ${false}       | ${''}         | ${-1}            | ${'Investigation –1'}
        ${'0 ability score and - proficiency bonus'} | ${10}        | ${-1}            | ${true}      | ${false}       | ${''}         | ${-1}            | ${'Investigation –1'}
        ${'0 ability score and 0 proficiency bonus'} | ${10}        | ${0}             | ${true}      | ${false}       | ${''}         | ${0}             | ${'Investigation +0'}
        ${'0 ability score and + proficiency bonus'} | ${10}        | ${3}             | ${true}      | ${false}       | ${''}         | ${3}             | ${'Investigation +3'}
        ${'+ ability score and - proficiency bonus'} | ${14}        | ${-1}            | ${true}      | ${false}       | ${''}         | ${1}             | ${'Investigation +1'}
        ${'+ ability score and 0 proficiency bonus'} | ${14}        | ${0}             | ${true}      | ${false}       | ${''}         | ${2}             | ${'Investigation +2'}
        ${'+ ability score and + proficiency bonus'} | ${14}        | ${3}             | ${true}      | ${false}       | ${''}         | ${5}             | ${'Investigation +5'}
      `
      ('$description: {abilityScore="$abilityScore", proficiencyBonus="$proficiencyBonus", skillEnabled="$skillEnabled", skillExpertise="$skillExpertise", skillOverride="$skillOverride"} => {expectedModifier="$expectedModifier", expectedText="$expectedText"}',
      ({abilityScore, proficiencyBonus, skillEnabled, skillExpertise, skillOverride, expectedModifier, expectedText}) => {
        let receivedEvent = null;
        skillsSection.addEventListener('skillChanged', (event) => {
          receivedEvent = event;
        });

        const skillElements = skillsSection.editElements.skill[singleSkillUnderTest];
        const expectedSkills = createDefaultExpectedSkills();
        for (const [key, value] of skillsModel.entries) {
          if (value.abilityModel === abilitiesModel.abilities[singleAbilityUnderTest]) {
            if (abilityScore === 3) {
              expectedSkills[key].modifier = -4;
            } else if (abilityScore === 14) {
              expectedSkills[key].modifier = 2;
            }
          }
        }
        const expectedSkill = expectedSkills[singleSkillUnderTest];
        expectedSkill.isEnabled = skillEnabled;
        expectedSkill.hasExpertise = skillExpertise;
        expectedSkill.override = nullIfEmptyString(skillOverride);
        expectedSkill.modifier = expectedModifier;

        abilitiesModel.abilities[singleAbilityUnderTest].score = abilityScore;
        challengeRatingModel.proficiencyBonus = proficiencyBonus;

        for(const key of skillsModel.keys) {
          skillsSection.updateEditModeViewSkillModifier(key);
        }

        if (skillEnabled) {
          skillElements.enable.click();
          expectSkillChangedEvent(receivedEvent, singleSkillUnderTest);
          receivedEvent = null;

          if (skillExpertise) {
            skillElements.expert.click();
            expectSkillChangedEvent(receivedEvent, singleSkillUnderTest);
            receivedEvent = null;
          }

          if (skillOverride !== '') {
            inputValueAndTriggerEvent(skillElements.override, skillOverride);
            expectSkillChangedEvent(receivedEvent, singleSkillUnderTest);
            receivedEvent = null;
          }
        }

        verifyModel(expectedSkills);
        verifyEditModeView(expectedSkills);

        skillsSection.editElements.submitForm();

        expect(skillsSection).toBeInMode('show');
        verifyShowModeView(expectedText);
        if (expectedText === '') {
          expect(skillsSection.showElements.section).toHaveClass('section_empty');
        } else {
          expect(skillsSection.showElements.section).not.toHaveClass('section_empty');
        }

        const json = verifyJsonExport(expectedSkills);
        expect(skillsSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(skillsSection).toExportPropertyLineToMarkdown(expectedHeading, expectedText);

        reset();
        abilitiesModel.abilities[singleAbilityUnderTest].score = abilityScore;
        challengeRatingModel.proficiencyBonus = proficiencyBonus;
        skillsSection.importFromJson(json);

        verifyModel(expectedSkills);
        verifyEditModeView(expectedSkills);
        verifyShowModeView(expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and multiple skills are enabled in various configurations, and the edit section is submitted', () => {
    describe('should update the corresponding skill modifiers, switch to show mode, and display the skill modifiers in show mode if enabled', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        description              | strScore | dexScore | conScore | intScore | wisScore | chaScore | profBonus | skillsEnabled                                                      | skillsExpertise   | skillsOverride                                                          | expectedText
        ${'ancient gold dragon'} | ${30}    | ${14}    | ${29}    | ${18}    | ${17}    | ${28}    | ${7}      | ${['insight', 'perception', 'persuasion', 'stealth']}              | ${['perception']} | ${{}}                                                                   | ${'Insight +10, Perception +17, Persuasion +16, Stealth +9'}
        ${'gladiator'}           | ${18}    | ${15}    | ${16}    | ${10}    | ${12}    | ${15}    | ${3}      | ${['athletics', 'intimidation']}                                   | ${['athletics']}  | ${{}}                                                                   | ${'Athletics +10, Intimidation +5'}
        ${'lich'}                | ${11}    | ${16}    | ${16}    | ${20}    | ${14}    | ${16}    | ${7}      | ${['arcana', 'history', 'insight', 'perception']}                  | ${[]}             | ${{arcana: 18}}                                                         | ${'Arcana +18, History +12, Insight +9, Perception +9'}
        ${'mage'}                | ${9}     | ${14}    | ${11}    | ${17}    | ${12}    | ${11}    | ${3}      | ${['arcana', 'history']}                                           | ${[]}             | ${{}}                                                                   | ${'Arcana +6, History +6'}
        ${'mummy lord'}          | ${18}    | ${10}    | ${17}    | ${11}    | ${18}    | ${16}    | ${5}      | ${['history', 'religion']}                                         | ${[]}             | ${{}}                                                                   | ${'History +5, Religion +5'}
        ${'storm giant'}         | ${29}    | ${14}    | ${20}    | ${16}    | ${18}    | ${18}    | ${5}      | ${['arcana', 'athletics', 'history', 'perception']}                | ${[]}             | ${{}}                                                                   | ${'Arcana +8, Athletics +14, History +8, Perception +9'}
        ${'override test'}       | ${10}    | ${10}    | ${10}    | ${10}    | ${10}    | ${10}    | ${2}      | ${['animalHandling', 'deception', 'performance', 'sleightOfHand']} | ${[]}             | ${{animalHandling: -1, deception: 0, performance: 1, sleightOfHand: 2}} | ${'Animal Handling –1, Deception +0, Performance +1, Sleight of Hand +2'}
      `
      ('$description',
      ({strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus, skillsEnabled, skillsExpertise, skillsOverride, expectedText}) => {
        populateAbilityScoresAndProficiencyBonus(strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus);

        const expectedSkills = createDefaultExpectedSkills();
        populateExpectedSkills(expectedSkills, profBonus, skillsEnabled, skillsExpertise, skillsOverride);

        for (const key of skillsModel.keys) {
          const enabled = skillsEnabled.includes(key);
          const expertise = skillsExpertise.includes(key);
          const override = (key in skillsOverride) ? skillsOverride[key] : null;

          const elements = skillsSection.editElements.skill[key];

          if (enabled) {
            elements.enable.click();

            if (expertise) {
              elements.expert.click();
            }

            if (override !== '') {
              inputValueAndTriggerEvent(elements.override, override);
            }
          }
        }

        verifyModel(expectedSkills);
        verifyEditModeView(expectedSkills);

        skillsSection.editElements.submitForm();

        expect(skillsSection).toBeInMode('show');
        verifyShowModeView(expectedText);

        const json = verifyJsonExport(expectedSkills);
        expect(skillsSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(skillsSection).toExportPropertyLineToMarkdown(expectedHeading, expectedText);

        reset();
        populateAbilityScoresAndProficiencyBonus(strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus);
        skillsSection.importFromJson(json);

        verifyModel(expectedSkills);
        verifyEditModeView(expectedSkills);
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
      description              | strScore | dexScore | conScore | intScore | wisScore | chaScore | profBonus | skills                                                       | expectedText
      ${'ancient gold dragon'} | ${30}    | ${14}    | ${29}    | ${18}    | ${17}    | ${28}    | ${7}      | ${{insight: 10, perception: 17, persuasion: 16, stealth: 9}} | ${'Insight +10, Perception +17, Persuasion +16, Stealth +9'}
      ${'gladiator'}           | ${18}    | ${15}    | ${16}    | ${10}    | ${12}    | ${15}    | ${3}      | ${{athletics: 10, intimidation: 5}}                          | ${'Athletics +10, Intimidation +5'}
      ${'lich'}                | ${11}    | ${16}    | ${16}    | ${20}    | ${14}    | ${16}    | ${7}      | ${{arcana: 18, history: 12, insight: 9, perception: 9}}      | ${'Arcana +18, History +12, Insight +9, Perception +9'}
      ${'mage'}                | ${9}     | ${14}    | ${11}    | ${17}    | ${12}    | ${11}    | ${3}      | ${{arcana: 6, history: 6}}                                   | ${'Arcana +6, History +6'}
      ${'mummy lord'}          | ${18}    | ${10}    | ${17}    | ${11}    | ${18}    | ${16}    | ${5}      | ${{history: 5, religion: 5}}                                 | ${'History +5, Religion +5'}
      ${'storm giant'}         | ${29}    | ${14}    | ${20}    | ${16}    | ${18}    | ${18}    | ${5}      | ${{arcana: 8, athletics: 14, history: 8, perception: 9}}     | ${'Arcana +8, Athletics +14, History +8, Perception +9'}
    `
    ('$description',
    ({strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus, skills, expectedText}) => {
      populateAbilityScoresAndProficiencyBonus(strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus);

      const expectedSkills = createDefaultExpectedSkills();

      const skillsEnabled = [];
      const skillsExpertise = [];
      const skillsOverride = {};

      for (const [key, value] of Object.entries(skills)) {
        const enabledModifier = skillsModel.skills[key].abilityModel.modifier + challengeRatingModel.proficiencyBonus;
        const expertModifier = enabledModifier + challengeRatingModel.proficiencyBonus;

        skillsEnabled.push(key);

        if (value === enabledModifier) {
          continue;
        } else if (value === expertModifier) {
          skillsExpertise.push(key);
        } else {
          skillsOverride[key] = value;
        }
      }

      populateExpectedSkills(expectedSkills, profBonus, skillsEnabled, skillsExpertise, skillsOverride);

      // TODO: Determine what the Open5e skill keys are for Animal Handling and Sleight of Hand, and use those keys instead.
      const json = {
        skills: skills
      };

      skillsSection.importFromOpen5e(json);

      verifyModel(expectedSkills);
      verifyEditModeView(expectedSkills);
      verifyShowModeView(expectedText);
    });
  });
});

describe('when the section is empty and not visible', () => {
  describe('and a creature with skills is imported from JSON', () => {
    it('should show the new skills', () => {
      const expectedText = 'Animal Handling +4';
      const json = createDefaultExpectedSkills();
      json.animalHandling.isEnabled = true;
      json.animalHandling.hasExpertise = true;

      skillsSection.mode = 'hidden';
      skillsSection.importFromJson(json);

      expect(skillsSection).toBeInMode('show');
      verifyShowModeView(expectedText);
    });
  });
});

function expectSkillChangedEvent(event, skillName) {
  expect(event).not.toBeNull();
  expect(event.detail.skillName).toBe(skillName);
}

function reset() {
  abilitiesModel.reset();
  challengeRatingModel.reset();
  skillsModel.reset();
  skillsSection.updateView();
}

function populateAbilityScoresAndProficiencyBonus(strScore, dexScore, conScore, intScore, wisScore, chaScore, profBonus) {
  for (const value of skillsModel.values) {
    const abbreviation = value.abilityModel.abbreviation;
    const score = eval(`${abbreviation}Score`);
    value.abilityModel.score = score;
  }

  challengeRatingModel.proficiencyBonus = profBonus;

  skillsSection.updateView();
}

function createDefaultExpectedSkills() {
  const expectedSkills = {};
  for (const key of skillsModel.keys) {
    expectedSkills[key] = {
      isEnabled: false,
      hasExpertise: false,
      override: null,
      modifier: 0
    };
  }

  return expectedSkills;
}

function populateExpectedSkills(expectedSkills, profBonus, skillsEnabled, skillsExpertise, skillsOverride) {
  for (const [key, value] of skillsModel.entries) {
    const enabled = skillsEnabled.includes(key);
    const expertise = skillsExpertise.includes(key);
    const override = (key in skillsOverride) ? skillsOverride[key] : null;

    let modifier = value.abilityModel.modifier;

    if (enabled) {
      if (override !== null) {
        modifier = override;
      } else {
        modifier += profBonus;

        if (expertise) {
          modifier += profBonus;
        }
      }
    }

    expectedSkills[key] = {
      isEnabled: enabled,
      hasExpertise: expertise,
      override: override,
      modifier: modifier
    };
  }
}

function verifyModel(expectedSkills) {
  for (const [key, value] of skillsModel.entries) {
    const expectedSkill = expectedSkills[key];

    expect(value.isEnabled).toBe(expectedSkill.isEnabled);
    expect(value.hasExpertise).toBe(expectedSkill.hasExpertise);
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
    expect(skillElements.expert.checked).toBe(expectedSkill.hasExpertise);
    expect(skillElements.override).toHaveValue(expectedSkill.override);

    verifySkillEditElementsEnabledOrDisabled(skillElements);
  }
}

function verifySkillEditElementsEnabledOrDisabled(skillElements) {
  if (skillElements.enable.checked) {
    expect(skillElements.label).not.toHaveAttribute('disabled');
    expect(skillElements.modifier).not.toHaveAttribute('disabled');
    expect(skillElements.expert).not.toHaveAttribute('disabled');
    expect(skillElements.override).not.toHaveAttribute('disabled');
  } else {
    expect(skillElements.label).toHaveAttribute('disabled');
    expect(skillElements.modifier).toHaveAttribute('disabled');
    expect(skillElements.expert).toHaveAttribute('disabled');
    expect(skillElements.override).toHaveAttribute('disabled');
  }
}

function verifyShowModeView(expectedText = '') {
  expect(skillsSection).toShowPropertyLine(expectedHeading, expectedText);
}

function verifyJsonExport(expectedSkills) {
  const json = skillsSection.exportToJson();

  const expectedJson = {};
  for (const key of skillsModel.keys) {
    const expectedSkill = expectedSkills[key];

    expectedJson[key] = {
      isEnabled: expectedSkill.isEnabled,
      hasExpertise: expectedSkill.hasExpertise,
      override: expectedSkill.override
    };
  }

  expect(json).toStrictEqual(expectedJson);

  return json;
}