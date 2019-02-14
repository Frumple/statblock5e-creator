import AttributeListItem from '/src/js/elements/autonomous/attribute-list-item.js';
jest.mock('/src/js/elements/autonomous/attribute-list-item.js');

export default class AttributeList {
  constructor() {
    this._list = [];
    this.draggedItem = null;
  }

  get itemsAsText() {
    return this._list.map(item => item.text);
  }

  contains(itemText) {
    return this.itemsAsText.includes(itemText);
  }

  addItem(itemText) {
    const item = new AttributeListItem(this);
    item.text = itemText;
    this._list.push(item);
  }

  findItem(itemText) {
    return this._list.filter(item => item.text === itemText)[0];
  }

  // Mock-only method used in place of insertDraggedItemBefore()
  moveItem(fromIndex, toIndex) { 
    this._list.splice(toIndex, 0, this._list.splice(fromIndex, 1)[0]);
  }
}