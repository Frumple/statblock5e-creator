import PropertyListSection from './property-list-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class DamageResistancesSection extends PropertyListSection {
  static get elementName() { return 'damage-resistances-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-resistances-section',
      'src/html/elements/autonomous/sections/damage-resistances-section.html');
  }

  constructor() {
    super(DamageResistancesSection.templatePaths,
          CurrentContext.creature.damageResistances);

    this.empty = true;
  }
}
