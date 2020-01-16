import { formatModifier } from '../helpers/string-formatter.js';

export default class Abilities {
  constructor() {
    this.abilities = {
      'strength' : new Ability('str'),
      'dexterity' : new Ability('dex'),
      'constitution' : new Ability('con'),
      'intelligence' : new Ability('int'),
      'wisdom' : new Ability('wis'),
      'charisma' : new Ability('cha'),
    };
    Object.freeze(this.abilities);
  }

  reset() {
    for(const ability of Object.values(this.abilities)) {
      ability.reset();
    }
  }

  get keys() {
    return Object.keys(this.abilities);
  }

  get values() {
    return Object.values(this.savingThrows);
  }

  get entries() {
    return Object.entries(this.abilities);
  }

  get orderedKeys() {
    return [
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma'
    ];
  }

  toParserOptions() {
    const transformedEntries = this.entries.map(([key, ability]) => [key, ability.toParserOptions()]);
    return Object.fromEntries(transformedEntries);
  }

  toJson() {
    const transformedEntries = this.entries.map(([key, ability]) => [key, ability.score]);
    return Object.fromEntries(transformedEntries);
  }

  toHtml() {
    const abilitiesBlock = document.createElement('abilities-block');
    for (const [key, value] of this.entries) {
      const abbreviation = value.abbreviation;
      abilitiesBlock.dataset[abbreviation] = this.abilities[key].score;
    }

    return abilitiesBlock;
  }

  toHomebrewery() {
    const abilityStrings = this.orderedKeys.map(key => `${this.abilities[key].score} ${this.abilities[key].formattedModifier}`);
    const abilityLine = abilityStrings.join('|');

    const text =
`>|STR|DEX|CON|INT|WIS|CHA|
>|:---:|:---:|:---:|:---:|:---:|:---:|
>|${abilityLine}|`;

    return text;
  }
}

class Ability {
  constructor(abbreviation) {
    this.abbreviation = abbreviation;
    this.reset();
  }

  reset() {
    this.score = 10;
  }

  get modifier() {
    return Math.floor((this.score - 10) / 2);
  }

  get formattedModifier() {
    return `(${formatModifier(this.modifier)})`;
  }

  toParserOptions() {
    return {
      modifier: this.modifier
    };
  }
}
