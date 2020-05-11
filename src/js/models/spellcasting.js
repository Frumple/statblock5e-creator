export default class Spellcasting {
  constructor() {
    this.reset();
  }

  reset() {
    this.spellcasterType = 'innate';
    this.spellcasterAbility = 'charisma';
    this.spellcasterLevel = 1;

    this.spellCategories = [];
    for (let i = 0; i < 10; i++) {
      this.spellCategories[i] = new SpellCategory();
    }
  }
}

class SpellCategory {
  constructor() {
    this.reset();
  }

  reset() {
    this.isEnabled = false;
    this.name = '';
    this.spells = [];
  }
}