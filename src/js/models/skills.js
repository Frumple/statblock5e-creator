import Abilities from './abilities.js';
import ProficiencyBonus from './proficiency-bonus.js';
import { formatModifier } from '../helpers/string-formatter.js';
import { createHtmlPropertyLine, createHomebreweryPropertyLine } from '../helpers/export-helpers.js';

class Skills {
  constructor() {
    this.headingName = 'Skills';

    this.skills = {
      'acrobatics' : new Skill('Acrobatics', 'dexterity'),
      'animal-handling' : new Skill('Animal Handling', 'wisdom'),
      'arcana' : new Skill('Arcana', 'intelligence'),
      'athletics' : new Skill('Athletics', 'strength'),
      'deception' : new Skill('Deception', 'charisma'),
      'history' : new Skill('History', 'intelligence'),
      'insight' : new Skill('Insight', 'wisdom'),
      'intimidation' : new Skill('Intimidation', 'charisma'),
      'investigation' : new Skill('Investigation', 'intelligence'),
      'medicine' : new Skill('Medicine', 'wisdom'),
      'nature' : new Skill('Nature', 'intelligence'),
      'perception' : new Skill('Perception', 'wisdom'),
      'performance' : new Skill('Performance', 'charisma'),
      'persuasion' : new Skill('Persuasion', 'charisma'),
      'religion' : new Skill('Religion', 'intelligence'),
      'sleight-of-hand' : new Skill('Sleight of Hand', 'dexterity'),
      'stealth' : new Skill('Stealth', 'dexterity'),
      'survival': new Skill('Survival', 'wisdom')
    };
    Object.freeze(this.skills);
  }

  reset() {
    for(const skill of Object.values(this.skills)) {
      skill.reset();
    }
  }

  get keys() {
    return Object.keys(this.skills);
  }

  get entries() {
    return Object.entries(this.skills);
  }

  get text() {
    const list = [];

    for (const key of this.keys) {
      const skill = this.skills[key];
      const isEnabled = skill.isEnabled;

      if (isEnabled) {
        list.push(skill.text);
      }
    }

    return list.join(', ');
  }

  toJson() {
    const jsObject = {};

    for (const key of this.keys) {
      const skill = this.skills[key];
      jsObject[key] = skill.toJson();
    }

    return jsObject;
  }

  toHtml() {
    return createHtmlPropertyLine(this.headingName, this.text);
  }

  toHomebrewery() {
    return createHomebreweryPropertyLine(this.headingName, this.text);
  }
}

class Skill {
  constructor(prettyName, abilityName) {
    this.prettyName = prettyName;
    this.abilityName = abilityName;
    this.reset();
  }

  reset() {
    this.isEnabled = false;
    this.isProficient = false;
    this.override = null;
  }

  get ability() {
    return Abilities.abilities[this.abilityName];
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
        passiveScore += ProficiencyBonus.proficiencyBonus;
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
        skillModifier += ProficiencyBonus.proficiencyBonus;
      }
    }
    skillModifier += this.ability.modifier;

    return skillModifier;
  }

  get formattedModifier() {
    return formatModifier(this.modifier);
  }

  toJson() {
    return {
      isEnabled: this.isEnabled,
      isProficient: this.isProficient,
      override: this.override
    };
  }
}

export default new Skills();
