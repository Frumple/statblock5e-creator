import { createHtmlPropertyLine, createHomebreweryPropertyLine } from '../helpers/export-helpers.js';

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
    return createHtmlPropertyLine(this.headingName, this.text);
  }

  toHomebrewery() {
    return createHomebreweryPropertyLine(this.headingName, this.text);
  }
}

export default new ChallengeRating();