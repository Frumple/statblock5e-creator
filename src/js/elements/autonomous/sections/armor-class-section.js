import * as sectionModule from './section.js';
import { createPropertyLine } from '../../../helpers/export-helpers.js';

export default class ArmorClassSection extends sectionModule.Section {
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
      this.editElements.useCustom.disableElementsWhenChecked(
        this.editElements.armorClass,
        this.editElements.armorType,
        this.editElements.shield);
        
      this.editElements.useCustom.enableElementsWhenChecked(
        this.editElements.customText);

      this.isInitialized = true;
    }
  }

  checkForErrors() {
    this.editElements.armorType.value = this.editElements.armorType.value.trim();
    this.editElements.customText.value = this.editElements.customText.value.trim();    

    if (this.editElements.useCustom.checked) {      
      this.editElements.customText.validate(this.errorMessages);
    } else {
      this.editElements.armorClass.validate(this.errorMessages);
    }
  }

  updateShowSection() {    
    const useCustom = this.editElements.useCustom.checked;
    const customText = this.editElements.customText.parsedText;

    if (useCustom) {
      this.showElements.text.innerHTMLSanitized = customText;
    } else {
      this.showElements.text.textContent = this.normalShowSectionText;
    }    
  }

  get normalShowSectionText() {
    const armorClass = this.editElements.armorClass.value;
    const armorType = this.editElements.armorType.value;
    const shield = this.editElements.shield.checked;

    if (armorType) {
      if (shield) {
        return `${armorClass} (${armorType}, shield)`;
      } else {
        return `${armorClass} (${armorType})`;
      }
    } else {
      if (shield) {
        return `${armorClass} (shield)`;
      } else {
        return armorClass;
      }
    }
  }

  exportToHtml() {
    const heading = 'Armor Class';
    const text = this.showElements.text.innerHTMLSanitized;
    const propertyLine = createPropertyLine(heading, text);

    return propertyLine;
  }
}

class ArmorClassShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('armor-class-text');
  }
}

class ArmorClassEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.armorClass = shadowRoot.getElementById('armor-class-input');
    this.armorType = shadowRoot.getElementById('armor-type-input');
    this.shield = shadowRoot.getElementById('shield-input');
    this.useCustom = shadowRoot.getElementById('use-custom-input');
    this.customText = shadowRoot.getElementById('custom-input');
  }

  get initiallySelectedElement() {
    if (this.useCustom.checked) {
      return this.customText;
    }
    return this.armorClass;
  }
}
