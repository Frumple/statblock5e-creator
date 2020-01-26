export default class ProficiencyBonus {
  constructor() {
    this.reset();
  }

  reset() {
    this.proficiencyBonus = 2;
  }

  toParserOptions() {
    return this.proficiencyBonus;
  }

  fromJson(proficiencyBonus) {
    this.proficiencyBonus = proficiencyBonus;
  }

  toJson() {
    return this.proficiencyBonus;
  }
}