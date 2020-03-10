import PropertyListModel from './property-list-model.js';

export default class ConditionImmunities extends PropertyListModel {
  constructor() {
    super('Condition Immunities',
          'Condition Immunity',
          'condition_immunities');
  }
}