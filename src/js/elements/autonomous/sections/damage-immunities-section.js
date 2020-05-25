import { PropertyListSection } from './property-list-section.js';
import DamageTypesForPropertyLists from '../../../data/damage-types-for-property-lists.js';

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

      this.editElements.propertyList.setDataListOptions(DamageTypesForPropertyLists.map(damageType => ({ text: damageType }) ));

      this.isInitialized = true;
    }
  }
}
