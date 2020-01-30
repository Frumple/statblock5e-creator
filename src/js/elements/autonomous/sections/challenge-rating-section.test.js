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
        challengeRating | expectedExperiencePoints | expectedText
        ${0}            | ${10}                    | ${'0 (10 XP)'}
        ${0.125}        | ${25}                    | ${'1/8 (25 XP)'}
        ${0.25}         | ${50}                    | ${'1/4 (50 XP)'}
        ${0.5}          | ${100}                   | ${'1/2 (100 XP)'}
        ${1}            | ${200}                   | ${'1 (200 XP)'}
        ${2}            | ${450}                   | ${'2 (450 XP)'}
        ${3}            | ${700}                   | ${'3 (700 XP)'}
        ${4}            | ${1100}                  | ${'4 (1100 XP)'}
        ${5}            | ${1800}                  | ${'5 (1800 XP)'}
        ${6}            | ${2300}                  | ${'6 (2300 XP)'}
        ${7}            | ${2900}                  | ${'7 (2900 XP)'}
        ${8}            | ${3900}                  | ${'8 (3900 XP)'}
        ${9}            | ${5000}                  | ${'9 (5000 XP)'}
        ${10}           | ${5900}                  | ${'10 (5900 XP)'}
        ${11}           | ${7200}                  | ${'11 (7200 XP)'}
        ${12}           | ${8400}                  | ${'12 (8400 XP)'}
        ${13}           | ${10000}                 | ${'13 (10000 XP)'}
        ${14}           | ${11500}                 | ${'14 (11500 XP)'}
        ${15}           | ${13000}                 | ${'15 (13000 XP)'}
        ${16}           | ${15000}                 | ${'16 (15000 XP)'}
        ${17}           | ${18000}                 | ${'17 (18000 XP)'}
        ${18}           | ${20000}                 | ${'18 (20000 XP)'}
        ${19}           | ${22000}                 | ${'19 (22000 XP)'}
        ${20}           | ${25000}                 | ${'20 (25000 XP)'}
        ${21}           | ${33000}                 | ${'21 (33000 XP)'}
        ${22}           | ${41000}                 | ${'22 (41000 XP)'}
        ${23}           | ${50000}                 | ${'23 (50000 XP)'}
        ${24}           | ${62000}                 | ${'24 (62000 XP)'}
        ${25}           | ${75000}                 | ${'25 (75000 XP)'}
        ${26}           | ${90000}                 | ${'26 (90000 XP)'}
        ${27}           | ${105000}                | ${'27 (105000 XP)'}
        ${28}           | ${120000}                | ${'28 (120000 XP)'}
        ${29}           | ${135000}                | ${'29 (135000 XP)'}
        ${30}           | ${155000}                | ${'30 (155000 XP)'}
      `
      ('$challengeRating => {expectedExperiencePoints = $expectedExperiencePoints, expectedText = $expectedText}',
      ({challengeRating, expectedExperiencePoints, expectedText}) => {
        inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, challengeRating);

        verifyEditModeView(challengeRating, expectedExperiencePoints);

        challengeRatingSection.editElements.submitForm();

        verifyModel(challengeRating, expectedExperiencePoints);
        expect(challengeRatingSection).toBeInMode('show');
        expect(challengeRatingSection).toShowPropertyLine(expectedHeading, expectedText);

        const json = verifyJsonExport(challengeRating, expectedExperiencePoints);
        expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
        expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

        reset();
        challengeRatingSection.importFromJson(json);

        verifyModel(challengeRating, expectedExperiencePoints);
        verifyEditModeView(challengeRating, expectedExperiencePoints);
      });
      /* eslint-enable indent, no-unexpected-multiline */
    });
  });

  describe('and the experience points field is changed, and the edit section is submitted', () => {
    it('should save the fields', () => {
      const expectedChallengeRating = 0;
      const expectedExperiencePoints = 234;
      const expectedText = '0 (234 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, expectedExperiencePoints);

      verifyEditModeView(expectedChallengeRating, expectedExperiencePoints);

      challengeRatingSection.editElements.submitForm();

      verifyModel(expectedChallengeRating, expectedExperiencePoints);
      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toShowPropertyLine(expectedHeading, expectedText);

      const json = verifyJsonExport(expectedChallengeRating, expectedExperiencePoints);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

      reset();
      challengeRatingSection.importFromJson(json);

      verifyModel(expectedChallengeRating, expectedExperiencePoints);
      verifyEditModeView(expectedChallengeRating, expectedExperiencePoints);
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

  describe('and the challenge rating field is changed followed by the experience points field, and the edit section is submitted', () => {
    it('should save the fields', () => {
      const expectedChallengeRating = 3;
      const expectedExperiencePoints = 888;
      const expectedText = '3 (888 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, expectedChallengeRating);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, expectedExperiencePoints);

      verifyEditModeView(expectedChallengeRating, expectedExperiencePoints);

      challengeRatingSection.editElements.submitForm();

      verifyModel(expectedChallengeRating, expectedExperiencePoints);
      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toShowPropertyLine(expectedHeading, expectedText);

      const json = verifyJsonExport(expectedChallengeRating, expectedExperiencePoints);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

      reset();
      challengeRatingSection.importFromJson(json);

      verifyModel(expectedChallengeRating, expectedExperiencePoints);
      verifyEditModeView(expectedChallengeRating, expectedExperiencePoints);
    });
  });

  describe('and the experience points field is changed followed by the challenge rating field, and the edit section is submitted', () => {
    it('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      const inputtedExperiencePoints = 1586;

      const expectedExperiencePoints = 25000;
      const expectedChallengeRating = 20;
      const expectedText = '20 (25000 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, inputtedExperiencePoints);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, expectedChallengeRating);

      verifyEditModeView(expectedChallengeRating, expectedExperiencePoints);

      challengeRatingSection.editElements.submitForm();

      verifyModel(expectedChallengeRating, expectedExperiencePoints);
      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toShowPropertyLine(expectedHeading, expectedText);

      const json = verifyJsonExport(expectedChallengeRating, expectedExperiencePoints);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);

      reset();
      challengeRatingSection.importFromJson(json);

      verifyModel(expectedChallengeRating, expectedExperiencePoints);
      verifyEditModeView(expectedChallengeRating, expectedExperiencePoints);
    });
  });
});

function reset() {
  challengeRatingModel.reset();
  challengeRatingSection.updateView();
}

function verifyModel(challengeRating = 0, experiencePoints = 10) {
  expect(challengeRatingModel.challengeRating).toBe(challengeRating);
  expect(challengeRatingModel.experiencePoints).toBe(experiencePoints);
}

function verifyEditModeView(challengeRating = 0, experiencePoints = 10) {
  expect(challengeRatingSection.editElements.challengeRating.value).toBe(challengeRating.toString());
  expect(challengeRatingSection.editElements.experiencePoints.value).toBe(experiencePoints.toString());
}

function verifyJsonExport(challengeRating = 0, experiencePoints = 10) {
  const json = challengeRatingSection.exportToJson();
  const expectedJson = {
    challengeRating: challengeRating,
    experiencePoints: experiencePoints
  };

  expect(json).toStrictEqual(expectedJson);

  return json;
}