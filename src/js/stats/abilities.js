import { formatModifier } from '../helpers/string-formatter.js';

class Abilities {
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

  get entries() {
    return Object.entries(this.abilities);
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
}

export default new Abilities();
