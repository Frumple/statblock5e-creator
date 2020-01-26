import PropertyLineModel from './property-line-model.js';
import { formatModifier } from '../helpers/string-formatter.js';

export default class Skills extends PropertyLineModel {
  constructor(abilitiesModel, proficiencyBonusModel) {
    super('Skills');

    const strength = abilitiesModel.abilities['strength'];
    const dexterity = abilitiesModel.abilities['dexterity'];
    const intelligence = abilitiesModel.abilities['intelligence'];
    const wisdom = abilitiesModel.abilities['wisdom'];
    const charisma = abilitiesModel.abilities['charisma'];

    this.skills = {
      'acrobatics' : new Skill('Acrobatics', dexterity, proficiencyBonusModel),
      'animal-handling' : new Skill('Animal Handling', wisdom, proficiencyBonusModel),
      'arcana' : new Skill('Arcana', intelligence, proficiencyBonusModel),
      'athletics' : new Skill('Athletics', strength, proficiencyBonusModel),
      'deception' : new Skill('Deception', charisma, proficiencyBonusModel),
      'history' : new Skill('History', intelligence, proficiencyBonusModel),
      'insight' : new Skill('Insight', wisdom, proficiencyBonusModel),
      'intimidation' : new Skill('Intimidation', charisma, proficiencyBonusModel),
      'investigation' : new Skill('Investigation', intelligence, proficiencyBonusModel),
      'medicine' : new Skill('Medicine', wisdom, proficiencyBonusModel),
      'nature' : new Skill('Nature', intelligence, proficiencyBonusModel),
      'perception' : new Skill('Perception', wisdom, proficiencyBonusModel),
      'performance' : new Skill('Performance', charisma, proficiencyBonusModel),
      'persuasion' : new Skill('Persuasion', charisma, proficiencyBonusModel),
      'religion' : new Skill('Religion', intelligence, proficiencyBonusModel),
      'sleight-of-hand' : new Skill('Sleight of Hand', dexterity, proficiencyBonusModel),
      'stealth' : new Skill('Stealth', dexterity, proficiencyBonusModel),
      'survival': new Skill('Survival', wisdom, proficiencyBonusModel)
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
  constructor(prettyName, ability, proficiencyBonusModel) {
    this.prettyName = prettyName;
    this.ability = ability;
    this.proficiencyBonusModel = proficiencyBonusModel;
    this.reset();
  }

  reset() {
    this.isEnabled = false;
    this.isProficient = false;
    this.override = null;
  }

  get text() {
    return `${this.prettyName} ${this.formattedModifier}`;
  }

  get passiveScore() {
    let passiveScore = 10;

    if (this.isEnabled) {
      if (this.override !== null) {
        return passiveScore + this.override;
      }

      if (this.isProficient) {
        passiveScore += this.proficiencyBonusModel.proficiencyBonus;
      }
    }
    passiveScore += this.ability.modifier;

    return passiveScore;
  }

  get modifier() {
    let skillModifier = 0;

    if (this.isEnabled) {
      if (this.override !== null) {
        return this.override;
      }

      if (this.isProficient) {
        skillModifier += this.proficiencyBonusModel.proficiencyBonus;
      }
    }
    skillModifier += this.ability.modifier;

    return skillModifier;
  }

  get formattedModifier() {
    return formatModifier(this.modifier);
  }

  fromJson(json) {
    this.isEnabled = json.isEnabled;
    this.isProficient = json.isProficient;
    this.override = json.override;
  }

  toJson() {
    return {
      isEnabled: this.isEnabled,
      isProficient: this.isProficient,
      override: this.override
    };
  }
}
