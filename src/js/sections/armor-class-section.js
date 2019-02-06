import * as sectionModule from '/src/js/base/section.js';
import validateTextInput from '/src/js/helpers/text-input-validator.js';
import validateIntegerInput from '/src/js/helpers/integer-input-validator.js';

export default class ArmorClassSection extends sectionModule.Section {
  static get elementName() { return 'armor-class-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'armor-class-section',
      'src/html/sections/armor-class-section.html');
  }

  constructor() {
    super(ArmorClassSection.templatePaths,
          ArmorClassShowElements,
          ArmorClassEditElements);
    this.isInitialized = false;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      let useCustomCheckbox = this.editElements.useCustom;
      useCustomCheckbox.disableElementsWhenChecked(
        this.editElements.armorClass,
        this.editElements.armorType,
        this.editElements.shield);
      useCustomCheckbox.enableElementsWhenChecked(
        this.editElements.customText);

      this.isInitialized = true;
    }
  }

  checkForErrors() {
    this.editElements.armorType.value = this.editElements.armorType.value.trim();
    this.editElements.customText.value = this.editElements.customText.value.trim();

    if (this.editElements.useCustom.checked) {
      validateTextInput(this.editElements.customText, this.errorMessages);
    } else {
      validateIntegerInput(this.editElements.armorClass, this.errorMessages);
    }
  }

  updateShowSection() {
    let armorClass = this.editElements.armorClass.value;
    let armorType = this.editElements.armorType.value;
    let shield = this.editElements.shield.checked;
    let useCustom = this.editElements.useCustom.checked;
    let customText = this.editElements.customText.value;

    let text = '';
    if (useCustom) {
      text = customText;
    } else {
      if (armorType) {
        if (shield) {
          text = `${armorClass} (${armorType}, shield)`;
        } else {
          text = `${armorClass} (${armorType})`;
        }
      } else {
        if (shield) {
          text = `${armorClass} (shield)`;
        } else {
          text = armorClass;
        }
      }
    }
    this.showElements.text.textContent = text;
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
