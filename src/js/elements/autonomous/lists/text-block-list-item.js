import DragAndDropListItem from '/src/js/elements/autonomous/lists/drag-and-drop-list-item.js';

export default class TextBlockListItem extends DragAndDropListItem {
  static get elementName() { return 'text-block-list-item'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'text-block-list-item',
      'src/html/elements/autonomous/lists/text-block-list-item.html');
  }

  constructor() {
    super(TextBlockListItem.templatePaths);

    this.container = this.shadowRoot.getElementById('text-block-list-item-container');
    this.textarea = this.shadowRoot.getElementById('text-block-list-item-textarea');
    this.removeButton = this.shadowRoot.getElementById('text-block-list-item-remove-button');
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
    return this.textarea.value;
  }

  set text(text) {
    this.textarea.value = text;
  }

  remove() {
    this.parentNode.removeChild(this);
  }
}