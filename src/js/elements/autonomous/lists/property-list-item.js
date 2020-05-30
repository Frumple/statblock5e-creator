import DragAndDropListItem from './drag-and-drop-list-item.js';

export default class PropertyListItem extends DragAndDropListItem {
  static get elementName() { return 'property-list-item'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'property-list-item',
      'src/html/elements/autonomous/lists/property-list-item.html');
  }

  constructor(parent, text) {
    super(PropertyListItem.templatePaths, parent);

    this.label = this.shadowRoot.getElementById('property-list-item-label');
    this.removeButton = this.shadowRoot.getElementById('property-list-item-remove-button');

    this.dragImage = this.label;

    this.text = text;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.removeButton.addEventListener('click', this.onClickRemoveButton.bind(this));

      this.isInitialized = true;
    }
  }

  onClickRemoveButton() {
    this.remove();
    this.list.dispatchPropertyListChangedEvent();
  }

  onDropItem(event) {
    super.onDropItem(event);

    this.list.dispatchPropertyListChangedEvent();
  }

  get text() {
    return this.label.textContent;
  }

  set text(text) {
    this.label.textContent = text;
  }

  remove() {
    this.list.removeChild(this);
    this.list.dataList.setOptionEnabled(this.text, true);
  }
}
