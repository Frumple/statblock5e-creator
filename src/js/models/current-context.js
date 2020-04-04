import Creature from './creature.js';
import LayoutSettings from './settings/layout-settings.js';
import LocalSettings from './settings/local-settings.js';

class CurrentContext {
  constructor() {
    this.version = '0.0.0';

    this.creature = new Creature();
    this.layoutSettings = new LayoutSettings();
    this.localSettings = new LocalSettings();
  }

  reset() {
    this.creature.reset();
    this.layoutSettings.reset();
  }
}

export default new CurrentContext();