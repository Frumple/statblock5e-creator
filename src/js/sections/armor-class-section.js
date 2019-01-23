import * as sectionModule from '/src/js/base/section.js';

export default class ArmorClassSection extends sectionModule.Section {
  static get elementName() { return 'armor-class-section'; }
  static get templatePath() { return 'src/html/sections/armor-class-section.html'; }

  constructor() {
    super(ArmorClassSection.elementName,
          ArmorClassShowElements,
          ArmorClassEditElements);

    let useCustomCheckbox = this.editElements.useCustom;
    useCustomCheckbox.disableElementsWhenChecked(
      this.editElements.armorClass,
      this.editElements.armorType);
    useCustomCheckbox.enableElementsWhenChecked(
      this.editElements.customText);
  }

  checkForErrors() {
    this.editElements.armorClass.validate(this.errorMessages);
  }

  update() {
    let armorClass = this.editElements.armorClass.value;
    let armorType = this.editElements.armorType.value;
    let useCustom = this.editElements.useCustom.checked;
    let customText = this.editElements.customText.value;

    let text = '';
    if (useCustom) {
      text = customText;
    } else {
      if (armorType) {
        text = `${armorClass} (${armorType})`;
      } else {
        text = armorClass;
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
    this.useCustom = shadowRoot.getElementById('use-custom-input');
    this.customText = shadowRoot.getElementById('custom-input');
  }
}
