import * as sectionModule from './section.js';
import Skills from '../../../stats/skills.js';

export default class SensesSection extends sectionModule.Section {
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
      this.editElements.useCustom.disableElementsWhenChecked(
        this.editElements.blindsight,
        this.editElements.darkvision,
        this.editElements.tremorsense,
        this.editElements.truesight);

      this.editElements.useCustom.enableElementsWhenChecked(
        this.editElements.customText);
    }
  }

  updatePassivePerception() {
    let passivePerception = Skills.skills['perception'].passiveScore;
    this.editElements.passivePerception.textContent = passivePerception;    

    this.updateShowSection();
  }

  checkForErrors() {
    this.editElements.customText.value = this.editElements.customText.value.trim();

    if (this.editElements.useCustom.checked) {
      this.editElements.customText.validate(this.errorMessages);
    }
  }

  updateShowSection() {
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

  get initiallySelectedElement() {
    if (this.useCustom.checked) {
      return this.customText;
    }
    return this.blindsight;
  }
}
