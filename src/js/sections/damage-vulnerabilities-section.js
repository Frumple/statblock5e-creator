import AttributeListSection from '/src/js/sections/attribute-list-section.js';

export default class DamageVulnerabilitiesSection extends AttributeListSection {
  static get elementName() { return 'damage-vulnerabilities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-vulnerabilities-section',
      'src/html/sections/damage-vulnerabilities-section.html');
  }

  constructor() {
    super(DamageVulnerabilitiesSection.templatePaths,
          'Damage Vulnerabilities');

    this.mode = 'hidden';
    this.empty = true;
  }
}
