class Creature {
  constructor() {
    this.reset();
  }

  reset() {
    this.name = 'Commoner';
    this.shortName = '';
    this.isProperNoun = false;
  }

  get grammaticalName() {
    let name = (this.shortName !== '') ? 
      this.shortName :
      this.name;
    
    if (! this.isProperNoun) {
      name = `The ${name.toLowerCase()}`;
    }

    return name;
  }
}

export default new Creature();