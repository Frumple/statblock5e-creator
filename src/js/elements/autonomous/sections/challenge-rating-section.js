import { PropertyLineSection, PropertyLineShowElements, PropertyLineEditElements } from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class ChallengeRatingSection extends PropertyLineSection {
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
    const challengeRating = this.editElements.challengeRating.value;
    CurrentContext.creature.challengeRating.challengeRating = challengeRating;

    CurrentContext.creature.challengeRating.updateExperiencePointsAndProficiencyBonusFromChallengeRating();
    this.updateEditModeView();
    this.dispatchProficiencyBonusChangedEvent();
  }

  onInputExperiencePoints() {
    const experiencePoints = this.editElements.experiencePoints.valueAsInt;
    if (experiencePoints !== null) {
      CurrentContext.creature.challengeRating.experiencePoints = experiencePoints;
    }
  }

  onInputProficiencyBonus() {
    const proficiencyBonus = this.editElements.proficiencyBonus.valueAsInt;
    if (proficiencyBonus !== null) {
      CurrentContext.creature.challengeRating.proficiencyBonus = proficiencyBonus;
      this.dispatchProficiencyBonusChangedEvent();
    }
  }

  checkForErrors() {
    this.editElements.experiencePoints.validate(this.errorMessages);
    this.editElements.proficiencyBonus.validate(this.errorMessages);
  }

  updateModel() {
    // Intentionally empty: models are updated in onInput callbacks
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

class ChallengeRatingShowElements extends PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class ChallengeRatingEditElements extends PropertyLineEditElements {
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
