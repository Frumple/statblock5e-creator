import * as sectionModule from '/src/js/base/section.js';

export default class SensesSection extends sectionModule.Section {
  static get elementName() { return 'senses-section'; }
  static get templatePath() { return 'src/html/sections/senses-section.html'; }

  constructor() {
    super(SensesSection.elementName,
          SensesShowElements,
          SensesEditElements);

    let useCustomCheckbox = this.editElements.useCustom;
    useCustomCheckbox.disableElementsWhenChecked(
      this.editElements.blindsight,
      this.editElements.darkvision,
      this.editElements.tremorsense,
      this.editElements.truesight);
    useCustomCheckbox.enableElementsWhenChecked(
      this.editElements.customText);
  }

  get initialSelectedElement() {
    return this.editElements.blindsight;
  }

  checkForErrors() {

  }

  update() {
    let blindsightRange = this.editElements.blindsight.value;
    let darkvisionRange = this.editElements.darkvision.value;
    let tremorsenseRange = this.editElements.tremorsense.value;
    let truesightRange = this.editElements.truesight.value;
    let passivePerception = this.editElements.passivePerception.textContent;
    let useCustom = this.editElements.useCustom.checked;
    let customText = this.editElements.customText.value;

    let text = '';

    if (useCustom) {
      text = customText;
    } else {
      const unit = 'ft.';
      let comma = '';

      if (blindsightRange) {
        text += `blindsight ${blindsightRange} ${unit}`;
        comma = ', ';
      }
      if (darkvisionRange) {
        text += `${comma}darkvision ${darkvisionRange} ${unit}`;
        comma = ', ';
      }
      if (tremorsenseRange) {
        text += `${comma}tremorsense ${tremorsenseRange} ${unit}`;
        comma = ', ';
      }
      if (truesightRange) {
        text += `${comma}truesight ${truesightRange} ${unit}`;
        comma = ', ';
      }

      text += `${comma}passive Perception ${passivePerception}`;
    }

    this.showElements.text.textContent = text;
  }
}


class SensesShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('senses-text');
  }
}

class SensesEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.blindsight = shadowRoot.getElementById('blindsight-input');
    this.darkvision = shadowRoot.getElementById('darkvision-input');
    this.tremorsense = shadowRoot.getElementById('tremorsense-input');
    this.truesight = shadowRoot.getElementById('truesight-input');
    this.passivePerception = shadowRoot.getElementById('passive-perception-value');
    this.useCustom = shadowRoot.getElementById('use-custom-input');
    this.customText = shadowRoot.getElementById('custom-input');
  }
}
