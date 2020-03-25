import PropertyListModel from './property-list-model.js';

export default class DamageImmunities extends PropertyListModel {
  constructor() {
    super('Damage Immunities',
          'Damage Immunity',
          'damage_immunities');
  }
}