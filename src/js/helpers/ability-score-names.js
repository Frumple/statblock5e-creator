class AbilityScoreNames {
  constructor () {
    this.names = {
      STRENGTH : { name : 'strength', abbreviation : 'str' },
      DEXTERITY : { name : 'dexterity', abbreviation: 'dex' },
      CONSTITUTION : { name : 'constitution', abbreviation: 'con' },
      INTELLIGENCE : { name : 'intelligence', abbreviation: 'int' },
      WISDOM : { name : 'wisdom', abbreviation: 'wis' },
      CHARISMA : { name : 'charisma', abbreviation: 'cha' },
    };
    Object.freeze(this.names);
  }

  forEachKey(callback) {
    Object.keys(this.names).forEach(callback);
  }

  forEachEntry(callback) {
    Object.entries(this.names).forEach(callback);
  }
}

export default new AbilityScoreNames();
