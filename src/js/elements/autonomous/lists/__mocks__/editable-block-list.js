import EditableBlockListItem from '/src/js/elements/autonomous/lists/editable-block-list-item.js';
jest.mock('/src/js/elements/autonomous/lists/editable-block-list-item.js');

import { trimTrailingPeriods } from '/src/js/helpers/string-formatter.js';

export default class EditableBlockList {
  constructor() {
    this._list = [];    
  }

  get blocks() {
    return this._list;
  }

  addBlock(itemType) {
    const listItem = new EditableBlockListItem(this);
    listItem.setItemType(itemType);
    this._list.push(listItem);
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