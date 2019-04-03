import DragAndDropListItem from './drag-and-drop-list-item.js';
import CustomBuiltinElementMixins from '../../../helpers/custom-builtin-element-mixins.js';
import BlockModel from '../../../stats/lists/block/block-model.js';

export default class EditableBlockListItem extends DragAndDropListItem {
  static get elementName() { return 'editable-block-list-item'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'editable-block-list-item',
      'src/html/elements/autonomous/lists/editable-block-list-item.html');
  }

  constructor() {
    super(EditableBlockListItem.templatePaths);

    this._itemType = null;

    this.nameElement = this.shadowRoot.getElementById('editable-block-list-item-name');
    this.textElement = this.shadowRoot.getElementById('editable-block-list-item-text');
    this.removeButton = this.shadowRoot.getElementById('editable-block-list-item-remove-button');

    this.dragImage = this.nameElement;

    CustomBuiltinElementMixins.applyToElement(this.nameElement);
    CustomBuiltinElementMixins.applyToElement(this.textElement);
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

  disableBlockNameItalics() {
    this.nameElement.classList.add('editable-block-list-item__name_no-italic');
  }

  set itemType(itemType) {
    this._itemType = itemType;

    this.nameElement.setAttribute('pretty-name', `${itemType} Name`);
    this.textElement.setAttribute('pretty-name', `${itemType} Text`);
  }

  get itemType() {
    return this._itemType;
  }

  set name(name) {
    this.nameElement.value = name;
  }

  get name() {
    return this.nameElement.value;
  }

  set originalText(text) {
    this.textElement.value = text;
  }

  get originalText() {
    return this.textElement.value;
  }

  get parsedText() {
    return this.textElement.parsedText;
  }

  validate(errorMessages) {
    this.nameElement.validate(errorMessages);
    this.textElement.validate(errorMessages);
  }

  remove() {
    this.list.removeChild(this);
  }

  toModel() {
    return new BlockModel(this.name, this.originalText, this.parsedText);
  }
}