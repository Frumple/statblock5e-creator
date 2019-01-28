import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class AttributeListItem extends CustomAutonomousElement {
  static get elementName() { return 'attribute-list-item'; }
  static get templatePath() { return 'src/html/elements/attribute-list-item.html'; }

  constructor() {
    super(AttributeListItem.elementName);

    this.domInitialized = false;

    this.label = this.shadowRoot.getElementById('list-item-label');
    this.removeButton = this.shadowRoot.getElementById('list-item-remove-button');

    this.removeButton.addEventListener('click', () => {
      this.remove();
    });

    this.addEventListener('dragstart', (event) => {
      console.log(event);

      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setDragImage(event.target, 0, 0);
    });
  }

  connectedCallback() {
    if (this.isConnected) {
      if (! this.domInitialized) {
        this.style.cssText = 'user-select: none; -webkit-user-drag: element;';
        this.setAttribute('draggable', '');

        this.domInitialized = true;
      }
    }
  }

  set text(text) {
    this.label.textContent = text;
  }

  get text() {
    return this.label.textContent;
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
