import AttributeListSection from '/src/js/sections/attribute-list-section.js';

export default class DamageResistancesSection extends AttributeListSection {
  static get elementName() { return 'damage-resistances-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-resistances-section',
      'src/html/sections/damage-resistances-section.html');
  }

  constructor() {
    super(DamageResistancesSection.templatePaths,
          'Damage Resistances');

    this.mode = 'hidden';
    this.empty = true;
  }
}
