import DragAndDropList from '/src/js/elements/autonomous/lists/drag-and-drop-list.js';

import isRunningInNode from '/src/js/helpers/is-running-in-node.js';
import PropertyListItem from '/src/js/elements/autonomous/lists/property-list-item.js';

export default class PropertyList extends DragAndDropList {
  static get elementName() { return 'property-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'property-list',
      'src/html/elements/autonomous/lists/property-list.html');
  }

  constructor() {
    super(PropertyList.templatePaths);
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
    let listItem = PropertyList.createListItem();
    listItem.list = this;
    listItem.text = itemText;
    this.appendChild(listItem);
  }

  findItem(itemText) {
    return this.items.filter(element => element.text === itemText)[0];
  }

  static createListItem() {
    if (isRunningInNode) {
      return new PropertyListItem();
    }
    return document.createElement('property-list-item');
  }
}
