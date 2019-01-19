import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';
import * as sectionModule from '/src/js/base/section.js';

export default class ArmorClassSection extends sectionModule.Section {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'armor-class-section',
      'src/html/sections/armor-class-section.html');
  }

  constructor(element) {
    super(element,
          new ArmorClassShowElements(element.shadowRoot),
          new ArmorClassEditElements(element.shadowRoot));

    let useCustomCheckbox = this.editElements.use_custom;
    useCustomCheckbox.disableElementWhenChecked(this.editElements.armor_class);
    useCustomCheckbox.disableElementWhenChecked(this.editElements.armor_type);
    useCustomCheckbox.enableElementWhenChecked(this.editElements.custom_text);
  }

  checkForErrors() {
    this.editElements.armor_class.validate(this.error_messages);
  }

  update() {
    let armorClass = this.editElements.armor_class.value;
    let armorType = this.editElements.armor_type.value;
    let useCustom = this.editElements.use_custom.checked;
    let customText = this.editElements.custom_text.value;

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
    this.armor_class = shadowRoot.getElementById('armor-class-input');
    this.armor_type = shadowRoot.getElementById('armor-type-input');
    this.use_custom = shadowRoot.getElementById('use-custom-input');
    this.custom_text = shadowRoot.getElementById('custom-input');
  }
}
