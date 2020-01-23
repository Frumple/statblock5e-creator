import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';
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
          'challengeRating',
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
    const challengeRatingModel = CurrentContext.creature.challengeRating;

    challengeRatingModel.challengeRating = this.editElements.challengeRating.valueAsFloat;
    challengeRatingModel.experiencePoints = this.editElements.experiencePoints.valueAsInt;
  }

  updateEditModeView() {
    const challengeRatingModel = CurrentContext.creature.challengeRating;

    this.editElements.challengeRating.value = challengeRatingModel.challengeRating;
    this.editElements.experiencePoints.value = challengeRatingModel.experiencePoints;
  }

  updateShowModeView() {
    this.showElements.text.textContent = CurrentContext.creature.challengeRating.text;
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
