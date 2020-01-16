import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';

const sensesModel = CurrentContext.creature.senses;

export default class SensesSection extends propertyLineSectionModule.PropertyLineSection {
  static get elementName() { return 'senses-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'senses-section',
      'src/html/elements/autonomous/sections/senses-section.html');
  }

  constructor() {
    super(SensesSection.templatePaths,
          SensesShowElements,
          SensesEditElements);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.editElements.useCustomText.disableElementsWhenChecked(
        this.editElements.blindsight,
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
    sensesModel.blindsight = this.editElements.blindsight.valueAsInt;
    sensesModel.darkvision = this.editElements.darkvision.valueAsInt;
    sensesModel.tremorsense = this.editElements.tremorsense.valueAsInt;
    sensesModel.truesight = this.editElements.truesight.valueAsInt;

    sensesModel.useCustomText = this.editElements.useCustomText.checked;
    sensesModel.originalCustomText = this.editElements.customText.value;
    sensesModel.htmlCustomText = this.editElements.customText.htmlText;
  }

  updateView() {
    this.editElements.passivePerception.textContent = sensesModel.passivePerception;

    if (sensesModel.useCustomText) {
      this.showElements.text.innerHTMLSanitized = sensesModel.htmlCustomText;
    } else {
      this.showElements.text.textContent = sensesModel.nonCustomText;
    }
  }

  exportToJson() {
    return sensesModel.toJson();
  }

  exportToHtml() {
    return sensesModel.toHtml();
  }

  exportToHomebrewery() {
    return sensesModel.toHomebrewery();
  }
}

class SensesShowElements extends propertyLineSectionModule.PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class SensesEditElements extends propertyLineSectionModule.PropertyLineEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.blindsight = shadowRoot.getElementById('blindsight-input');
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
