import PropertyListItem from '/src/js/elements/autonomous/property-list-item.js';
jest.mock('/src/js/elements/autonomous/property-list-item.js');

export default class PropertyList {
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
    const item = new PropertyListItem(this);
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