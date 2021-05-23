import CustomDialog from './custom-dialog.js';

import SpellcasterTypes from '../../../data/spellcaster-types.js';

import Spellcasting from '../../../models/spellcasting.js';

import { focusAndSelectElement } from '../../../helpers/element-helpers.js';
import { getSpellDescription } from '../../../helpers/spell-helpers.js';

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

    this.verbalComponentInput = this.shadowRoot.getElementById('verbal-component-input');
    this.somaticComponentInput = this.shadowRoot.getElementById('somatic-component-input');
    this.materialComponentInput = this.shadowRoot.getElementById('material-component-input');

    this.spellCategoryBoxes = [];

    const cantripsAtWillCategoryBox = this.shadowRoot.getElementById('cantrips-at-will-spell-category-box');
    this.spellCategoryBoxes.push(cantripsAtWillCategoryBox);

    for (let spellLevel = 1; spellLevel <= 9; spellLevel++) {
      const spellCategoryBox = this.shadowRoot.getElementById(`level-${spellLevel}-spell-category-box`);
      this.spellCategoryBoxes.push(spellCategoryBox);
    }

    this.previewNameElement = this.shadowRoot.getElementById('preview-name');
    this.previewTextElement = this.shadowRoot.getElementById('preview-text');

    this.cantripCountLabel = this.shadowRoot.getElementById('cantrip-count-label');
    this.spellCountLabel = this.shadowRoot.getElementById('spell-count-label');

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

      this.addEventListener('propertyListChanged', this.onPropertyListChanged.bind(this));

      this.spellcasterTypeSelect.addEventListener('input', this.onInputSpellcasterType.bind(this));
      this.spellcasterAbilitySelect.addEventListener('input', this.onInputSpellcasterAbility.bind(this));
      this.spellcasterLevelInput.addEventListener('input', this.onInputSpellcasterLevel.bind(this));

      this.verbalComponentInput.addEventListener('input', this.onInputVerbalComponent.bind(this));
      this.somaticComponentInput.addEventListener('input', this.onInputSomaticComponent.bind(this));
      this.materialComponentInput.addEventListener('input', this.onInputMaterialComponent.bind(this));

      this.cancelButton.addEventListener('click', this.onClickCloseButton.bind(this));
      this.resetButton.addEventListener('click', this.onClickResetButton.bind(this));
      this.generateSpellcastingButton.addEventListener('click', this.onClickGenerateSpellcastingButton.bind(this));

      this.isInitialized = true;
    }
  }

  onPropertyListChanged() {
    this.updateModelSpells();
    this.updateDisplay();
  }

  onInputSpellcasterType() {
    const spellcasterType = this.spellcasterTypeSelect.value;
    this.spellcastingModel.spellcasterType = spellcasterType;
    this.spellcastingModel.spellcasterAbility = SpellcasterTypes[spellcasterType].ability;

    this.spellcastingModel.requiresVerbalComponents = true;
    this.spellcastingModel.requiresSomaticComponents = true;
    // Special case: Material components are not required by default for innate spellcasters
    this.spellcastingModel.requiresMaterialComponents = spellcasterType !== 'innate';

    this.spellcastingModel.clearAllSpells();

    this.updateDataLists();
    this.updateControls();
  }

  onInputSpellcasterAbility() {
    this.spellcastingModel.spellcasterAbility = this.spellcasterAbilitySelect.value;
    this.updateDisplay();
  }

  onInputSpellcasterLevel() {
    this.spellcastingModel.spellcasterLevel = this.spellcasterLevelInput.valueAsInt;
    this.updateControls();
  }

  onInputVerbalComponent() {
    this.spellcastingModel.requiresVerbalComponents = this.verbalComponentInput.checked;
    this.updateDisplay();
  }

  onInputSomaticComponent() {
    this.spellcastingModel.requiresSomaticComponents = this.somaticComponentInput.checked;
    this.updateDisplay();
  }

  onInputMaterialComponent() {
    this.spellcastingModel.requiresMaterialComponents = this.materialComponentInput.checked;
    this.updateDisplay();
  }

  onClickResetButton() {
    this.reset();
  }

  onClickGenerateSpellcastingButton() {
    this.generateSpellcasting();
  }

  get previewText() {
    return this.previewTextElement.innerHTMLSanitized;
  }

  launch() {
    this.showModal();
    this.updateDataLists();
    this.updateControls();
    focusAndSelectElement(this.spellcasterTypeSelect);
  }

  reset() {
    this.spellcastingModel.reset();
    this.updateControls();
    focusAndSelectElement(this.spellcasterTypeSelect);
  }

  checkForErrors() {
    this.spellcasterLevelInput.validate(this.errorMessages);
  }

  generateSpellcasting() {
    this.errorMessages.clear();
    this.checkForErrors();
    if (this.errorMessages.any) {
      this.errorMessages.focusOnFirstErrorField();
      return;
    }

    const generateSpellcastingEvent = new CustomEvent('generateSpellcasting', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.spellcastingModel.blockName,
        text: this.spellcastingModel.generatedText
      }
    });
    this.dispatchEvent(generateSpellcastingEvent);

    this.closeModal();
    this.reset();
  }

  updateModelSpells() {
    for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
      const spellCategory = this.spellcastingModel.spellCategories[spellLevel];
      const spellCategoryBox = this.spellCategoryBoxes[spellLevel];

      spellCategory.spells = spellCategoryBox.propertyList.itemsAsText;
    }
  }

  updateControls() {
    this.spellcasterTypeSelect.value = this.spellcastingModel.spellcasterType;
    this.spellcasterAbilitySelect.value = this.spellcastingModel.spellcasterAbility;
    this.spellcasterLevelInput.value = this.spellcastingModel.spellcasterLevel;

    this.verbalComponentInput.checked = this.spellcastingModel.requiresVerbalComponents;
    this.somaticComponentInput.checked = this.spellcastingModel.requiresSomaticComponents;
    this.materialComponentInput.checked = this.spellcastingModel.requiresMaterialComponents;

    for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
      const spellCategory = this.spellcastingModel.spellCategories[spellLevel];
      const spellCategoryBox = this.spellCategoryBoxes[spellLevel];

      spellCategoryBox.disabled = ! spellCategory.isEnabled;
      spellCategoryBox.heading.textContent = spellCategory.title;
      spellCategoryBox.propertyList.setItems(spellCategory.spells);
    }

    this.updateDisplay();
  }

  updateDisplay() {
    this.updatePreview();
    this.updateStatistics();
  }

  updatePreview() {
    this.previewNameElement.textContent = (this.spellcastingModel.spellcasterType === 'innate') ? 'Innate Spellcasting' : 'Spellcasting';

    const generatedText = this.spellcastingModel.generatedText;
    this.previewTextElement.innerHTMLSanitized = this.spellcastingModel.renderText(generatedText);
  }

  updateStatistics() {
    let cantripCountText = '';
    let spellCountText = '';

    if (this.spellcastingModel.spellcasterType === 'innate') {
      cantripCountText = '';
      spellCountText = `# of Spells: ${this.spellcastingModel.currentSpellCount}`;
    } else if (this.spellcastingModel.spellcasterType === 'generic') {
      cantripCountText = `# of Cantrips: ${this.spellcastingModel.currentCantripCount}`;
      spellCountText = `# of Spells: ${this.spellcastingModel.currentSpellCount}`;
    } else {
      cantripCountText = `# of Known Cantrips: ${this.spellcastingModel.currentCantripCount} / ${this.spellcastingModel.knownCantripCount}`;
      spellCountText = `# of Prepared Spells: ${this.spellcastingModel.currentSpellCount} / ${this.spellcastingModel.preparedSpellCount}`;
    }

    this.cantripCountLabel.textContent = cantripCountText;
    this.spellCountLabel.textContent = spellCountText;
  }

  updateDataLists() {
    for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
      const spellCategory = this.spellcastingModel.spellCategories[spellLevel];
      const spellCategoryBox = this.spellCategoryBoxes[spellLevel];

      const spells = spellCategory.availableSpells;

      const dataListOptions = spells.map(spell => {
        return {
          text: getSpellDescription(spell),
          value: spell.name
        };
      });

      spellCategoryBox.propertyList.dataListOptions = dataListOptions;
    }
  }
}