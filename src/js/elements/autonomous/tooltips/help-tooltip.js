import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class HelpTooltip extends CustomAutonomousElement {
  static get elementName() { return 'help-tooltip'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'help-tooltip',
      'src/html/elements/autonomous/tooltips/help-tooltip.html');
  }

  constructor() {
    super(HelpTooltip.templatePaths);    
  }
}