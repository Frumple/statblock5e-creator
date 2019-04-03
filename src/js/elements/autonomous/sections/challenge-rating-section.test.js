import ChallengeRatingSection from './challenge-rating-section.js';
import ChallengeRating from '../../../models/challenge-rating.js';

import * as TestCustomElements from '../../../helpers/test/test-custom-elements.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const expectedHeading = 'Challenge';

let challengeRatingSection;

beforeAll(async() => {
  await TestCustomElements.define();
  await ChallengeRatingSection.define();
});

beforeEach(() => {
  ChallengeRating.reset();

  challengeRatingSection = new ChallengeRatingSection();
  TestCustomElements.initializeSection(challengeRatingSection);
  challengeRatingSection.connect();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    challengeRatingSection.showElements.section.click(); 
  });

  it('should switch to edit mode and focus on the challenge rating field', () => {
    expect(challengeRatingSection).toBeInMode('edit');
    expect(challengeRatingSection.editElements.challengeRating).toHaveFocus();
  });

  describe('and the challenge rating field is changed, and the edit section is submitted', () => {
    it('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      const expectedText = '8 (3900 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, 8);

      expect(challengeRatingSection.editElements.experiencePoints.value).toBe('3900');

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toHavePropertyLine(expectedHeading, expectedText);

      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);

    });
  });

  describe('and the experience points field is changed, and the edit section is submitted', () => {
    it('should save the fields', () => {
      const expectedText = '0 (234 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, 234);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toHavePropertyLine(expectedHeading, expectedText);

      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
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
      const expectedText = '3 (888 XP)';

      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, 3);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, 888);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toHavePropertyLine(expectedHeading, expectedText);

      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
    });
  });

  describe('and the experience points field is changed followed by the challenge rating field, and the edit section is submitted', () => {
    it('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      const expectedText = '20 (25000 XP)';
      
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, 1586);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, 20);

      expect(challengeRatingSection.editElements.experiencePoints.value).toBe('25000');

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection).toBeInMode('show');
      expect(challengeRatingSection).toHavePropertyLine(expectedHeading, expectedText);

      expect(challengeRatingSection).toExportPropertyLineToHtml(expectedHeading, expectedText);
    });
  });
});