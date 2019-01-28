import * as sectionModule from '/src/js/base/section.js';
import ExperiencePointsByChallengeRating from '/src/js/helpers/experience-points-by-challenge-rating.js';

export default class ChallengeRatingSection extends sectionModule.Section {
  static get elementName() { return 'challenge-rating-section'; }
  static get templatePath() { return 'src/html/sections/challenge-rating-section.html'; }

  constructor() {
    super(ChallengeRatingSection.elementName,
          ChallengeRatingShowElements,
          ChallengeRatingEditElements);

    this.editElements.challengeRating.addEventListener('change', () => {
      let challengeRating = parseFloat(this.editElements.challengeRating.value);
      let experiencePoints = ExperiencePointsByChallengeRating[challengeRating];
      this.editElements.experiencePoints.value = experiencePoints;
    });
  }

  get initialSelectedEditElement() {
    return this.editElements.challengeRating;
  }

  checkForErrors() {
    this.editElements.experiencePoints.validate(this.errorMessages);
  }

  update() {
    let challengeRatingElement = this.editElements.challengeRating;

    let challengeRating = challengeRatingElement.options[challengeRatingElement.selectedIndex].text;
    let experiencePoints = this.editElements.experiencePoints.value;

    let text = `${challengeRating} (${experiencePoints} XP)`;
    this.showElements.text.textContent = text;
  }
}

class ChallengeRatingShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('challenge-rating-text');
  }
}

class ChallengeRatingEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.challengeRating = shadowRoot.getElementById('challenge-rating-input');
    this.experiencePoints = shadowRoot.getElementById('experience-points-input');
  }
}
