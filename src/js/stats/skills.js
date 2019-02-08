import Abilities from '/src/js/stats/abilities.js';
import ProficiencyBonus from '/src/js/stats/proficiency-bonus.js';

class Skills {
  constructor() {
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
}

class Skill {
  constructor(prettyName, abilityName) {
    this.prettyName = prettyName;
    this.abilityName = abilityName;
    this.reset();
  }

  reset() {
    this.isEnabled = false;
    this.isProficient = true;
    this.override = NaN;
  }

  get ability() {
    return Abilities.abilities[this.abilityName];
  }

  get passiveScore() {
    let passiveScore = 10;

    if (this.isEnabled) {
      if (! isNaN(this.override)) {
        return passiveScore + this.override;
      } 
      
      if (this.isProficient) {
        passiveScore += ProficiencyBonus.value;
      }
    }
    passiveScore += this.ability.modifier;

    return passiveScore;
  }

  calculateModifier(checkIfEnabled = true) {
    let skillModifier = 0;

    if (! checkIfEnabled || this.isEnabled) {
      if (! isNaN(this.override)) {
        return this.override;
      }
      
      if (this.isProficient) {
        skillModifier += ProficiencyBonus.value;
      }
    }
    skillModifier += this.ability.modifier;
    
    return skillModifier;
  }
}

export default new Skills();
