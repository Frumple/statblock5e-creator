import { capitalizeFirstLetter, formatModifier } from '../helpers/string-formatter.js';
import { createHtmlPropertyLine, createHomebreweryPropertyLine } from '../helpers/export-helpers.js';

export default class SavingThrows {
  constructor(abilitiesModel, proficiencyBonusModel) {
    this.headingName = 'Saving Throws';

    const entries = abilitiesModel.keys.map(
      key => [key, new SavingThrow(abilitiesModel.abilities[key], proficiencyBonusModel)]
    );
    this.savingThrows = Object.fromEntries(entries);
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

  get values() {
    return Object.values(this.savingThrows);
  }

  get entries() {
    return Object.entries(this.savingThrows);
  }

  get text() {
    return this.values
      .filter(savingThrow => savingThrow.isEnabled)
      .map(savingThrow => savingThrow.text)
      .join(', ');
  }

  toJson() {
    const transformedEntries = this.entries.map(([key, savingThrow]) => [key, savingThrow.toJson()]);
    return Object.fromEntries(transformedEntries);
  }

  toHtml() {
    return createHtmlPropertyLine(this.headingName, this.text);
  }

  toHomebrewery() {
    return createHomebreweryPropertyLine(this.headingName, this.text);
  }
}

class SavingThrow {
  constructor(ability, proficiencyBonusModel) {
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
    const abbreviation = capitalizeFirstLetter(this.ability.abbreviation);

    return `${abbreviation} ${this.formattedModifier}`;
  }

  get modifier() {
    let savingThrowModifier = 0;

    if (this.isEnabled) {
      if (this.override !== null) {
        return this.override;
      }

      if (this.isProficient) {
        savingThrowModifier += this.proficiencyBonusModel.proficiencyBonus;
      }
    }
    savingThrowModifier += this.ability.modifier;

    return savingThrowModifier;
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