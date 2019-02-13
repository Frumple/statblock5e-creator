import AttributeListSection from '/src/js/sections/attribute-list-section.js';

export default class ConditionImmunitiesSection extends AttributeListSection {
  static get elementName() { return 'condition-immunities-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'condition-immunities-section',
      'src/html/sections/condition-immunities-section.html');
  }

  constructor() {
    super(ConditionImmunitiesSection.templatePaths,
          'Condition Immunities');

    this.empty = true;
  }
}
