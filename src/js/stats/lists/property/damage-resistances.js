import PropertyListModel from './property-list-model.js';

class DamageResistances extends PropertyListModel {
  constructor() {
    super('Damage Resistances', 
          'Damage Resistance');
  }
}

export default new DamageResistances();