class AbilityScoreNames {
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

  forEachName(callback) {
    Object.keys(this.names).forEach(callback);
  }

  forEachEntry(callback) {
    Object.entries(this.names).forEach(callback);
  }
}

export default new AbilityScoreNames();
