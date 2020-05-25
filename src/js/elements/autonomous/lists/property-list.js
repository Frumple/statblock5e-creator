import DragAndDropList from './drag-and-drop-list.js';
import PropertyListItem from './property-list-item.js';

import isRunningInJsdom from '../../../helpers/is-running-in-jsdom.js';
import { arrayStrictEqual } from '../../../helpers/array-helpers.js';
import { addOptionsToElement } from '../../../helpers/element-helpers.js';

export default class PropertyList extends DragAndDropList {
  static get elementName() { return 'property-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'property-list',
      'src/html/elements/autonomous/lists/property-list.html');
  }

  constructor(parent) {
    super(PropertyList.templatePaths, parent);

    this.input = this.shadowRoot.getElementById('input');
    this.addButton = this.shadowRoot.getElementById('add-button');
    this.dataList = this.shadowRoot.getElementById('datalist');

    this.errorMessages = null;
    this.singleItemName = 'item';
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.input.addEventListener('keydown', this.onEnterKeyDownOnInputField.bind(this));
      this.addButton.addEventListener('click', this.onClickAddButton.bind(this));

      this.isInitialized = true;
    }
  }

  onEnterKeyDownOnInputField(keyEvent) {
    if (keyEvent.key === 'Enter') {
      keyEvent.preventDefault();

      this.addItemFromInput();
    }
  }

  onClickAddButton() {
    this.addItemFromInput();
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

  addItemFromInput() {
    const text = this.input.value.trim();
    this.input.value = text;

    this.errorMessages.clear();
    if (text === '') {
      this.errorMessages.add(this.input, `Cannot add a blank ${this.singleItemName}.`);
    } else if (this.contains(text)) {
      this.errorMessages.add(this.input, `Cannot add a duplicate ${this.singleItemName}.`);
    }
    if (this.errorMessages.any) {
      this.errorMessages.focusOnFirstErrorField();
      return;
    }

    this.addItem(text);
    this.dispatchPropertyListChangedEvent();

    this.input.value = '';
    this.input.select();
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
    this.dataList.setOptionEnabled(itemText, false);
  }

  setItems(itemTexts) {
    // Don't clear and re-add items if there are no changes
    if(! arrayStrictEqual(itemTexts, this.itemsAsText)) {
      this.clearItems();
      for (const itemText of itemTexts) {
        this.addItem(itemText);
      }
    }
  }

  setDataListOptions(objects) {
    addOptionsToElement(this.dataList, objects);
  }

  dispatchPropertyListChangedEvent() {
    const event = new CustomEvent('propertyListChanged', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}