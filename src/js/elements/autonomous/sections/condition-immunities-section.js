import { PropertyListSection } from './property-list-section.js';
import Conditions from '../../../data/conditions.js';

export default class ConditionImmunitiesSection extends PropertyListSection {
  static get elementName() { return 'condition-immunities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'condition-immunities-section',
      'src/html/elements/autonomous/sections/condition-immunities-section.html');
  }

  constructor() {
    super(ConditionImmunitiesSection.templatePaths,
          'conditionImmunities');

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.editElements.propertyList.setDataListOptions(Conditions.map(condition => ({ text: condition }) ));

      this.isInitialized = true;
    }
  }
}
