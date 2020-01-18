import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';
import ExperiencePointsByChallengeRating from '../../../data/experience-points-by-challenge-rating.js';

const challengeRating = CurrentContext.creature.challengeRating;

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
    challengeRating.challengeRating = this.editElements.challengeRating.valueAsFloat;
    challengeRating.experiencePoints = this.editElements.experiencePoints.valueAsInt;
  }

  updateEditModeView() {
    this.editElements.challengeRating.value = challengeRating.challengeRating;
    this.editElements.experiencePoints.value = challengeRating.experiencePoints;
  }

  updateShowModeView() {
    this.showElements.text.textContent = challengeRating.text;
  }

  exportToJson() {
    return challengeRating.toJson();
  }

  exportToHtml() {
    return challengeRating.toHtml();
  }

  exportToHomebrewery() {
    return challengeRating.toHomebrewery();
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
