import Abilities from '/src/js/stats/abilities.js';
import ProficiencyBonus from '/src/js/stats/proficiency-bonus.js';

class SavingThrows {
  constructor() {
    this.savingThrows = {
      'strength' : new SavingThrow('strength'),
      'dexterity' : new SavingThrow('dexterity'),
      'constitution' : new SavingThrow('constitution'),
      'intelligence' : new SavingThrow('intelligence'),
      'wisdom' : new SavingThrow('wisdom'),
      'charisma' : new SavingThrow('charisma')
    };
  }

  reset() {
    for(const savingThrow of Object.values(this.savingThrows)) {
      savingThrow.reset();
    }
  }

  get keys() {
    return Object.keys(this.savingThrows);
  }

  get entries() {
    return Object.entries(this.savingThrows);
  }
}

class SavingThrow {
  constructor(abilityName) {
    this.abilityName = abilityName;
    this.reset();
  }

  reset() {
    this.isEnabled = false;
    this.isProficient = false;
    this.override = NaN;
  }

  calculateModifier(checkIfEnabled = true) {
    let savingThrowModifier = 0;

    if (! checkIfEnabled || this.isEnabled) {
      if (! isNaN(this.override)) {
        return this.override;
      }

      if (this.isProficient) {
        savingThrowModifier += ProficiencyBonus.proficiencyBonus;
      }
    }
    savingThrowModifier += Abilities.abilities[this.abilityName].modifier;

    return savingThrowModifier;
  }
}

export default new SavingThrows();