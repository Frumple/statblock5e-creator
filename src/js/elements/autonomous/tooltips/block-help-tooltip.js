import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class BlockHelpTooltip extends CustomAutonomousElement {
  static get elementName() { return 'block-help-tooltip'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'block-help-tooltip',
      'src/html/elements/autonomous/tooltips/block-help-tooltip.html');
  }

  constructor() {
    super(BlockHelpTooltip.templatePaths);
  }
}