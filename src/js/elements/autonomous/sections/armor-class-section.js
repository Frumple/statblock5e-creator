import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class ArmorClassSection extends propertyLineSectionModule.PropertyLineSection {
  static get elementName() { return 'armor-class-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'armor-class-section',
      'src/html/elements/autonomous/sections/armor-class-section.html');
  }

  constructor() {
    super(ArmorClassSection.templatePaths,
          'armorClass',
          ArmorClassShowElements,
          ArmorClassEditElements);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.editElements.useCustomText.disableElementsWhenChecked(
        this.editElements.armorClass,
        this.editElements.armorType,
        this.editElements.hasShield);

      this.editElements.useCustomText.enableElementsWhenChecked(
        this.editElements.customText);

      this.isInitialized = true;
    }
  }

  checkForErrors() {
    this.editElements.armorType.value = this.editElements.armorType.value.trim();
    this.editElements.customText.value = this.editElements.customText.value.trim();

    if (this.editElements.useCustomText.checked) {
      this.editElements.customText.validate(this.errorMessages);
    } else {
      this.editElements.armorClass.validate(this.errorMessages);
    }
  }

  updateModel() {
    const armorClassModel = CurrentContext.creature.armorClass;
    armorClassModel.armorClass = this.editElements.armorClass.valueAsInt;
    armorClassModel.armorType = this.editElements.armorType.value;
    armorClassModel.hasShield = this.editElements.hasShield.checked;

    armorClassModel.useCustomText = this.editElements.useCustomText.checked;
    armorClassModel.customText = this.editElements.customText.value;
    armorClassModel.htmlCustomText = this.editElements.customText.htmlText;
  }

  updateEditModeView() {
    const armorClassModel = CurrentContext.creature.armorClass;
    this.editElements.armorClass.value = armorClassModel.armorClass;
    this.editElements.armorType.value = armorClassModel.armorType;
    this.editElements.hasShield.checked = armorClassModel.hasShield;

    this.editElements.useCustomText.checked = armorClassModel.useCustomText;
    this.editElements.customText.value = armorClassModel.customText;
    if (armorClassModel.useCustomText) {
      this.editElements.customText.parse();
      armorClassModel.htmlCustomText = this.editElements.customText.htmlText;
    }
  }

  updateShowModeView() {
    const armorClassModel = CurrentContext.creature.armorClass;
    if (CurrentContext.creature.armorClass.useCustomText) {
      this.showElements.text.innerHTMLSanitized = armorClassModel.htmlCustomText;
    } else {
      this.showElements.text.textContent = armorClassModel.nonCustomText;
    }
  }
}

class ArmorClassShowElements extends propertyLineSectionModule.PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class ArmorClassEditElements extends propertyLineSectionModule.PropertyLineEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.armorClass = shadowRoot.getElementById('armor-class-input');
    this.armorType = shadowRoot.getElementById('armor-type-input');
    this.hasShield = shadowRoot.getElementById('shield-input');
    this.useCustomText = shadowRoot.getElementById('use-custom-text-input');
    this.customText = shadowRoot.getElementById('custom-text-input');
  }

  get initiallySelectedElement() {
    if (this.useCustomText.checked) {
      return this.customText;
    }
    return this.armorClass;
  }
}
