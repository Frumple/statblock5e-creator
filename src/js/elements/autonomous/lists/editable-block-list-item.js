import DragAndDropListItem from './drag-and-drop-list-item.js';
import CustomBuiltinElementMixins from '../../../helpers/custom-builtin-element-mixins.js';
import BlockModel from '../../../models/lists/block/block-model.js';

import { trimTrailingPeriods } from '../../../helpers/string-formatter.js';

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

    this.nameInput = this.shadowRoot.getElementById('editable-block-list-item-name');
    this.textArea = this.shadowRoot.getElementById('editable-block-list-item-textarea');
    this.namePreview = this.shadowRoot.getElementById('editable-block-list-item-name-preview');
    this.textPreview = this.shadowRoot.getElementById('editable-block-list-item-text-preview');
    this.removeButton = this.shadowRoot.getElementById('editable-block-list-item-remove-button');

    this.dragImage = this.nameInput;

    CustomBuiltinElementMixins.applyToElement(this.nameInput);
    CustomBuiltinElementMixins.applyToElement(this.textArea);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.nameInput.addEventListener('input', this.onInputName.bind(this));
      this.textArea.addEventListener('input', this.onInputText.bind(this));
      this.removeButton.addEventListener('click', this.onClickRemoveButton.bind(this));

      this.isInitialized = true;
    }
  }

  onInputName() {
    this.nameInput.value = trimTrailingPeriods(this.nameInput.value);
    this.namePreview.textContent = this.nameInput.value;
  }

  onInputText() {
    this.textArea.parse();
    this.textPreview.innerHTMLSanitized = this.textArea.htmlText;
  }

  onClickRemoveButton() {
    this.remove();
  }

  disableBlockNameItalics() {
    this.nameInput.classList.add('editable-block-list-item__name_no-italic');
  }

  set itemType(itemType) {
    this._itemType = itemType;

    this.nameInput.setAttribute('pretty-name', `${itemType} Name`);
    this.textArea.setAttribute('pretty-name', `${itemType} Text`);
  }

  get itemType() {
    return this._itemType;
  }

  set name(name) {
    this.nameInput.value = name;
  }

  get name() {
    return this.nameInput.value;
  }

  set originalText(text) {
    this.textArea.value = text;
  }

  get originalText() {
    return this.textArea.value;
  }

  get homebreweryText() {
    return this.textArea.homebreweryText;
  }

  get htmlText() {
    return this.textArea.htmlText;
  }

  get previewName() {
    return this.namePreview.textContent;
  }

  get previewText() {
    return this.textPreview.innerHTMLSanitized;
  }

  validate(errorMessages) {
    this.nameInput.validate(errorMessages);
    this.textArea.validate(errorMessages);
  }

  parse() {
    this.textArea.parse();
  }

  remove() {
    this.list.removeChild(this);
  }

  toModel() {
    return new BlockModel(
      this.name,
      this.originalText,
      this.homebreweryText,
      this.htmlText);
  }
}