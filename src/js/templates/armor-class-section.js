import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import EnableDisableElementsCheckbox from '/src/js/helpers/enable-disable-elements-checkbox.js';
import * as sectionModule from '/src/js/helpers/section.js';

export class ArmorClassSection extends sectionModule.Section {
  constructor(shadowRoot) {
    super(shadowRoot,
          new ArmorClassShowElements(shadowRoot),
          new ArmorClassEditElements(shadowRoot));

    let checkbox = new EnableDisableElementsCheckbox(this.editElements.use_custom);
    checkbox.disableElementWhenChecked(this.editElements.armor_class);
    checkbox.disableElementWhenChecked(this.editElements.armor_type);
    checkbox.enableElementWhenChecked(this.editElements.custom_text);
  }

  save() {
    let armorClass = this.editElements.armor_class.value;
    let armorType = this.editElements.armor_type.value;
    let useCustom = this.editElements.use_custom.checked;
    let customText = this.editElements.custom_text.value;

    let text = '';
    if (useCustom) {
      text = customText;
    } else {
      text = armorClass;
      if (armorType) {
        text += ' (' + armorType + ')';
      }
    }
    this.showElements.text.textContent = text;
    this.switchToShowMode();
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

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'armor-class-section',
    'src/templates/armor-class-section.html');
}
