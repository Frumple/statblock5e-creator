import PropertyLineModel from './property-line-model.js';

import ExperiencePointsByChallengeRating from '../data/experience-points-by-challenge-rating.js';
import ProficiencyBonusByChallengeRating from '../data/proficiency-bonus-by-challenge-rating.js';

import { formatIntegerWithCommas } from '../helpers/number-helpers.js';

export default class ChallengeRating extends PropertyLineModel {
  constructor() {
    super('Challenge');

    this.reset();
  }

  reset() {
    this.challengeRating = '0';
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

  updateExperiencePointsAndProficiencyBonusFromChallengeRating() {
    this.experiencePoints = ExperiencePointsByChallengeRating[this.challengeRating];
    this.proficiencyBonus = ProficiencyBonusByChallengeRating[this.challengeRating];
  }

  get text() {
    const formattedExperiencePoints = formatIntegerWithCommas(this.experiencePoints);
    return `${this.challengeRating} (${formattedExperiencePoints} XP)`;
  }

  get htmlText() {
    return this.text;
  }

  toParserOptions() {
    return this.proficiencyBonus;
  }

  fromOpen5e(json) {
    this.reset();

    this.challengeRating = json['challenge_rating'];
    this.updateExperiencePointsAndProficiencyBonusFromChallengeRating();
  }
}