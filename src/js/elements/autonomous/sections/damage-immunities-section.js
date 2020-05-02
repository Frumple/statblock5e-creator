import { PropertyListSection } from './property-list-section.js';
import DamageTypes from '../../../data/damage-types.js';

export default class DamageImmunitiesSection extends PropertyListSection {
  static get elementName() { return 'damage-immunities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'damage-immunities-section',
      'src/html/elements/autonomous/sections/damage-immunities-section.html');
  }

  constructor() {
    super(DamageImmunitiesSection.templatePaths,
          'damageImmunities');

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.editElements.propertyList.setDataList(DamageTypes);

      this.isInitialized = true;
    }
  }
}
