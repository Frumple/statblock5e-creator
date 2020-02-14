import PropertyLineModel from './property-line-model.js';
import { capitalizeFirstLetter, formatModifier } from '../helpers/string-formatter.js';

export default class SavingThrows extends PropertyLineModel {
  constructor(abilitiesModel, challengeRatingModel) {
    super('Saving Throws');

    const entries = abilitiesModel.keys.map(
      key => [key, new SavingThrow(abilitiesModel.abilities[key], challengeRatingModel)]
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

  get htmlText() {
    return this.text;
  }

  fromJson(json) {
    for (const [key, value] of this.entries) {
      value.fromJson(json[key]);
    }
  }

  toJson() {
    const transformedEntries = this.entries.map(([key, savingThrow]) => [key, savingThrow.toJson()]);
    return Object.fromEntries(transformedEntries);
  }
}

class SavingThrow {
  constructor(ability, challengeRatingModel) {
    this.ability = ability;
    this.challengeRatingModel = challengeRatingModel;
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
        savingThrowModifier += this.challengeRatingModel.proficiencyBonus;
      }
    }
    savingThrowModifier += this.ability.modifier;

    return savingThrowModifier;
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