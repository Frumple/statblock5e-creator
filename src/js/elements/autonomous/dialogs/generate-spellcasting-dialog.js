import CustomDialog from './custom-dialog.js';

import SpellcasterTypes from '../../../data/spellcaster-types.js';

import Spellcasting from '../../../models/spellcasting.js';

import { focusAndSelectElement, inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

export default class GenerateSpellcastingDialog extends CustomDialog {
  static get elementName() { return 'generate-spellcasting-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'generate-spellcasting-dialog',
      'src/html/elements/autonomous/dialogs/generate-spellcasting-dialog.html');
  }

  constructor(parent = null) {
    super(GenerateSpellcastingDialog.templatePaths, parent);

    this.spellcastingModel = new Spellcasting();

    this.errorMessages = this.shadowRoot.getElementById('error-messages');

    this.spellcasterTypeSelect = this.shadowRoot.getElementById('spellcaster-type-select');
    this.spellcasterAbilitySelect = this.shadowRoot.getElementById('spellcaster-ability-select');
    this.spellcasterLevelInput = this.shadowRoot.getElementById('spellcaster-level-input');

    this.spellCategoryBoxes = [];

    const cantripsAtWillCategory = this.shadowRoot.getElementById('cantrips-at-will-spell-category-box');
    this.spellCategoryBoxes.push(cantripsAtWillCategory);

    for (let spellLevel = 1; spellLevel <= 9; spellLevel++) {
      const spellCategoryBox = this.shadowRoot.getElementById(`level-${spellLevel}-spell-category-box`);
      this.spellCategoryBoxes.push(spellCategoryBox);
    }

    this.cancelButton = this.shadowRoot.getElementById('cancel-button');
    this.resetButton = this.shadowRoot.getElementById('reset-button');
    this.generateSpellcastingButton = this.shadowRoot.getElementById('generate-spellcasting-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      for (const spellCategoryBox of this.spellCategoryBoxes) {
        spellCategoryBox.propertyList.errorMessages = this.errorMessages;
      }

      this.spellcasterTypeSelect.addEventListener('input', this.onInputSpellcasterType.bind(this));
      this.spellcasterAbilitySelect.addEventListener('input', this.onInputSpellcasterAbility.bind(this));
      this.spellcasterLevelInput.addEventListener('input', this.onInputSpellcasterLevel.bind(this));

      this.cancelButton.addEventListener('click', this.onClickCloseButton.bind(this));
      this.resetButton.addEventListener('click', this.onClickResetButton.bind(this));
      this.generateSpellcastingButton.addEventListener('click', this.onClickGenerateSpellcastingButton.bind(this));

      this.isInitialized = true;
    }
  }

  onInputSpellcasterType() {
    const spellcasterType = this.spellcasterTypeSelect.value;
    this.spellcastingModel.spellcasterType = spellcasterType;

    const spellcasterAbility = SpellcasterTypes[spellcasterType].ability;
    inputValueAndTriggerEvent(this.spellcasterAbilitySelect, spellcasterAbility);
  }

  onInputSpellcasterAbility() {
    this.spellcastingModel.spellcasterAbility = this.spellcasterAbilitySelect.value;
  }

  onInputSpellcasterLevel() {
    this.spellcastingModel.spellcastingLevel = this.spellcasterLevelInput.valueAsInt;
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