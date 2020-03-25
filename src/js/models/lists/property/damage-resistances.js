import PropertyListModel from './property-list-model.js';

export default class DamageResistances extends PropertyListModel {
  constructor() {
    super('Damage Resistances',
          'Damage Resistance',
          'damage_resistances');
  }
}