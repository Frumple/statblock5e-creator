class Creature {
  constructor() {
    this.reset();
  }

  reset() {
    this.fullName = 'Commoner';
    this.shortName = '';
    this.isProperNoun = false;
  }

  grammaticize(name) {
    return (this.isProperNoun ? name : `the ${name.toLowerCase()}`);
  }

  get grammaticalFullName() {
    return this.grammaticize(this.fullName);
  }

  get grammaticalShortName() {
    return this.grammaticize(this.shortName);
  }

  get grammaticalName() {
    return (this.shortName !== '') ?
      this.grammaticalShortName :
      this.grammaticalFullName;      
  }

  get toParserOptions() {
    return {
      name: this.grammaticalName,
      fullName: this.grammaticalFullName
    };
  }
}

export default new Creature();