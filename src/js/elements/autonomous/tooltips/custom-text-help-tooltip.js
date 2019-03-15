import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class CustomTextHelpTooltip extends CustomAutonomousElement {
  static get elementName() { return 'custom-text-help-tooltip'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'custom-text-help-tooltip',
      'src/html/elements/autonomous/tooltips/custom-text-help-tooltip.html');
  }

  constructor() {
    super(CustomTextHelpTooltip.templatePaths);
  }
}