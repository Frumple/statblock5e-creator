import PropertyListSection from './property-list-section.js';
import DamageResistances from '../../../models/lists/property/damage-resistances.js';

export default class DamageResistancesSection extends PropertyListSection {
  static get elementName() { return 'damage-resistances-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-resistances-section',
      'src/html/elements/autonomous/sections/damage-resistances-section.html');
  }

  constructor() {
    super(DamageResistancesSection.templatePaths,
          DamageResistances);

    this.empty = true;
  }
}
