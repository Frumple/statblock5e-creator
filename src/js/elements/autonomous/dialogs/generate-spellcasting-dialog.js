import CustomDialog from './custom-dialog.js';
import SpellCategoryBox from '../spell-category-box.js';

import SpellcasterTypes from '../../../data/spellcaster-types.js';
import Spells from '../../../data/spells.js';

import Spellcasting from '../../../models/spellcasting.js';

import { focusAndSelectElement } from '../../../helpers/element-helpers.js';
import { getSpellDescription } from '../../../helpers/spell-helpers.js';
import isRunningInJsDom from '../../../helpers/is-running-in-jsdom.js';

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

    if (isRunningInJsDom) {
      for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
        const spellCategoryBox = new SpellCategoryBox(this);
        spellCategoryBox.connect();
        this.spellCategoryBoxes.push(spellCategoryBox);
      }
    } else {
      const cantripsAtWillCategoryBox = this.shadowRoot.getElementById('cantrips-at-will-spell-category-box');
      this.spellCategoryBoxes.push(cantripsAtWillCategoryBox);

      for (let spellLevel = 1; spellLevel <= 9; spellLevel++) {
        const spellCategoryBox = this.shadowRoot.getElementById(`level-${spellLevel}-spell-category-box`);
        this.spellCategoryBoxes.push(spellCategoryBox);
      }
    }

    this.previewNameElement = this.shadowRoot.getElementById('preview-name');
    this.previewTextElement = this.shadowRoot.getElementById('preview-text');

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
    this.updatePreview();
  }

  onInputSpellcasterType() {
    const spellcasterType = this.spellcasterTypeSelect.value;
    this.spellcastingModel.spellcasterType = spellcasterType;
    this.spellcastingModel.spellcasterAbility = SpellcasterTypes[spellcasterType].ability;
    this.spellcastingModel.clearAllSpells();

    this.updateDataLists();

    this.updateControls();
  }

  onInputSpellcasterAbility() {
    this.spellcastingModel.spellcasterAbility = this.spellcasterAbilitySelect.value;
    this.updatePreview();
  }

  onInputSpellcasterLevel() {
    this.spellcastingModel.spellcasterLevel = this.spellcasterLevelInput.valueAsInt;
    this.updateControls();
  }

  onInputVerbalComponent() {
    this.spellcastingModel.requiresVerbalComponents = this.verbalComponentInput.checked;
    this.updatePreview();
  }

  onInputSomaticComponent() {
    this.spellcastingModel.requiresSomaticComponents = this.somaticComponentInput.checked;
    this.updatePreview();
  }

  onInputMaterialComponent() {
    this.spellcastingModel.requiresMaterialComponents = this.materialComponentInput.checked;
    this.updatePreview();
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

    this.updatePreview();
  }

  updatePreview() {
    this.previewNameElement.textContent = (this.spellcastingModel.spellcasterType === 'innate') ? 'Innate Spellcasting' : 'Spellcasting';

    const generatedText = this.spellcastingModel.generatedText;
    this.previewTextElement.innerHTMLSanitized = this.spellcastingModel.renderText(generatedText);
  }

  updateDataLists() {
    for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
      const spellCategoryBox = this.spellCategoryBoxes[spellLevel];
      const spellcasterType = this.spellcastingModel.spellcasterType;

      let spells = Spells;

      if (spellcasterType !== 'innate') {
        spells = spells.filter(spell => spell.level === spellLevel);

        if (spellcasterType !== 'generic') {
          spells = spells.filter(spell => spell.classes.includes(spellcasterType));
        }
      }

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