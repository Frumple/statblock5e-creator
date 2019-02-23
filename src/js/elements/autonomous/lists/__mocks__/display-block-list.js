import DisplayBlockListItem from '/src/js/elements/autonomous/lists/display-block-list-item.js';
jest.mock('/src/js/elements/autonomous/lists/display-block-list-item.js');

export default class DisplayBlockList {
  constructor() {
    this._list = [];
  }

  get blocks() {
    return this._list;
  }

  clear() {
    for (const item of this._list) {
      this._list.pop(item);
    }
  }

  addBlock(name, text) {
    const listItem = new DisplayBlockListItem();
    listItem.name = name;
    listItem.text = text;
    this._list.push(listItem);
  }
}