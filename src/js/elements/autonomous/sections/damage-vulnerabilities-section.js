import PropertyListSection from './property-list-section.js';
import DamageVulnerabilities from '../../../models/lists/property/damage-vulnerabilities.js';

export default class DamageVulnerabilitiesSection extends PropertyListSection {
  static get elementName() { return 'damage-vulnerabilities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-vulnerabilities-section',
      'src/html/elements/autonomous/sections/damage-vulnerabilities-section.html');
  }

  constructor() {
    super(DamageVulnerabilitiesSection.templatePaths,
          DamageVulnerabilities);

    this.empty = true;
  }
}
