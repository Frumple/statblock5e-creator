import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class AttributeListItem extends CustomAutonomousElement {
  static get elementName() { return 'attribute-list-item'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'attribute-list-item',
      'src/html/elements/attribute-list-item.html');
  }

  constructor() {
    super(AttributeListItem.templatePaths);

    this.domInitialized = false;

    this.container = this.shadowRoot.getElementById('list-item-container');
    this.label = this.shadowRoot.getElementById('list-item-label');
    this.removeButton = this.shadowRoot.getElementById('list-item-remove-button');

    this.removeButton.addEventListener('click', () => {
      this.remove();
    });

    this.addEventListener('dragstart', (event) => {
      let target = event.target;
      target.parentNode.draggedItem = target;
    });

    this.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';

      let target = event.target;
      let rect = target.getBoundingClientRect();
      let midpointY = rect.y + (rect.height / 2);

      if (event.clientY < midpointY) {
        target.dragover = 'top';
      } else {
        target.dragover = 'bottom';
      }
    });

    this.addEventListener('dragleave', () => {
      this.dragover = 'none';
    });

    this.addEventListener('drop', (event) => {
      event.preventDefault();

      let target = event.target;
      if (target.dragover === 'top') {
        target.parentNode.insertDraggedItemBefore(target);
        target.dragover = 'none';
      } else if (target.dragover === 'bottom') {
        target.parentNode.insertDraggedItemBefore(target.nextElementSibling);
        target.dragover = 'none';
      }
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

  get text() {
    return this.label.textContent;
  }

  set text(text) {
    this.label.textContent = text;
  }

  get dragover() {
    return this.dataset.dragover;
  }

  set dragover(state) {
    const dragoverTopClass = 'list-item__container_dragover-top';
    const dragoverBottomClass = 'list-item__container_dragover-bottom';

    switch (state) {
    case 'top':
      this.dataset.dragover = 'top';
      this.container.classList.add(dragoverTopClass);
      this.container.classList.remove(dragoverBottomClass);
      break;
    case 'bottom':
      this.dataset.dragover = 'bottom';
      this.container.classList.remove(dragoverTopClass);
      this.container.classList.add(dragoverBottomClass);
      break;
    default:
      this.dataset.dragover = 'none';
      this.container.classList.remove(dragoverTopClass);
      this.container.classList.remove(dragoverBottomClass);
    }
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
