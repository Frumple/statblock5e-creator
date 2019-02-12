import ChallengeRatingSection from '/src/js/sections/challenge-rating-section.js';
import ErrorMessages from '/src/js/elements/error-messages.js';
jest.mock('/src/js/elements/error-messages.js');

import { inputValueAndTriggerEvent } from '/src/js/helpers/element-helpers.js';

let challengeRatingSection;

beforeAll(async() => {
  await ChallengeRatingSection.define();
});

beforeEach(() => {
  challengeRatingSection = new ChallengeRatingSection();
  challengeRatingSection.errorMessages = new ErrorMessages();
});

afterEach(() => {
  document.clear();
});

describe('when the show section is clicked', () => {
  beforeEach(() => {
    challengeRatingSection.showElements.section.click(); 
  });

  it('should switch to edit mode and focus on the challenge rating field', () => {
    expect(challengeRatingSection).toBeInMode('edit');
    expect(challengeRatingSection.editElements.challengeRating).toHaveFocus();
  });

  describe('and the challenge rating field is changed, and the save button is clicked', () => {
    it('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, 8);

      expect(challengeRatingSection.editElements.experiencePoints.value).toBe('3900');

      challengeRatingSection.editElements.saveAction.click();

      expect(challengeRatingSection.showElements.text).toHaveTextContent('8 (3900 XP)');
    });
  });

  describe('and the experience points field is changed, and the save button is clicked', () => {
    it('should save the fields', () => {
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, 234);

      challengeRatingSection.editElements.saveAction.click();

      expect(challengeRatingSection.showElements.text).toHaveTextContent('0 (234 XP)');
    });

    it('should display an error if the custom text field is not a valid number', () => {
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, '');

      challengeRatingSection.editElements.saveAction.click();

      expect(challengeRatingSection).toBeInMode('edit');
      expect(challengeRatingSection).toHaveSingleError(
        challengeRatingSection.editElements.experiencePoints,
        'Experience Points must be a valid number.');
    });
  });

  describe('and the challenge rating field is changed followed by the experience points field, and the save button is clicked', () => {
    it('should save the fields', () => {
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, 3);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, 888);

      challengeRatingSection.editElements.saveAction.click();

      expect(challengeRatingSection.showElements.text).toHaveTextContent('3 (888 XP)');
    });
  });

  describe('and the experience points field is changed followed by the challenge rating field, and the save button is clicked', () => {
    it('should automatically change the experience points to the corresponding amount, and save the fields', () => {
      inputValueAndTriggerEvent(challengeRatingSection.editElements.experiencePoints, 1586);
      inputValueAndTriggerEvent(challengeRatingSection.editElements.challengeRating, 20);

      expect(challengeRatingSection.editElements.experiencePoints.value).toBe('25000');

      challengeRatingSection.editElements.saveAction.click();

      expect(challengeRatingSection.showElements.text).toHaveTextContent('20 (25000 XP)');
    });
  });
});