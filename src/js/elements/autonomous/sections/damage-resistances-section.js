import PropertyListSection from './property-list-section.js';

export default class DamageResistancesSection extends PropertyListSection {
  static get elementName() { return 'damage-resistances-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-resistances-section',
      'src/html/elements/autonomous/sections/damage-resistances-section.html');
  }

  constructor() {
    super(DamageResistancesSection.templatePaths,
          'damageResistances');

    this.empty = true;
  }
}
