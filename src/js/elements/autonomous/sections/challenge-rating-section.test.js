import ChallengeRatingSection from './challenge-rating-section.js';
import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const expectedHeading = 'Challenge';

const challengeRatingModel = CurrentContext.creature.challengeRating;

let challengeRatingSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ChallengeRatingSection.define();
});

beforeEach(() => {
  challengeRatingModel.reset();

  challengeRatingSection = new ChallengeRatingSection();
  TestCustomElements.initializeSection(challengeRatingSection);
  challengeRatingSection.connect();
});

it('show section should have default values', () => {
  expect(challengeRatingSection.showElements.heading).toHaveTextContent('Challenge');
  expect(challengeRatingSection.showElements.text).toHaveTextContent('0 (10 XP)');
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    challengeRatingSection.showElements.section.click();
  });

  it('edit section should have default values', () => {
    verifyEditModeView();
  });

  it('should switch to edit mode and focus on the challenge rating field', () => {
    expect(challengeRatingSection).toBeInMode('edit');
    expect(challengeRatingSection.editElements.challengeRating).toHaveFocus();
  });

  describe('and the challenge rating field is changed, and the edit section is submitted', () => {
    describe('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      /* eslint-disable indent, no-unexpected-multiline */
      it.each
      `
        challengeRating | expectedExperiencePoints | expectedProficiencyBonus | expectedText
        ${0}            | ${10}                    | ${2}                     | ${'0 (10 XP)'}
        ${0.125}        | ${25}                    | ${2}                     | ${'1/8 (25 XP)'}
        ${0.25}         | ${50}                    | ${2}                     | ${'1/4 (50 XP)'}
        ${0.5}          | ${100}                   | ${2}                     | ${'1/2 (100 XP)'}
        ${1}            | ${200}                   | ${2}                     | ${'1 (200 XP)'}
        ${2}            | ${450}                   | ${2}                     | ${'2 (450 XP)'}
        ${3}            | ${700}                   | ${2}                     | ${'3 (700 XP)'}
        ${4}            | ${1100}                  | ${2}                     | ${'4 (1100 XP)'}
        ${5}            | ${1800}                  | ${3}                     | ${'5 (1800 XP)'}
        ${6}            | ${2300}                  | ${3}                     | ${'6 (2300 XP)'}
        ${7}            | ${2900}                  | ${3}                     | ${'7 (2900 XP)'}
        ${8}            | ${3900}                  | ${3}                     | ${'8 (3900 XP)'}
        ${9}            | ${5000}                  | ${4}                     | ${'9 (5000 XP)'}
        ${10}           | ${5900}                  | ${4}                     | ${'10 (5900 XP)'}
        ${11}           | ${7200}                  | ${4}                     | ${'11 (7200 XP)'}
        ${12}           | ${8400}                  | ${4}                     | ${'12 (8400 XP)'}
        ${13}           | ${10000}                 | ${5}                     | ${'13 (10000 XP)'}
        ${14}           | ${11500}                 | ${5}                     | ${'14 (11500 XP)'}
        ${15}           | ${13000}                 | ${5}                     | ${'15 (13000 XP)'}
        ${16}           | ${15000}                 | ${5}                     | ${'16 (15000 XP)'}
        ${17}           | ${18000}                 | ${6}                     | ${'17 (18000 XP)'}
        ${18}           | ${20000}                 | ${6}                     | ${'18 (20000 XP)'}
        ${19}           | ${22000}                 | ${6}                     | ${'19 (22000 XP)'}
        ${20}           | ${25000}                 | ${6}                     | ${'20 (25000 XP)'}
        ${21}           | ${33000}                 | ${7}                     | ${'21 (33000 XP)'}
        ${22}           | ${41000}                 | ${7}                     | ${'22 (41000 XP)'}
        ${23}           | ${50000}                 | ${7}                     | ${'23 (50000 XP)'}
        ${24}           | ${62000}                 | ${7}                     | ${'24 (62000 XP)'}
        ${25}           | ${75000}                 | ${8}                     | ${'25 (75000 XP)'}
        ${26}           | ${90000}                 | ${8}                     | ${'26 (90000 XP)'}
        ${27}           | ${105000}                | ${8}                     | ${'27 (105000 XP)'}
        ${28}           | ${120000}                | ${8}                     | ${'28 (120000 XP)'}
        ${29}           | ${135000}                | ${9}                     | ${'29 (135000 XP)'}
        ${30}           | ${155000}                | ${9}                     | ${'30 (155000 XP)'}
      `
      ('$challengeRating => {expectedExperiencePoints = $expectedExperiencePoints, expectedProficiencyBonus = $expectedProficiencyBonus, expectedText = $expectedText}',
      ({challengeRating, expectedExperiencePoints, expectedProficiencyBonus, expectedText}) => {
        const expectedValues = {
          challengeRating: challengeRating,
          experiencePoints: expectedExperiencePoints,
          proficiencyBonus: expectedProficiencyBonus
        };

        inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, challengeRating);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);

        challengeRatingSection.editElements.submitForm();

        expect(challengeRatingSection).toBeInMode('show');
        verifyShowModeView(expectedText);

        const json = verifyJsonExport(expectedValues);
        expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

        reset();
        challengeRatingSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView(expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and the experience points field is changed, and the edit section is submitted', () => {
    it('should save the fields', () => {
      const expectedValues = {
        experiencePoints: 234
      };
      const expectedText = '0 (234 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, expectedValues.experiencePoints);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      verifyShowModeView(expectedText);

      const json = verifyJsonExport(expectedValues);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

      reset();
      challengeRatingSection.importFromJson(json);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);
      verifyShowModeView(expectedText);
    });

    it('should display an error if the experience points field is not a valid number', () => {
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, '');

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('edit');
      expect(challengeRatingSection).toHaveError(
        challengeRatingSection.editElements.experiencePoints,
        'Experience Points must be a valid number.');
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
        const expectedValues = {
          proficiencyBonus: proficiencyBonus
        };
        const expectedText = '0 (10 XP)';

        let receivedEvent = null;
        challengeRatingSection.addEventListener('proficiencyBonusChanged', (event) => {
          receivedEvent = event;
        });

        inputValueAndTriggerEvent(challengeRatingSection.editElements.proficiencyBonus, proficiencyBonus);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);

        expect(receivedEvent).not.toBeNull();

        challengeRatingSection.editElements.submitForm();

        verifyShowModeView(expectedText);

        const json = verifyJsonExport(expectedValues);

        reset();
        challengeRatingSection.importFromJson(json);

        verifyModel(expectedValues);
        verifyEditModeView(expectedValues);
        verifyShowModeView(expectedText);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });

    it('should display an error if the proficiency bonus is not a valid number, and the proficiency bonus is not saved', () => {
      let receivedEvent = null;
      challengeRatingSection.addEventListener('proficiencyBonusChanged', (event) => {
        receivedEvent = event;
      });

      const oldProficiencyBonus = challengeRatingModel.proficiencyBonus;

      inputValueAndTriggerEvent(challengeRatingSection.editElements.proficiencyBonus, '');

      expect(challengeRatingModel.proficiencyBonus).toBe(oldProficiencyBonus);
      expect(receivedEvent).toBeNull();

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('edit');
      expect(challengeRatingSection).toHaveError(
        challengeRatingSection.editElements.proficiencyBonus,
        'Proficiency Bonus must be a valid number.');
    });
  });

  describe('and the challenge rating field is changed, then the experience points field is changed, and the edit section is submitted', () => {
    it('should save the fields', () => {
      const expectedValues = {
        challengeRating: 3,
        experiencePoints: 888
      };
      const expectedText = '3 (888 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, expectedValues.challengeRating);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints,expectedValues.experiencePoints);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      verifyShowModeView(expectedText);

      const json = verifyJsonExport(expectedValues);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

      reset();
      challengeRatingSection.importFromJson(json);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);
      verifyShowModeView(expectedText);
    });
  });

  describe('and the experience points field is changed, then the challenge rating field is changed, and the edit section is submitted', () => {
    it('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      const initialExperiencePoints = 1586;

      const expectedValues = {
        challengeRating: 20,
        experiencePoints: 25000,
        proficiencyBonus: 6
      };
      const expectedText = '20 (25000 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, initialExperiencePoints);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, expectedValues.challengeRating);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      verifyShowModeView(expectedText);

      const json = verifyJsonExport(expectedValues);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

      reset();
      challengeRatingSection.importFromJson(json);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);
      verifyShowModeView(expectedText);
    });
  });

  describe('and the challenge rating field is changed, then the proficiency bonus field is changed, and the edit section is submitted', () => {
    it('should save the fields', () => {
      const expectedValues = {
        challengeRating: 14,
        experiencePoints: 11500,
        proficiencyBonus: 5
      };
      const expectedText = '14 (11500 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, expectedValues.challengeRating);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.proficiencyBonus, expectedValues.proficiencyBonus);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      verifyShowModeView(expectedText);

      const json = verifyJsonExport(expectedValues);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

      reset();
      challengeRatingSection.importFromJson(json);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);
      verifyShowModeView(expectedText);
    });
  });

  describe('and the proficiency bonus field is changed, then the challenge rating field, and the edit section is submitted', () => {
    it('should automatically change the proficiency bonus to the corresponding modifier, and save the fields', () => {
      const initialProficiencyBonus = 7;

      const expectedValues = {
        challengeRating: 8,
        experiencePoints: 3900,
        proficiencyBonus: 3
      };
      const expectedText = '8 (3900 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.proficiencyBonus, initialProficiencyBonus);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, expectedValues.challengeRating);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      verifyShowModeView(expectedText);

      const json = verifyJsonExport(expectedValues);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

      reset();
      challengeRatingSection.importFromJson(json);

      verifyModel(expectedValues);
      verifyEditModeView(expectedValues);
      verifyShowModeView(expectedText);
    });
  });
});

function reset() {
  challengeRatingModel.reset();
  challengeRatingSection.updateView();
}

function verifyModel({
  challengeRating = 0,
  experiencePoints = 10,
  proficiencyBonus = 2
} = {}) {
  expect(challengeRatingModel.challengeRating).toBe(challengeRating);
  expect(challengeRatingModel.experiencePoints).toBe(experiencePoints);
  expect(challengeRatingModel.proficiencyBonus).toBe(proficiencyBonus);
}

function verifyEditModeView({
  challengeRating = 0,
  experiencePoints = 10,
  proficiencyBonus = 2
} = {}) {
  expect(challengeRatingSection.editElements.challengeRating.value).toBe(challengeRating.toString());
  expect(challengeRatingSection.editElements.experiencePoints.value).toBe(experiencePoints.toString());
  expect(challengeRatingSection.editElements.proficiencyBonus.value).toBe(proficiencyBonus.toString());
}

function verifyShowModeView(expectedText) {
  expect(challengeRatingSection).toShowPropertyLine(expectedHeading, expectedText);
}

function verifyJsonExport({
  challengeRating = 0,
  experiencePoints = 10,
  proficiencyBonus = 2
} = {}) {
  const json = challengeRatingSection.exportToJson();
  const expectedJson = {
    challengeRating: challengeRating,
    experiencePoints: experiencePoints,
    proficiencyBonus: proficiencyBonus
  };

  expect(json).toStrictEqual(expectedJson);

  return json;
}