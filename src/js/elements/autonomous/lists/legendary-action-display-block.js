import CustomAutonomousElement from '../custom-autonomous-element.js';
import DisplayBlock from './display-block.js';

export default class LegendaryActionDisplayBlock extends DisplayBlock {
  static get elementName() { return 'legendary-action-display-block'; }
  static get templatePaths() {
    // Override the HTML template for DisplayBlock in order to use CSS specific to LegendaryActionDisplayBlocks.
    return CustomAutonomousElement.templatePaths.set(
      'legendary-action-display-block',
      'src/html/elements/autonomous/lists/legendary-action-display-block.html');
  }

  constructor() {
    super(LegendaryActionDisplayBlock.templatePaths);
  }
}