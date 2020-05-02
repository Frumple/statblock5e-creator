import { PropertyListSection } from './property-list-section.js';
import DamageTypes from '../../../data/damage-types.js';

export default class DamageVulnerabilitiesSection extends PropertyListSection {
  static get elementName() { return 'damage-vulnerabilities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-vulnerabilities-section',
      'src/html/elements/autonomous/sections/damage-vulnerabilities-section.html');
  }

  constructor() {
    super(DamageVulnerabilitiesSection.templatePaths,
          'damageVulnerabilities');

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.editElements.propertyList.setDataList(DamageTypes);

      this.isInitialized = true;
    }
  }
}
