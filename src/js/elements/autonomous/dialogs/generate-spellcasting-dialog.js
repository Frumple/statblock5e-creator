import CustomDialog from './custom-dialog.js';

import { focusAndSelectElement } from '../../../helpers/element-helpers.js';

export default class GenerateSpellcastingDialog extends CustomDialog {
  static get elementName() { return 'generate-spellcasting-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'generate-spellcasting-dialog',
      'src/html/elements/autonomous/dialogs/generate-spellcasting-dialog.html');
  }

  constructor(parent = null) {
    super(GenerateSpellcastingDialog.templatePaths, parent);

    this.errorMessages = this.shadowRoot.getElementById('error-messages');

    this.spellcasterTypeSelect = this.shadowRoot.getElementById('spellcaster-type-select');
    this.spellcasterAbilitySelect = this.shadowRoot.getElementById('spellcaster-ability-select');
    this.spellcasterLevelInput = this.shadowRoot.getElementById('spellcaster-level-input');

    this.spellCategories = [];

    const cantripsAtWillCategory = this.shadowRoot.getElementById('cantrips-at-will-spell-category');
    this.spellCategories.push(cantripsAtWillCategory);

    for (let spellLevel = 1; spellLevel < 10; spellLevel++) {
      const spellCategory = this.shadowRoot.getElementById(`level-${spellLevel}-spell-category`);
      this.spellCategories.push(spellCategory);
    }

    this.cancelButton = this.shadowRoot.getElementById('cancel-button');
    this.resetButton = this.shadowRoot.getElementById('reset-button');
    this.generateSpellcastingButton = this.shadowRoot.getElementById('generate-spellcasting-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      for (const spellCategory of this.spellCategories) {
        spellCategory.propertyList.errorMessages = this.errorMessages;
      }

      this.cancelButton.addEventListener('click', this.onClickCloseButton.bind(this));
      this.resetButton.addEventListener('click', this.onClickResetButton.bind(this));
      this.generateSpellcastingButton.addEventListener('click', this.onClickGenerateSpellcastingButton.bind(this));

      this.isInitialized = true;
    }
  }

  onClickResetButton() {
    this.reset();
  }

  onClickGenerateSpellcastingButton() {
    this.generateSpellCasting();
  }

  launch() {
    this.showModal();
    focusAndSelectElement(this.spellcasterTypeSelect);
  }

  reset() {

  }

  generateSpellcasting() {

  }

  update() {

  }
}