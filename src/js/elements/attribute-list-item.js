import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class AttributeListItem extends CustomAutonomousElement {
  static get elementName() { return 'attribute-list-item'; }
  static get templatePath() { return 'src/html/elements/attribute-list-item.html'; }

  constructor() {
    super(AttributeListItem.elementName);

    this.label = this.shadowRoot.getElementById('list-item-label');
    this.removeButton = this.shadowRoot.getElementById('list-item-remove-button');

    this.removeButton.addEventListener('click', () => {
      this.remove();
    });
  }

  get text() {
    let textSlot = this.querySelector('[slot="text"]');
    return textSlot.textContent;
  }

  remove() {
    let itemText = this.text;

    let removeEvent = new CustomEvent('attributeListItemRemoved', {
      bubbles: true,
      composed: true,
      detail: {
        itemText: itemText
      }
    });
    this.dispatchEvent(removeEvent);

    this.parentNode.removeChild(this);

  }
}
