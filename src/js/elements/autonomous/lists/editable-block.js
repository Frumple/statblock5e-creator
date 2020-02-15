import DragAndDropListItem from './drag-and-drop-list-item.js';
import CustomBuiltinElementMixins from '../../../helpers/custom-builtin-element-mixins.js';
import BlockModel from '../../../models/lists/block/block-model.js';

import { trimTrailingPeriods } from '../../../helpers/string-formatter.js';

export default class EditableBlock extends DragAndDropListItem {
  static get elementName() { return 'editable-block'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'editable-block',
      'src/html/elements/autonomous/lists/editable-block.html');
  }

  constructor() {
    super(EditableBlock.templatePaths);

    this.nameInput = this.shadowRoot.getElementById('editable-block-name');
    this.textArea = this.shadowRoot.getElementById('editable-block-textarea');
    this.namePreviewElement = this.shadowRoot.getElementById('editable-block-name-preview');
    this.textPreviewElement = this.shadowRoot.getElementById('editable-block-text-preview');
    this.removeButton = this.shadowRoot.getElementById('editable-block-remove-button');

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
    this.namePreviewElement.textContent = this.nameInput.value;
  }

  onInputText() {
    this.textArea.parse();
    this.textPreviewElement.innerHTMLSanitized = this.textArea.htmlText;
  }

  onClickRemoveButton() {
    this.remove();
  }

  disableBlockNameItalics() {
    this.nameInput.classList.add('editable-block__name_no-italic');
  }

  set name(name) {
    this.nameInput.value = name;
  }

  get name() {
    return this.nameInput.value;
  }

  set text(text) {
    this.textArea.value = text;
  }

  get text() {
    return this.textArea.value;
  }

  get markdownText() {
    return this.textArea.markdownText;
  }

  get htmlText() {
    return this.textArea.htmlText;
  }

  set previewName(name) {
    this.namePreviewElement.textContent = name;
  }

  get previewName() {
    return this.namePreviewElement.textContent;
  }

  set previewText(text) {
    this.textPreviewElement.innerHTMLSanitized = text;
  }

  get previewText() {
    return this.textPreviewElement.innerHTMLSanitized;
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
      this.text,
      this.markdownText,
      this.htmlText);
  }
}