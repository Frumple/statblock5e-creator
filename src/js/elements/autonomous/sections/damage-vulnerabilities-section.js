import { PropertyListSection } from './property-list-section.js';
import DamageTypesForPropertyLists from '../../../data/damage-types-for-property-lists.js';

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

      this.editElements.propertyList.setDataListOptions(DamageTypesForPropertyLists.map(damageType => ({ text: damageType }) ));

      this.isInitialized = true;
    }
  }
}
