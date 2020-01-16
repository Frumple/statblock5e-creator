import PropertyListSection from './property-list-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class DamageVulnerabilitiesSection extends PropertyListSection {
  static get elementName() { return 'damage-vulnerabilities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-vulnerabilities-section',
      'src/html/elements/autonomous/sections/damage-vulnerabilities-section.html');
  }

  constructor() {
    super(DamageVulnerabilitiesSection.templatePaths,
          CurrentContext.creature.damageVulnerabilities);

    this.empty = true;
  }
}
