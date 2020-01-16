import PropertyListSection from './property-list-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class DamageImmunitiesSection extends PropertyListSection {
  static get elementName() { return 'damage-immunities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-immunities-section',
      'src/html/elements/autonomous/sections/damage-immunities-section.html');
  }

  constructor() {
    super(DamageImmunitiesSection.templatePaths,
          CurrentContext.creature.damageImmunities);

    this.empty = true;
  }
}
