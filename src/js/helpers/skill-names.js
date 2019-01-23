class SkillNames {
  constructor() {
    this.names = {
      'acrobatics' : { pretty_name : 'Acrobatics', ability_score : 'dexterity' },
      'animal-handling' : { pretty_name : 'Animal Handling', ability_score : 'wisdom' },
      'arcana' : { pretty_name : 'Arcana', ability_score : 'intelligence' },
      'athletics' : { pretty_name : 'Athletics', ability_score : 'strength' },
      'deception' : { pretty_name : 'Deception', ability_score : 'charisma' },
      'history' : { pretty_name : 'History', ability_score : 'intelligence' },
      'insight' : { pretty_name : 'Insight', ability_score : 'wisdom' },
      'intimidation' : { pretty_name: 'Intimidation', ability_score : 'charisma' },
      'investigation' : { pretty_name: 'Investigation', ability_score : 'intelligence' },
      'medicine' : { pretty_name: 'Medicine', ability_score : 'wisdom' },
      'nature' : { pretty_name: 'Nature', ability_score : 'intelligence' },
      'perception' : { pretty_name: 'Perception', ability_score : 'wisdom' },
      'performance' : { pretty_name: 'Performance', ability_score : 'charisma' },
      'persuasion' : { pretty_name: 'Persuasion', ability_score : 'charisma' },
      'religion' : { pretty_name: 'Religion', ability_score : 'intelligence' },
      'sleight-of-hand' : { pretty_name: 'Sleight of Hand', ability_score : 'dexterity' },
      'stealth' : { pretty_name: 'Stealth', ability_score : 'dexterity' },
      'survival': { pretty_name: 'Survival', ability_score : 'wisdom' }
    };
    Object.freeze(this.names);
  }

  getEntry(name) {
    return this.names[name];
  }

  forEach(callback) {
    Object.keys(this.names).forEach(callback);
  }

  forEachEntry(callback) {
    Object.entries(this.names).forEach(callback);
  }
}

export default new SkillNames();
