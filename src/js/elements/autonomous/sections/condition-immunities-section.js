import PropertyListSection from './property-list-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class ConditionImmunitiesSection extends PropertyListSection {
  static get elementName() { return 'condition-immunities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'condition-immunities-section',
      'src/html/elements/autonomous/sections/condition-immunities-section.html');
  }

  constructor() {
    super(ConditionImmunitiesSection.templatePaths,
          CurrentContext.creature.conditionImmunities);

    this.empty = true;
  }
}
