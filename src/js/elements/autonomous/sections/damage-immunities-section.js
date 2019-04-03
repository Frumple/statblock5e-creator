import PropertyListSection from './property-list-section.js';
import DamageImmunities from '../../../models/lists/property/damage-immunities.js';

export default class DamageImmunitiesSection extends PropertyListSection {
  static get elementName() { return 'damage-immunities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-immunities-section',
      'src/html/elements/autonomous/sections/damage-immunities-section.html');
  }

  constructor() {
    super(DamageImmunitiesSection.templatePaths,
          DamageImmunities);

    this.empty = true;
  }
}
