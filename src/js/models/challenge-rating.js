import PropertyLineModel from './property-line-model.js';

export default class ChallengeRating extends PropertyLineModel {
  constructor() {
    super('Challenge');

    this.reset();
  }

  reset() {
    this.challengeRating = 0;
    this.experiencePoints = 10;
    this.proficiencyBonus = 2;
  }

  get jsonPropertyNames() {
    return [
      'challengeRating',
      'experiencePoints',
      'proficiencyBonus'
    ];
  }

  get challengeRatingAsFraction() {
    switch(this.challengeRating) {
    case 0.125: return '1/8';
    case 0.25: return '1/4';
    case 0.5: return '1/2';
    default: return this.challengeRating;
    }
  }

  get text() {
    return `${this.challengeRatingAsFraction} (${this.experiencePoints} XP)`;
  }

  get htmlText() {
    return this.text;
  }

  toParserOptions() {
    return this.proficiencyBonus;
  }
}