import Abilities from './abilities.js';
import ProficiencyBonus from './proficiency-bonus.js';
import { capitalizeFirstLetter, formatModifier } from '../helpers/string-formatter.js';
import { createHtmlPropertyLine, createHomebreweryPropertyLine } from '../helpers/export-helpers.js';

class SavingThrows {
  constructor() {
    this.headingName = 'Saving Throws';

    this.savingThrows = {
      'strength' : new SavingThrow('strength'),
      'dexterity' : new SavingThrow('dexterity'),
      'constitution' : new SavingThrow('constitution'),
      'intelligence' : new SavingThrow('intelligence'),
      'wisdom' : new SavingThrow('wisdom'),
      'charisma' : new SavingThrow('charisma')
    };
    Object.freeze(this.savingThrows);
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

  get text() {
    const list = [];

    for (const key of Abilities.keys) {
      const savingThrow = this.savingThrows[key];
      const isEnabled = savingThrow.isEnabled;

      if (isEnabled) {
        list.push(savingThrow.text);
      }
    }

    return list.join(', ');
  }

  toHtml() {
    return createHtmlPropertyLine(this.headingName, this.text);
  }

  toHomebrewery() {
    return createHomebreweryPropertyLine(this.headingName, this.text);
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
    this.override = null;
  }

  get text() {
    const ability = Abilities.abilities[this.abilityName];
    const abbreviation = capitalizeFirstLetter(ability.abbreviation);

    return `${abbreviation} ${this.formattedModifier}`;
  }

  get modifier() {
    let savingThrowModifier = 0;

    if (this.isEnabled) {
      if (this.override !== null) {
        return this.override;
      }

      if (this.isProficient) {
        savingThrowModifier += ProficiencyBonus.proficiencyBonus;
      }
    }
    savingThrowModifier += Abilities.abilities[this.abilityName].modifier;

    return savingThrowModifier;
  }

  get formattedModifier() {
    return formatModifier(this.modifier);
  }
}

export default new SavingThrows();