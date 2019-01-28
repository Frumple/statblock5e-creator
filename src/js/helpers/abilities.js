class Abilities {
  constructor () {
    this.names = {
      'strength' : { abbreviation : 'str' },
      'dexterity' : { abbreviation: 'dex' },
      'constitution' : { abbreviation: 'con' },
      'intelligence' : { abbreviation: 'int' },
      'wisdom' : { abbreviation: 'wis' },
      'charisma' : { abbreviation: 'cha' },
    };
    Object.freeze(this.names);
  }

  get keys() {
    return Object.keys(this.names);
  }

  get entries() {
    return Object.entries(this.names);
  }
}

export default new Abilities();
