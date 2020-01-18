import ChallengeRatingSection from './challenge-rating-section.js';
import CurrentContext from '../../../models/current-context.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const expectedHeading = 'Challenge';

const challengeRating = CurrentContext.creature.challengeRating;

let challengeRatingSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ChallengeRatingSection.define();
});

beforeEach(() => {
  challengeRating.reset();

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
    expect(challengeRatingSection.editElements.challengeRating).toHaveValue('0');
    expect(challengeRatingSection.editElements.experiencePoints).toHaveValue(10);
  });

  it('should switch to edit mode and focus on the challenge rating field', () => {
    expect(challengeRatingSection).toBeInMode('edit');
    expect(challengeRatingSection.editElements.challengeRating).toHaveFocus();
  });

  describe('and the challenge rating field is changed, and the edit section is submitted', () => {
    it('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      const inputtedChallengeRating = 8;

      const expectedChallengeRating = inputtedChallengeRating;
      const expectedExperiencePoints = 3900;
      const expectedText = '8 (3900 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, inputtedChallengeRating);

      expect(challengeRatingSection.editElements.experiencePoints.value).toBe(`${expectedExperiencePoints}`);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toShowPropertyLine(expectedHeading, expectedText);

      verifyJsonExport(expectedChallengeRating, expectedExperiencePoints);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
    });
  });

  describe('and the experience points field is changed, and the edit section is submitted', () => {
    it('should save the fields', () => {
      const inputtedExperiencePoints = 234;

      const expectedChallengeRating = 0;
      const expectedExperiencePoints = inputtedExperiencePoints;
      const expectedText = '0 (234 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, inputtedExperiencePoints);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toShowPropertyLine(expectedHeading, expectedText);

      verifyJsonExport(expectedChallengeRating, expectedExperiencePoints);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
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
      const inputtedChallengeRating = 3;
      const inputtedExperiencePoints = 888;

      const expectedChallengeRating = inputtedChallengeRating;
      const expectedExperiencePoints = inputtedExperiencePoints;
      const expectedText = '3 (888 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, inputtedChallengeRating);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, inputtedExperiencePoints);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toShowPropertyLine(expectedHeading, expectedText);

      verifyJsonExport(expectedChallengeRating, expectedExperiencePoints);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
    });
  });

  describe('and the experience points field is changed followed by the challenge rating field, and the edit section is submitted', () => {
    it('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      const inputtedExperiencePoints = 1586;
      const inputtedChallengeRating = 20;

      const expectedExperiencePoints = 25000;
      const expectedChallengeRating = inputtedChallengeRating;
      const expectedText = '20 (25000 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, inputtedExperiencePoints);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, inputtedChallengeRating);

      expect(challengeRatingSection.editElements.experiencePoints.value).toBe(`${expectedExperiencePoints}`);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toShowPropertyLine(expectedHeading, expectedText);

      verifyJsonExport(expectedChallengeRating, expectedExperiencePoints);
      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
      expect(challengeRatingSection).toExportPropertyLineToHomebrewery(expectedHeading, expectedText);
    });
  });
});

function verifyJsonExport(challengeRating, experiencePoints) {
  const jsObject = challengeRatingSection.exportToJson();
  const expectedJson = {
    challengeRating: challengeRating,
    experiencePoints: experiencePoints
  };

  expect(jsObject).toStrictEqual(expectedJson);
}