import AttributeListItem from '/src/js/elements/attribute-list-item.js';
jest.mock('/src/js/elements/attribute-list-item.js');

export default class AttributeList {
  constructor() {
    this._list = [];
  }

  get items() {
    return this._list.map(item => item.text);
  }

  contains(itemText) {
    return this.items.includes(itemText);
  }

  addItem(itemText) {
    const item = new AttributeListItem();
    item.text = itemText;
    this._list.push(item);
  }
}