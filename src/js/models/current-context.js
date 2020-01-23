import Creature from './creature.js';
import LayoutSettings from './layout-settings.js';

class CurrentContext {
  constructor() {
    this.creature = new Creature();
    this.layoutSettings = new LayoutSettings();
  }

  reset() {
    this.creature.reset();
    this.layoutSettings.reset();
  }
}

export default new CurrentContext();