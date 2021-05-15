import DragAndDropListItem from './drag-and-drop-list-item.js';

import BlockModel from '../../../models/lists/block/block-model.js';

import { trimTrailingPeriods } from '../../../helpers/string-formatter.js';

export default class EditableBlock extends DragAndDropListItem {
  static get elementName() { return 'editable-block'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'editable-block',
      'src/html/elements/autonomous/lists/editable-block.html');
  }

  constructor(templatePaths) {
    super(templatePaths ? templatePaths : EditableBlock.templatePaths);

    this.nameInput = this.shadowRoot.getElementById('editable-block-name');
    this.textArea = this.shadowRoot.getElementById('editable-block-textarea');
    this.previewContainer = this.shadowRoot.getElementById('editable-block-preview-container');
    this.previewNameElement = this.shadowRoot.getElementById('editable-block-preview-name');
    this.previewTextElement = this.shadowRoot.getElementById('editable-block-preview-text');
    this.removeButton = this.shadowRoot.getElementById('editable-block-remove-button');

    this.nameExpressionButtons = {
      'NAME' : this.shadowRoot.getElementById('name-button'),
      'FULLNAME' : this.shadowRoot.getElementById('fullname-button')
    };

    this.modExpressionButtons = {
      'STR' : this.shadowRoot.getElementById('mod-str-button'),
      'DEX' : this.shadowRoot.getElementById('mod-dex-button'),
      'CON' : this.shadowRoot.getElementById('mod-con-button'),
      'INT' : this.shadowRoot.getElementById('mod-int-button'),
      'WIS' : this.shadowRoot.getElementById('mod-wis-button'),
      'CHA' : this.shadowRoot.getElementById('mod-cha-button')
    };

    this.atkExpressionButtons = {
      'STR' : this.shadowRoot.getElementById('atk-str-button'),
      'DEX' : this.shadowRoot.getElementById('atk-dex-button'),
      'FIN' : this.shadowRoot.getElementById('atk-fin-button')
    };

    this.dmgExpressionButtons = {
      'STR' : this.shadowRoot.getElementById('dmg-str-button'),
      'DEX' : this.shadowRoot.getElementById('dmg-dex-button'),
      'FIN' : this.shadowRoot.getElementById('dmg-fin-button')
    };

    this.sdcExpressionButtons = {
      'INT' : this.shadowRoot.getElementById('sdc-int-button'),
      'WIS' : this.shadowRoot.getElementById('sdc-wis-button'),
      'CHA' : this.shadowRoot.getElementById('sdc-cha-button')
    };

    this.dragImage = this.nameInput;

    this.isLegendaryActionBlock = false;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.nameInput.addEventListener('input', this.onInputName.bind(this));
      this.textArea.addEventListener('input', this.onInputText.bind(this));
      this.removeButton.addEventListener('click', this.onClickRemoveButton.bind(this));

      for(const [variable, button] of Object.entries(this.nameExpressionButtons)) {
        button.addEventListener('click', this.onClickNameExpressionButton.bind(this, variable));
      }

      for(const [variable, button] of Object.entries(this.modExpressionButtons)) {
        button.addEventListener('click', this.onClickModExpressionButton.bind(this, variable));
      }

      for(const [variable, button] of Object.entries(this.atkExpressionButtons)) {
        button.addEventListener('click', this.onClickAtkExpressionButton.bind(this, variable));
      }

      for(const [variable, button] of Object.entries(this.dmgExpressionButtons)) {
        button.addEventListener('click', this.onClickDmgExpressionButton.bind(this, variable));
      }

      for(const [variable, button] of Object.entries(this.sdcExpressionButtons)) {
        button.addEventListener('click', this.onClickSdcExpressionButton.bind(this, variable));
      }

      this.isInitialized = true;
    }
  }

  onInputName() {
    this.nameInput.value = trimTrailingPeriods(this.nameInput.value);
    this.previewNameElement.textContent = this.nameInput.value;
  }

  onInputText() {
    this.textArea.parse();
    this.previewTextElement.innerHTMLSanitized = this.textArea.htmlText;
  }

  onClickRemoveButton() {
    this.remove();
  }

  onClickNameExpressionButton(variable) {
    this.addExpressionToText(`[${variable}]`);
  }

  onClickModExpressionButton(variable) {
    this.addExpressionToText(`MOD[${variable}]`);
  }

  onClickAtkExpressionButton(variable) {
    this.addExpressionToText(`ATK[${variable}]`);
  }

  onClickDmgExpressionButton(variable) {
    this.addExpressionToText(`DMG[d6 + ${variable}]`);
  }

  onClickSdcExpressionButton(variable) {
    this.addExpressionToText(`SDC[${variable}]`);
  }

  addExpressionToText(expression) {
    const selectionStart = this.textArea.selectionStart;
    const selectionEnd = this.textArea.selectionEnd;

    this.textArea.setRangeText(expression, selectionStart, selectionEnd, 'end');
    this.textArea.focus();

    this.onInputText();
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
    this.previewNameElement.textContent = name;
  }

  get previewName() {
    return this.previewNameElement.textContent;
  }

  set previewText(text) {
    this.previewTextElement.innerHTMLSanitized = text;
  }

  get previewText() {
    return this.previewTextElement.innerHTMLSanitized;
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