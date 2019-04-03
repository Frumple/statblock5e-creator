import { createPropertyLine } from '../helpers/export-helpers.js';

class ChallengeRating {
  constructor() {
    this.headingName = 'Challenge';

    this.reset();
  }

  reset() {
    this.challengeRating = 0;
    this.experiencePoints = 10;
  }

  get text() {
    return `${this.challengeRating} (${this.experiencePoints} XP)`;
  }

  toHtml() {
    return createPropertyLine(this.headingName, this.text);
  }
}

export default new ChallengeRating();