import * as propertyLineSectionModule from './property-line-section.js';
import ChallengeRating from '../../../models/challenge-rating.js';
import ExperiencePointsByChallengeRating from '../../../data/experience-points-by-challenge-rating.js';

export default class ChallengeRatingSection extends propertyLineSectionModule.PropertyLineSection {
  static get elementName() { return 'challenge-rating-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'challenge-rating-section',
      'src/html/elements/autonomous/sections/challenge-rating-section.html');
  }

  constructor() {
    super(ChallengeRatingSection.templatePaths,
          ChallengeRatingShowElements,
          ChallengeRatingEditElements);

    this.editElements.challengeRating.addEventListener('input', this.onInputChallengeRating.bind(this));
  }

  onInputChallengeRating() {
    const challengeRating = this.editElements.challengeRating.valueAsFloat;
    const experiencePoints = ExperiencePointsByChallengeRating[challengeRating];
    this.editElements.experiencePoints.value = experiencePoints;
  }

  checkForErrors() {
    this.editElements.experiencePoints.validate(this.errorMessages);
  }

  updateModel() {
    const challengeRatingElement = this.editElements.challengeRating;
    ChallengeRating.challengeRating = challengeRatingElement.valueAsFloat;
    ChallengeRating.experiencePoints = this.editElements.experiencePoints.valueAsInt;
  }

  updateView() {
    this.showElements.text.textContent = ChallengeRating.text;
  }

  exportToJson() {
    return ChallengeRating.toJson();
  }

  exportToHtml() {
    return ChallengeRating.toHtml();
  }

  exportToHomebrewery() {
    return ChallengeRating.toHomebrewery();
  }
}

class ChallengeRatingShowElements extends propertyLineSectionModule.PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class ChallengeRatingEditElements extends propertyLineSectionModule.PropertyLineEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.challengeRating = shadowRoot.getElementById('challenge-rating-input');
    this.experiencePoints = shadowRoot.getElementById('experience-points-input');
  }

  get initiallySelectedElement() {
    return this.challengeRating;
  }
}
