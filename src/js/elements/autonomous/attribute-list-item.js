import DraggableListItem from '/src/js/elements/autonomous/draggable-list-item.js';

export default class AttributeListItem extends DraggableListItem {
  static get elementName() { return 'attribute-list-item'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'attribute-list-item',
      'src/html/elements/autonomous/attribute-list-item.html');
  }

  constructor() {
    super(AttributeListItem.templatePaths);

    this.container = this.shadowRoot.getElementById('attribute-list-item-container');
    this.label = this.shadowRoot.getElementById('attribute-list-item-label');
    this.removeButton = this.shadowRoot.getElementById('attribute-list-item-remove-button');
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
    let removeEvent = new CustomEvent('attributeListItemRemoved', {
      bubbles: true,
      composed: true,
      detail: {
        itemText: this.text
      }
    });
    this.dispatchEvent(removeEvent);

    this.parentNode.removeChild(this);
  }
}
