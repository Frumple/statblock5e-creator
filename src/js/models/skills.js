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
      'acrobatics' : new Skill('acrobatics', 'Acrobatics', dexterity, challengeRatingModel),
      'animalHandling' : new Skill('animalHandling', 'Animal Handling', wisdom, challengeRatingModel),
      'arcana' : new Skill('arcana', 'Arcana', intelligence, challengeRatingModel),
      'athletics' : new Skill('athletics', 'Athletics', strength, challengeRatingModel),
      'deception' : new Skill('deception', 'Deception', charisma, challengeRatingModel),
      'history' : new Skill('history', 'History', intelligence, challengeRatingModel),
      'insight' : new Skill('insight', 'Insight', wisdom, challengeRatingModel),
      'intimidation' : new Skill('intimidation', 'Intimidation', charisma, challengeRatingModel),
      'investigation' : new Skill('investigation', 'Investigation', intelligence, challengeRatingModel),
      'medicine' : new Skill('medicine', 'Medicine', wisdom, challengeRatingModel),
      'nature' : new Skill('nature', 'Nature', intelligence, challengeRatingModel),
      'perception' : new Skill('perception', 'Perception', wisdom, challengeRatingModel),
      'performance' : new Skill('performance', 'Performance', charisma, challengeRatingModel),
      'persuasion' : new Skill('persuasion', 'Persuasion', charisma, challengeRatingModel),
      'religion' : new Skill('religion', 'Religion', intelligence, challengeRatingModel),
      'sleightOfHand' : new Skill('sleightOfHand', 'Sleight of Hand', dexterity, challengeRatingModel),
      'stealth' : new Skill('stealth', 'Stealth', dexterity, challengeRatingModel),
      'survival': new Skill('survival', 'Survival', wisdom, challengeRatingModel)
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

  fromOpen5e(json) {
    this.reset();

    for (const value of this.values) {
      value.fromOpen5e(json);
    }
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
  constructor(name, prettyName, abilityModel, challengeRatingModel) {
    this.name = name;
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

  fromOpen5e(json) {
    // TODO: Determine what the Open5e skill keys are for Animal Handling and Sleight of Hand, and use those keys instead.
    if (this.name in json.skills) {
      this.isEnabled = true;

      const skillValue = json.skills[this.name];
      const proficientValue = this.abilityModel.modifier + this.challengeRatingModel.proficiencyBonus;
      const expertiseValue = proficientValue + this.challengeRatingModel.proficiencyBonus;

      // The Open5e skill should match either:
      // Proficient value: Ability modifier + proficiency bonus
      // Expertise value:  Ability modifier + (2 * proficiency bonus)
      // If it doesn't match either, set the value as an override.
      if (skillValue === proficientValue) {
        return;
      } else if (skillValue === expertiseValue) {
        this.hasExpertise = true;
      } else {
        this.override = skillValue;
      }
    } else {
      this.isEnabled = false;
    }
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
