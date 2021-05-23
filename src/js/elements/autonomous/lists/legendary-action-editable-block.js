import DragAndDropListItem from './drag-and-drop-list-item.js';
import EditableBlock from './editable-block.js';

import LegendaryBlockModel from '../../../models/lists/block/legendary-block-model.js';

export default class LegendaryActionEditableBlock extends EditableBlock {
  static get elementName() { return 'legendary-action-editable-block'; }
  static get templatePaths() {
    // Override the HTML template for EditableBlock in order to use CSS specific to LegendaryActionEditableBlocks.
    return DragAndDropListItem.templatePaths.set(
      'legendary-action-editable-block',
      'src/html/elements/autonomous/lists/legendary-action-editable-block.html');
  }

  constructor() {
    super(LegendaryActionEditableBlock.templatePaths);
  }

  toModel() {
    return new LegendaryBlockModel(
      this.name,
      this.text,
      this.markdownText,
      this.htmlText);
  }
}