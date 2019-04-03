import PropertyListModel from './property-list-model.js';

class ConditionImmunities extends PropertyListModel {
  constructor() {
    super('Condition Immunities', 
          'Condition Immunity');
  }
}

export default new ConditionImmunities();