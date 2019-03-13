import DragAndDropList from './drag-and-drop-list.js';
import { focusAndSelectElement } from '../../../helpers/element-helpers.js';
import { trimTrailingPeriods } from '../../../helpers/string-formatter.js';

import isRunningInNode from '../../../helpers/is-running-in-node.js';
import EditableBlockListItem from './editable-block-list-item.js';

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
    return Array.from(this.children);
  }

  addBlock(itemType) {
    const block = EditableBlockList.createListItem(); 
    block.list = this;
    block.itemType = itemType;
    if (isRunningInNode) {
      block.connect();
    }

    this.appendChild(block);

    focusAndSelectElement(block.nameElement);

    return block;
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

  static createListItem() {
    if (isRunningInNode) {
      return new EditableBlockListItem();
    }
    return document.createElement('editable-block-list-item');
  }
}