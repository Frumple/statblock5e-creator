import PropertyListSection from '/src/js/elements/autonomous/sections/property-list-section.js';

export default class DamageVulnerabilitiesSection extends PropertyListSection {
  static get elementName() { return 'damage-vulnerabilities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-vulnerabilities-section',
      'src/html/elements/autonomous/sections/damage-vulnerabilities-section.html');
  }

  constructor() {
    super(DamageVulnerabilitiesSection.templatePaths,
          'Damage Vulnerabilities',
          'Damage Vulnerability');

    this.empty = true;
  }
}
