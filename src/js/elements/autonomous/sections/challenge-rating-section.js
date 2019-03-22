import * as propertyLineSectionModule from './property-line-section.js';
import ExperiencePointsByChallengeRating from '../../../helpers/experience-points-by-challenge-rating.js';

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
          ChallengeRatingEditElements,
          'Challenge');

    this.editElements.challengeRating.addEventListener('input', this.onInputChallengeRating.bind(this));
  }

  onInputChallengeRating() {
    const challengeRating = parseFloat(this.editElements.challengeRating.value);
    const experiencePoints = ExperiencePointsByChallengeRating[challengeRating];
    this.editElements.experiencePoints.value = experiencePoints;
  }

  checkForErrors() {
    this.editElements.experiencePoints.validate(this.errorMessages);
  }

  updateShowSection() {
    const challengeRatingElement = this.editElements.challengeRating;

    const challengeRating = challengeRatingElement.options[challengeRatingElement.selectedIndex].text;
    const experiencePoints = this.editElements.experiencePoints.value;

    const text = `${challengeRating} (${experiencePoints} XP)`;
    this.showElements.text.textContent = text;
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
