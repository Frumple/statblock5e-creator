import * as propertyLineSectionModule from './property-line-section.js';
import ArmorClass from '../../../models/armor-class.js';

export default class ArmorClassSection extends propertyLineSectionModule.PropertyLineSection {
  static get elementName() { return 'armor-class-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'armor-class-section',
      'src/html/elements/autonomous/sections/armor-class-section.html');
  }

  constructor() {
    super(ArmorClassSection.templatePaths,
          ArmorClassShowElements,
          ArmorClassEditElements);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
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
    ArmorClass.armorClass = this.editElements.armorClass.valueAsInt;
    ArmorClass.armorType = this.editElements.armorType.value;
    ArmorClass.hasShield = this.editElements.hasShield.checked;

    ArmorClass.useCustomText = this.editElements.useCustomText.checked;
    ArmorClass.originalCustomText = this.editElements.customText.value;
    ArmorClass.parsedCustomText = this.editElements.customText.parsedText;
  }

  updateView() {    
    if (ArmorClass.useCustomText) {
      this.showElements.text.innerHTMLSanitized = ArmorClass.parsedCustomText;
    } else {
      this.showElements.text.textContent = ArmorClass.nonCustomText;
    }    
  }

  exportToHtml() {
    return ArmorClass.toHtml();
  }

  exportToHomebrewery() {
    return ArmorClass.toHomebrewery();
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
