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

    this.nameButton = this.shadowRoot.getElementById('name-button');
    this.fullnameButton = this.shadowRoot.getElementById('fullname-button');

    this.modStrButton = this.shadowRoot.getElementById('mod-str-button');
    this.modDexButton = this.shadowRoot.getElementById('mod-dex-button');
    this.modConButton = this.shadowRoot.getElementById('mod-con-button');
    this.modIntButton = this.shadowRoot.getElementById('mod-int-button');
    this.modWisButton = this.shadowRoot.getElementById('mod-wis-button');
    this.modChaButton = this.shadowRoot.getElementById('mod-cha-button');

    this.atkStrButton = this.shadowRoot.getElementById('atk-str-button');
    this.atkDexButton = this.shadowRoot.getElementById('atk-dex-button');
    this.atkFinButton = this.shadowRoot.getElementById('atk-fin-button');

    this.dmgStrButton = this.shadowRoot.getElementById('dmg-str-button');
    this.dmgDexButton = this.shadowRoot.getElementById('dmg-dex-button');
    this.dmgFinButton = this.shadowRoot.getElementById('dmg-fin-button');

    this.sdcIntButton = this.shadowRoot.getElementById('sdc-int-button');
    this.sdcWisButton = this.shadowRoot.getElementById('sdc-wis-button');
    this.sdcChaButton = this.shadowRoot.getElementById('sdc-cha-button');

    this.dragImage = this.nameInput;

    this.isLegendaryActionBlock = false;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.nameInput.addEventListener('input', this.onInputName.bind(this));
      this.textArea.addEventListener('input', this.onInputText.bind(this));
      this.removeButton.addEventListener('click', this.onClickRemoveButton.bind(this));

      this.nameButton.addEventListener('click', this.onClickNameButton.bind(this));
      this.fullnameButton.addEventListener('click', this.onClickFullnameButton.bind(this));

      this.modStrButton.addEventListener('click', this.onClickModButton.bind(this, 'STR'));
      this.modDexButton.addEventListener('click', this.onClickModButton.bind(this, 'DEX'));
      this.modConButton.addEventListener('click', this.onClickModButton.bind(this, 'CON'));
      this.modIntButton.addEventListener('click', this.onClickModButton.bind(this, 'INT'));
      this.modWisButton.addEventListener('click', this.onClickModButton.bind(this, 'WIS'));
      this.modChaButton.addEventListener('click', this.onClickModButton.bind(this, 'CHA'));

      this.atkStrButton.addEventListener('click', this.onClickAtkButton.bind(this, 'STR'));
      this.atkDexButton.addEventListener('click', this.onClickAtkButton.bind(this, 'DEX'));
      this.atkFinButton.addEventListener('click', this.onClickAtkButton.bind(this, 'FIN'));

      this.dmgStrButton.addEventListener('click', this.onClickDmgButton.bind(this, 'STR'));
      this.dmgDexButton.addEventListener('click', this.onClickDmgButton.bind(this, 'DEX'));
      this.dmgFinButton.addEventListener('click', this.onClickDmgButton.bind(this, 'FIN'));

      this.sdcIntButton.addEventListener('click', this.onClickSdcButton.bind(this, 'INT'));
      this.sdcWisButton.addEventListener('click', this.onClickSdcButton.bind(this, 'WIS'));
      this.sdcChaButton.addEventListener('click', this.onClickSdcButton.bind(this, 'CHA'));

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

  onClickNameButton() {
    this.addExpressionToText('[NAME]');
  }

  onClickFullnameButton() {
    this.addExpressionToText('[FULLNAME]');
  }

  onClickModButton(abilityVariable) {
    this.addExpressionToText(`MOD[${abilityVariable}]`);
  }

  onClickAtkButton(abilityVariable) {
    this.addExpressionToText(`ATK[${abilityVariable}]`);
  }

  onClickDmgButton(abilityVariable) {
    this.addExpressionToText(`DMG[d6 + ${abilityVariable}]`);
  }

  onClickSdcButton(abilityVariable) {
    this.addExpressionToText(`SDC[${abilityVariable}]`);
  }

  addExpressionToText(expression) {
    const selectionStart = this.textArea.selectionStart;
    const selectionEnd = this.textArea.selectionEnd;

    this.textArea.setRangeText(expression, selectionStart, selectionEnd, 'end');
    this.textArea.focus();
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