import PropertyListModel from './property-list-model.js';

class DamageImmunities extends PropertyListModel {
  constructor() {
    super('Damage Immunities', 
          'Damage Immunity');
  }
}

export default new DamageImmunities();