import DragAndDropList from './drag-and-drop-list.js';

import isRunningInJsdom from '../../../helpers/is-running-in-jsdom.js';
import PropertyListItem from './property-list-item.js';

export default class PropertyList extends DragAndDropList {
  static get elementName() { return 'property-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'property-list',
      'src/html/elements/autonomous/lists/property-list.html');
  }

  constructor(parent) {
    super(PropertyList.templatePaths, parent);
  }

  get items() {
    return Array.from(this.children);
  }

  get itemsAsText() {
    return this.items.map(item => item.text);
  }

  contains(itemText) {
    return this.itemsAsText.includes(itemText);
  }

  findItem(itemText) {
    return this.items.filter(element => element.text === itemText)[0];
  }

  clearItems() {
    for(const item of this.items) {
      item.remove();
    }
  }

  addItem(itemText) {
    let listItem;

    if (isRunningInJsdom) {
      listItem = new PropertyListItem(this, itemText);
      listItem.connect();
    } else {
      listItem = document.createElement('property-list-item');
      listItem.list = this;
      listItem.text = itemText;
    }

    this.appendChild(listItem);
  }

  setItems(itemTexts) {
    this.clearItems();
    for (const itemText of itemTexts) {
      this.addItem(itemText);
    }
  }
}