import * as sectionModule from '/src/js/base/section.js';

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

    let useCustomCheckbox = this.editElements.useCustom;
    useCustomCheckbox.disableElementsWhenChecked(
      this.editElements.armorClass,
      this.editElements.armorType);
    useCustomCheckbox.enableElementsWhenChecked(
      this.editElements.customText);
  }

  get initialSelectedEditElement() {
    if (this.editElements.useCustom.checked) {
      return this.editElements.customText;
    }
    return this.editElements.armorClass;
  }

  checkForErrors() {
    this.editElements.armorType.trimWhitespace();
    this.editElements.customText.trimWhitespace();

    this.editElements.armorClass.validate(this.errorMessages);
    if (this.editElements.useCustom.checked) {
      this.editElements.customText.validate(this.errorMessages);
    }
  }

  update() {
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
}
