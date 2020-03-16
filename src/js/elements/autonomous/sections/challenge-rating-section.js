import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';

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
    this.editElements.experiencePoints.addEventListener('input', this.onInputExperiencePoints.bind(this));
    this.editElements.proficiencyBonus.addEventListener('input', this.onInputProficiencyBonus.bind(this));
  }

  onInputChallengeRating() {
    this.updateModel();
    CurrentContext.creature.challengeRating.updateExperiencePointsAndProficiencyBonusFromChallengeRating();
    this.updateEditModeView();
  }

  onInputExperiencePoints() {
    this.updateModel();
  }

  onInputProficiencyBonus() {
    this.updateModel();
  }

  checkForErrors() {
    this.editElements.experiencePoints.validate(this.errorMessages);
    this.editElements.proficiencyBonus.validate(this.errorMessages);
  }

  updateModel() {
    const challengeRatingModel = CurrentContext.creature.challengeRating;

    const challengeRating = this.editElements.challengeRating.value;
    const experiencePoints = this.editElements.experiencePoints.valueAsInt;
    const proficiencyBonus = this.editElements.proficiencyBonus.valueAsInt;

    challengeRatingModel.challengeRating = challengeRating;

    if (experiencePoints !== null) {
      challengeRatingModel.experiencePoints = experiencePoints;
    }

    if (proficiencyBonus != null) {
      challengeRatingModel.proficiencyBonus = proficiencyBonus;
      this.dispatchProficiencyBonusChangedEvent();
    }
  }

  updateEditModeView() {
    const challengeRatingModel = CurrentContext.creature.challengeRating;

    this.editElements.challengeRating.value = challengeRatingModel.challengeRating;
    this.editElements.experiencePoints.value = challengeRatingModel.experiencePoints;
    this.editElements.proficiencyBonus.value = challengeRatingModel.proficiencyBonus;
  }

  updateShowModeView() {
    this.showElements.text.textContent = CurrentContext.creature.challengeRating.text;
  }

  dispatchProficiencyBonusChangedEvent() {
    const changeEvent = new CustomEvent('proficiencyBonusChanged', {
      bubbles: true,
      composed: true,
      detail: {}
    });
    this.dispatchEvent(changeEvent);
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
    this.proficiencyBonus = shadowRoot.getElementById('proficiency-bonus-input');
  }

  get initiallySelectedElement() {
    return this.challengeRating;
  }
}
