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

  set items(itemTexts) {
    this.clearItems();
    for (const itemText of itemTexts) {
      this.addItem(itemText);
    }
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
    const listItem = PropertyList.createListItem(this, itemText);

    if (isRunningInNode) {
      listItem.connect();
    }

    this.appendChild(listItem);
  }

  clearItems() {
    for(const item of this.items) {
      item.remove();
    }
  }

  findItem(itemText) {
    return this.items.filter(element => element.text === itemText)[0];
  }

  static createListItem(list, text) {
    const listItem = isRunningInNode ? new PropertyListItem(list) : document.createElement('property-list-item');

    listItem.list = list;
    listItem.text = text;

    return listItem;
  }
}
