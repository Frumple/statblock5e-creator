import ChallengeRatingSection from '/src/js/elements/autonomous/sections/challenge-rating-section.js';
import SectionTestMixin from '/src/js/helpers/test/section-test-mixin.js';

import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';
import defineCustomElements from '/src/js/helpers/test/define-custom-elements.js';
import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';

let challengeRatingSection;

beforeAll(async() => {
  await defineCustomElements();
  await ChallengeRatingSection.define();
});

beforeEach(() => {
  challengeRatingSection = new ChallengeRatingSection();
  copyObjectProperties(challengeRatingSection, SectionTestMixin);
  challengeRatingSection.initializeCustomElements();
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
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, 8);

      expect(challengeRatingSection.editElements.experiencePoints.value).toBe('3900');

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection.showElements.text).toHaveTextContent('8 (3900 XP)');
    });
  });

  describe('and the experience points field is changed, and the edit section is submitted', () => {
    it('should save the fields', () => {
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, 234);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection.showElements.text).toHaveTextContent('0 (234 XP)');
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
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, 3);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, 888);

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection.showElements.text).toHaveTextContent('3 (888 XP)');
    });
  });

  describe('and the experience points field is changed followed by the challenge rating field, and the edit section is submitted', () => {
    it('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, 1586);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, 20);

      expect(challengeRatingSection.editElements.experiencePoints.value).toBe('25000');

      challengeRatingSection.editElements.submitForm();

      expect(challengeRatingSection.showElements.text).toHaveTextContent('20 (25000 XP)');
    });
  });
});