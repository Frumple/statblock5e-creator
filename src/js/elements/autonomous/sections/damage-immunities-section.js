import AttributeListSection from '/src/js/elements/autonomous/sections/attribute-list-section.js';

export default class DamageImmunitiesSection extends AttributeListSection {
  static get elementName() { return 'damage-immunities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-immunities-section',
      'src/html/elements/autonomous/sections/damage-immunities-section.html');
  }

  constructor() {
    super(DamageImmunitiesSection.templatePaths,
          'Damage Immunities');

    this.empty = true;
  }
}
