import * as sectionModule from '/src/js/base/section.js';
import ExperiencePointsByChallengeRating from '/src/js/helpers/experience-points-by-challenge-rating.js';

export default class ChallengeRatingSection extends sectionModule.Section {
  static get elementName() { return 'challenge-rating-section'; }
  static get templatePath() { return 'src/html/sections/challenge-rating-section.html'; }

  constructor() {
    super(ChallengeRatingSection.elementName,
          ChallengeRatingShowElements,
          ChallengeRatingEditElements);

    this.editElements.challenge_rating.addEventListener('change', () => {
      let challengeRating = parseFloat(this.editElements.challenge_rating.value);
      let experiencePoints = ExperiencePointsByChallengeRating[challengeRating];
      this.editElements.experience_points.value = experiencePoints;
    });
  }

  checkForErrors() {
    this.editElements.experience_points.validate(this.error_messages);
  }

  update() {
    let challengeRatingElement = this.editElements.challenge_rating;

    let challengeRating = challengeRatingElement.options[challengeRatingElement.selectedIndex].text;
    let experiencePoints = this.editElements.experience_points.value;

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
    this.challenge_rating = shadowRoot.getElementById('challenge-rating-input');
    this.experience_points = shadowRoot.getElementById('experience-points-input');
  }
}
