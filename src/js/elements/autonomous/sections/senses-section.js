import { PropertyLineSection, PropertyLineShowElements, PropertyLineEditElements } from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class SensesSection extends PropertyLineSection {
  static get elementName() { return 'senses-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'senses-section',
      'src/html/elements/autonomous/sections/senses-section.html');
  }

  constructor() {
    super(SensesSection.templatePaths,
          'senses',
          SensesShowElements,
          SensesEditElements);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.editElements.useCustomText.disableElementsWhenChecked(
        this.editElements.blindsight,
        this.editElements.blindBeyondThisRadius,
        this.editElements.darkvision,
        this.editElements.tremorsense,
        this.editElements.truesight);

      this.editElements.useCustomText.enableElementsWhenChecked(
        this.editElements.customText);
    }
  }

  checkForErrors() {
    this.editElements.customText.value = this.editElements.customText.value.trim();

    if (this.editElements.useCustomText.checked) {
      this.editElements.customText.validate(this.errorMessages);
    }
  }

  updateModel() {
    const sensesModel = CurrentContext.creature.senses;

    sensesModel.blindsight = this.editElements.blindsight.valueAsInt;
    sensesModel.blindBeyondThisRadius = this.editElements.blindBeyondThisRadius.checked;
    sensesModel.darkvision = this.editElements.darkvision.valueAsInt;
    sensesModel.tremorsense = this.editElements.tremorsense.valueAsInt;
    sensesModel.truesight = this.editElements.truesight.valueAsInt;

    sensesModel.useCustomText = this.editElements.useCustomText.checked;
    sensesModel.customText = this.editElements.customText.value;
    sensesModel.htmlCustomText = this.editElements.customText.htmlText;
  }

  updateViewOnAttributeChange() {
    this.updateEditModeViewPassivePerception();
    this.updateShowModeView();
  }

  updateEditModeView() {
    const sensesModel = CurrentContext.creature.senses;

    this.editElements.blindsight.value = sensesModel.blindsight;
    this.editElements.blindBeyondThisRadius.checked = sensesModel.blindBeyondThisRadius;
    this.editElements.darkvision.value = sensesModel.darkvision;
    this.editElements.tremorsense.value = sensesModel.tremorsense;
    this.editElements.truesight.value = sensesModel.truesight;

    this.editElements.useCustomText.checked = sensesModel.useCustomText;
    this.editElements.customText.value = sensesModel.customText;
    if (sensesModel.useCustomText) {
      this.editElements.customText.parse();
      sensesModel.htmlCustomText = this.editElements.customText.htmlText;
    }

    this.updateEditModeViewPassivePerception();
    this.editElements.useCustomText.onInputCheckbox();
  }

  updateEditModeViewPassivePerception() {
    this.editElements.passivePerception.textContent = CurrentContext.creature.senses.passivePerception;
  }

  updateShowModeView() {
    const sensesModel = CurrentContext.creature.senses;

    if (sensesModel.useCustomText) {
      this.showElements.text.innerHTMLSanitized = sensesModel.htmlCustomText;
    } else {
      this.showElements.text.textContent = sensesModel.normalText;
    }
  }
}

class SensesShowElements extends PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class SensesEditElements extends PropertyLineEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.blindsight = shadowRoot.getElementById('blindsight-input');
    this.blindBeyondThisRadius = shadowRoot.getElementById('blind-beyond-this-radius-input');
    this.darkvision = shadowRoot.getElementById('darkvision-input');
    this.tremorsense = shadowRoot.getElementById('tremorsense-input');
    this.truesight = shadowRoot.getElementById('truesight-input');
    this.passivePerception = shadowRoot.getElementById('passive-perception-value');
    this.useCustomText = shadowRoot.getElementById('use-custom-text-input');
    this.customText = shadowRoot.getElementById('custom-text-input');
  }

  get initiallySelectedElement() {
    if (this.useCustomText.checked) {
      return this.customText;
    }
    return this.blindsight;
  }
}
