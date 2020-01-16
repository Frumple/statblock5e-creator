import Creature from './creature.js';

class CurrentContext {
  constructor() {
    this.creature = new Creature();
  }

  reset() {
    this.creature.reset();
  }
}

export default new CurrentContext();