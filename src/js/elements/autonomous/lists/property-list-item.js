import DragAndDropListItem from './drag-and-drop-list-item.js';

export default class PropertyListItem extends DragAndDropListItem {
  static get elementName() { return 'property-list-item'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'property-list-item',
      'src/html/elements/autonomous/lists/property-list-item.html');
  }

  constructor() {
    super(PropertyListItem.templatePaths);

    this.label = this.shadowRoot.getElementById('property-list-item-label');
    this.removeButton = this.shadowRoot.getElementById('property-list-item-remove-button');

    this.dragImage = this.label;
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
  }

  get text() {
    return this.label.textContent;
  }

  set text(text) {
    this.label.textContent = text;
  }

  remove() {
    let removeEvent = new CustomEvent('propertyListItemRemoved', {
      bubbles: true,
      composed: true,
      detail: {
        itemText: this.text
      }
    });
    this.dispatchEvent(removeEvent);

    this.list.removeChild(this);
  }
}
