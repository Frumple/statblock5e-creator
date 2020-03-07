import PropertyLineModel from './property-line-model.js';
import { formatModifier } from '../helpers/string-formatter.js';

export default class Skills extends PropertyLineModel {
  constructor(abilitiesModel, challengeRatingModel) {
    super('Skills');

    const strength = abilitiesModel.abilities['strength'];
    const dexterity = abilitiesModel.abilities['dexterity'];
    const intelligence = abilitiesModel.abilities['intelligence'];
    const wisdom = abilitiesModel.abilities['wisdom'];
    const charisma = abilitiesModel.abilities['charisma'];

    this.skills = {
      'acrobatics' : new Skill('Acrobatics', dexterity, challengeRatingModel),
      'animalHandling' : new Skill('Animal Handling', wisdom, challengeRatingModel),
      'arcana' : new Skill('Arcana', intelligence, challengeRatingModel),
      'athletics' : new Skill('Athletics', strength, challengeRatingModel),
      'deception' : new Skill('Deception', charisma, challengeRatingModel),
      'history' : new Skill('History', intelligence, challengeRatingModel),
      'insight' : new Skill('Insight', wisdom, challengeRatingModel),
      'intimidation' : new Skill('Intimidation', charisma, challengeRatingModel),
      'investigation' : new Skill('Investigation', intelligence, challengeRatingModel),
      'medicine' : new Skill('Medicine', wisdom, challengeRatingModel),
      'nature' : new Skill('Nature', intelligence, challengeRatingModel),
      'perception' : new Skill('Perception', wisdom, challengeRatingModel),
      'performance' : new Skill('Performance', charisma, challengeRatingModel),
      'persuasion' : new Skill('Persuasion', charisma, challengeRatingModel),
      'religion' : new Skill('Religion', intelligence, challengeRatingModel),
      'sleightOfHand' : new Skill('Sleight of Hand', dexterity, challengeRatingModel),
      'stealth' : new Skill('Stealth', dexterity, challengeRatingModel),
      'survival': new Skill('Survival', wisdom, challengeRatingModel)
    };
    Object.freeze(this.skills);
  }

  reset() {
    for(const skill of this.values) {
      skill.reset();
    }
  }

  get keys() {
    return Object.keys(this.skills);
  }

  get values() {
    return Object.values(this.skills);
  }

  get entries() {
    return Object.entries(this.skills);
  }

  get text() {
    return this.values
      .filter(skill => skill.isEnabled)
      .map(skill => skill.text)
      .join(', ');
  }

  get htmlText() {
    return this.text;
  }

  fromJson(json) {
    for (const [key, value] of this.entries) {
      value.fromJson(json[key]);
    }
  }

  toJson() {
    const transformedEntries = this.entries.map(([key, skill]) => [key, skill.toJson()]);
    return Object.fromEntries(transformedEntries);
  }
}

class Skill {
  constructor(prettyName, abilityModel, challengeRatingModel) {
    this.prettyName = prettyName;
    this.abilityModel = abilityModel;
    this.challengeRatingModel = challengeRatingModel;
    this.reset();
  }

  reset() {
    this.isEnabled = false;
    this.hasExpertise = false;
    this.override = null;
  }

  get text() {
    return `${this.prettyName} ${this.formattedModifier}`;
  }

  get passiveScore() {
    let passiveScore = 10 + this.abilityModel.modifier;

    if (this.isEnabled) {
      if (this.override !== null) {
        return passiveScore + this.override;
      }

      passiveScore += this.challengeRatingModel.proficiencyBonus;

      if (this.hasExpertise) {
        passiveScore += this.challengeRatingModel.proficiencyBonus;
      }
    }

    return passiveScore;
  }

  get modifier() {
    let skillModifier = this.abilityModel.modifier;

    if (this.isEnabled) {
      if (this.override !== null) {
        return this.override;
      }

      skillModifier += this.challengeRatingModel.proficiencyBonus;

      if (this.hasExpertise) {
        skillModifier += this.challengeRatingModel.proficiencyBonus;
      }
    }

    return skillModifier;
  }

  get formattedModifier() {
    return formatModifier(this.modifier);
  }

  fromJson(json) {
    this.isEnabled = json.isEnabled;
    this.hasExpertise = json.hasExpertise;
    this.override = json.override;
  }

  toJson() {
    return {
      isEnabled: this.isEnabled,
      hasExpertise: this.hasExpertise,
      override: this.override
    };
  }
}
