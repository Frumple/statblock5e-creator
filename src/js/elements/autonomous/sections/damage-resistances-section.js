import AttributeListSection from '/src/js/elements/autonomous/sections/attribute-list-section.js';

export default class DamageResistancesSection extends AttributeListSection {
  static get elementName() { return 'damage-resistances-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-resistances-section',
      'src/html/elements/autonomous/sections/damage-resistances-section.html');
  }

  constructor() {
    super(DamageResistancesSection.templatePaths,
          'Damage Resistances');

    this.empty = true;
  }
}
