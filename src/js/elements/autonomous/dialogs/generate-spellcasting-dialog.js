import CustomDialog from './custom-dialog.js';

import SpellcasterTypes from '../../../data/spellcaster-types.js';

import Spellcasting from '../../../models/spellcasting.js';

import { focusAndSelectElement, inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { formatSpellSlotQuantity } from '../../../helpers/string-formatter.js';

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
    this.update();
  }

  onInputSpellcasterLevel() {
    this.spellcastingModel.spellcasterLevel = this.spellcasterLevelInput.valueAsInt;
    this.update();
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
    if (this.spellcastingModel.spellcasterType === 'innate') {
      this.spellCategoryBoxes[0].heading.textContent = 'At-will';
      this.spellCategoryBoxes[1].heading.textContent = '3/day';
      this.spellCategoryBoxes[2].heading.textContent = '2/day';
      this.spellCategoryBoxes[3].heading.textContent = '1/day';

      this.spellCategoryBoxes[0].disabled = false;
      this.spellCategoryBoxes[1].disabled = false;
      this.spellCategoryBoxes[2].disabled = false;
      this.spellCategoryBoxes[3].disabled = false;

      for (let spellLevel = 4; spellLevel <= 9; spellLevel++) {
        this.spellCategoryBoxes[spellLevel].disabled = true;
        this.spellCategoryBoxes[spellLevel].heading.textContent = '';
      }
    } else {
      this.spellCategoryBoxes[0].heading.textContent = 'Cantrips';

      const spellSlots = SpellcasterTypes[this.spellcastingModel.spellcasterType].levels[this.spellcastingModel.spellcasterLevel].spellSlots;

      for (let spellLevel = 1; spellLevel <= 9; spellLevel++) {
        const spellCategoryBox = this.spellCategoryBoxes[spellLevel];

        if (spellLevel <= spellSlots.length) {
          const slotQuantity = spellSlots[spellLevel - 1];
          const formattedSlotQuantity = formatSpellSlotQuantity(slotQuantity);

          spellCategoryBox.disabled = false;
          spellCategoryBox.heading.textContent = `Level ${spellLevel} (${formattedSlotQuantity})`;
        } else {
          spellCategoryBox.disabled = true;
          spellCategoryBox.heading.textContent = '';
        }
      }
    }
  }
}