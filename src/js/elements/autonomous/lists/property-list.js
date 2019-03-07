import DragAndDropList from './drag-and-drop-list.js';

import isRunningInNode from '../../../helpers/is-running-in-node.js';
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
    return this.items.map(element => element.text);
  }

  contains(itemText) {
    return this.itemsAsText.includes(itemText);
  }

  addItem(itemText) {
    let listItem = PropertyList.createListItem(this);
    listItem.list = this;
    listItem.text = itemText;
    if (isRunningInNode) {
      listItem.connect();
    }

    this.appendChild(listItem);
  }

  findItem(itemText) {
    return this.items.filter(element => element.text === itemText)[0];
  }

  static createListItem(parent) {
    if (isRunningInNode) {
      return new PropertyListItem(parent);
    }
    return document.createElement('property-list-item');
  }
}
