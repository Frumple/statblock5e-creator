import DragAndDropList from '/src/js/elements/autonomous/lists/drag-and-drop-list.js';
import { trimTrailingPeriods } from '/src/js/helpers/string-formatter.js';

export default class EditableBlockList extends DragAndDropList {
  static get elementName() { return 'editable-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'editable-block-list',
      'src/html/elements/autonomous/lists/editable-block-list.html');
  }

  constructor() {
    super(EditableBlockList.templatePaths);
  }

  get blocks() {
    const blocks = Array.from(this.querySelectorAll('editable-block-list-item'));
    return blocks;
  }

  addBlock(itemType) {
    const listItem = document.createElement('editable-block-list-item');
    listItem.setItemType(itemType);
    this.appendChild(listItem);
  }

  trimTrailingPeriodsInNames() {
    for (const block of this.blocks) {
      block.name = trimTrailingPeriods(block.name);
    }
  }

  validate(errorMessages) {
    for (const block of this.blocks) {
      block.validate(errorMessages);
    }
  }
}