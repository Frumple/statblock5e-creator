import Model from './model.js';
import { formatModifier } from '../helpers/string-formatter.js';

export default class Abilities extends Model {
  constructor() {
    super();

    this.abilities = {
      'strength' : new Ability('str'),
      'dexterity' : new Ability('dex'),
      'constitution' : new Ability('con'),
      'intelligence' : new Ability('int'),
      'wisdom' : new Ability('wis'),
      'charisma' : new Ability('cha'),
    };
    Object.freeze(this.abilities);

    this.reset();
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
    return Object.values(this.abilities);
  }

  get entries() {
    return Object.entries(this.abilities);
  }

  toParserOptions() {
    const transformedEntries = this.entries.map(([key, ability]) => [key, ability.toParserOptions()]);
    return Object.fromEntries(transformedEntries);
  }

  fromJson(json) {
    for (const [key, value] of this.entries) {
      value.fromJson(json[key]);
    }
  }

  toJson() {
    const transformedEntries = this.entries.map(([key, ability]) => [key, ability.toJson()]);
    return Object.fromEntries(transformedEntries);
  }

  toHtml() {
    const abilitiesBlock = document.createElement('abilities-block');
    for (const ability of this.values) {
      const abbreviation = ability.abbreviation;
      abilitiesBlock.dataset[abbreviation] = ability.score;
    }

    return abilitiesBlock;
  }

  toHomebrewery() {
    const abilityStrings = this.values.map(ability => `${ability.score} ${ability.formattedModifier}`);
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

  fromJson(score) {
    this.score = score;
  }


  toJson() {
    return this.score;
  }
}
