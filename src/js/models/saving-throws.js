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
    const transformedEntries = this.entries.map(([key, savingThrow]) => [key, savingThrow.toJson()]);
    return Object.fromEntries(transformedEntries);
  }
}

class SavingThrow {
  constructor(abilityModel, challengeRatingModel) {
    this.abilityModel = abilityModel;
    this.challengeRatingModel = challengeRatingModel;
    this.reset();
  }

  reset() {
    this.isEnabled = false;
    this.override = null;
  }

  get text() {
    const abbreviation = capitalizeFirstLetter(this.abilityModel.abbreviation);

    return `${abbreviation} ${this.formattedModifier}`;
  }

  get modifier() {
    let savingThrowModifier = this.abilityModel.modifier;

    if (this.isEnabled) {
      if (this.override !== null) {
        return this.override;
      }

      savingThrowModifier += this.challengeRatingModel.proficiencyBonus;
    }

    return savingThrowModifier;
  }

  get formattedModifier() {
    return formatModifier(this.modifier);
  }

  fromOpen5e(json) {
    const key = `${this.abilityModel.name}_save`;

    if (json[key] !== null) {
      this.isEnabled = true;

      // The Open5e saving throw value should match the calculated ability modifier + proficiency bonus.
      // If it doesn't, set the value as an override.
      if (json[key] !== this.abilityModel.modifier + this.challengeRatingModel.proficiencyBonus) {
        this.override = json[key];
      }
    } else {
      this.isEnabled = false;
    }
  }

  fromJson(json) {
    this.isEnabled = json.isEnabled;
    this.override = json.override;
  }

  toJson() {
    return {
      isEnabled: this.isEnabled,
      override: this.override
    };
  }
}