import PropertyListModel from './property-list-model.js';

class DamageVulnerabilities extends PropertyListModel {
  constructor() {
    super('Damage Vulnerabilities', 
          'Damage Vulnerability');
  }
}

export default new DamageVulnerabilities();