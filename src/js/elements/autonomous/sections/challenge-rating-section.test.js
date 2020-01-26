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
    it('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      const expectedChallengeRating = 8;
      const expectedExperiencePoints = 3900;
      const expectedText = '8 (3900 XP)';

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