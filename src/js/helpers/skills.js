class Skills {
  constructor() {
    this.skills = {
      'acrobatics' : { prettyName : 'Acrobatics', ability : 'dexterity' },
      'animal-handling' : { prettyName : 'Animal Handling', ability : 'wisdom' },
      'arcana' : { prettyName : 'Arcana', ability : 'intelligence' },
      'athletics' : { prettyName : 'Athletics', ability : 'strength' },
      'deception' : { prettyName : 'Deception', ability : 'charisma' },
      'history' : { prettyName : 'History', ability : 'intelligence' },
      'insight' : { prettyName : 'Insight', ability : 'wisdom' },
      'intimidation' : { prettyName: 'Intimidation', ability : 'charisma' },
      'investigation' : { prettyName: 'Investigation', ability : 'intelligence' },
      'medicine' : { prettyName: 'Medicine', ability : 'wisdom' },
      'nature' : { prettyName: 'Nature', ability : 'intelligence' },
      'perception' : { prettyName: 'Perception', ability : 'wisdom' },
      'performance' : { prettyName: 'Performance', ability : 'charisma' },
      'persuasion' : { prettyName: 'Persuasion', ability : 'charisma' },
      'religion' : { prettyName: 'Religion', ability : 'intelligence' },
      'sleight-of-hand' : { prettyName: 'Sleight of Hand', ability : 'dexterity' },
      'stealth' : { prettyName: 'Stealth', ability : 'dexterity' },
      'survival': { prettyName: 'Survival', ability : 'wisdom' }
    };
    Object.freeze(this.skills);
  }

  get keys() {
    return Object.keys(this.skills);
  }

  get entries() {
    return Object.entries(this.skills);
  }
}

export default new Skills();
