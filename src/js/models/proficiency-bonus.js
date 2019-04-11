class ProficiencyBonus {
  constructor() {
    this.reset();
  }

  reset() {
    this.proficiencyBonus = 2;
  }

  toParserOptions() {
    return this.proficiencyBonus;
  }
}

export default new ProficiencyBonus();