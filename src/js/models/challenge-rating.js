import PropertyLineModel from './property-line-model.js';

export default class ChallengeRating extends PropertyLineModel {
  constructor() {
    super('Challenge');

    this.reset();
  }

  reset() {
    this.challengeRating = 0;
    this.experiencePoints = 10;
  }

  get jsonPropertyNames() {
    return [
      'challengeRating',
      'experiencePoints'
    ];
  }

  get text() {
    return `${this.challengeRating} (${this.experiencePoints} XP)`;
  }

  get htmlText() {
    return this.text;
  }
}