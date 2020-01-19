import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const savingThrowsModel = CurrentContext.creature.savingThrows;

export default class SavingThrowsSection extends propertyLineSectionModule.PropertyLineSection {
  static get elementName() { return 'saving-throws-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'saving-throws-section',
      'src/html/elements/autonomous/sections/saving-throws-section.html');
  }

  constructor() {
    super(SavingThrowsSection.templatePaths,
          SavingThrowsShowElements,
          SavingThrowsEditElements);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      for (const key of savingThrowsModel.keys) {
        this.initializeSavingThrowElements(key);
      }

      this.isInitialized = true;
    }
  }

  initializeSavingThrowElements(key) {
    const elements = this.editElements.savingThrow[key];

    elements.enable.enableElementsWhenChecked(
      elements.proficient,
      elements.override
    );

    elements.enable.addEventListener('input', this.onInputSavingThrowEnabled.bind(this, key));
    elements.proficient.addEventListener('input', this.onInputSavingThrowProficiency.bind(this, key));
    elements.override.addEventListener('input', this.onInputSavingThrowOverride.bind(this, key));
  }

  onInputSavingThrowEnabled(key) {
    const labelDisabledClass = 'section__label_disabled';
    const elements = this.editElements.savingThrow[key];

    if (elements.enable.checked) {
      elements.label.classList.remove(labelDisabledClass);
      elements.modifier.classList.remove(labelDisabledClass);

      inputValueAndTriggerEvent(elements.proficient, true);
    } else {
      elements.label.classList.add(labelDisabledClass);
      elements.modifier.classList.add(labelDisabledClass);

      inputValueAndTriggerEvent(elements.proficient, false);
      inputValueAndTriggerEvent(elements.override, '');
    }

    this.updateModelSavingThrowEnabled(key);
    this.updateEditModeViewSavingThrowModifier(key);
    this.updateShowModeView();
  }

  onInputSavingThrowProficiency(key) {
    this.updateModelSavingThrowProficiency(key);
    this.updateEditModeViewSavingThrowModifier(key);
    this.updateShowModeView();
  }

  onInputSavingThrowOverride(key) {
    this.updateModelSavingThrowOverride(key);
    this.updateEditModeViewSavingThrowModifier(key);
    this.updateShowModeView();
  }

  checkForErrors() {
    return;
  }

  updateModel() {
    for (const key of savingThrowsModel.keys) {
      this.updateModelSavingThrowEnabled(key);
      this.updateModelSavingThrowProficiency(key);
      this.updateModelSavingThrowOverride(key);
    }
  }

  updateModelSavingThrowEnabled(key) {
    savingThrowsModel.savingThrows[key].isEnabled = this.editElements.savingThrow[key].enable.checked;
  }

  updateModelSavingThrowProficiency(key) {
    savingThrowsModel.savingThrows[key].isProficient = this.editElements.savingThrow[key].proficient.checked;
  }

  updateModelSavingThrowOverride(key) {
    savingThrowsModel.savingThrows[key].override = this.editElements.savingThrow[key].override.valueAsInt;
  }

  updateViewOnAttributeChange(abilityName) {
    if (abilityName) {
      this.updateEditModeViewSavingThrowModifier(abilityName);
    } else {
      for (const key of savingThrowsModel.keys) {
        this.updateEditModeViewSavingThrowModifier(key);
      }
    }
    this.updateShowModeView();
  }

  updateEditModeView() {
    for (const key of savingThrowsModel.keys) {
      this.updateEditModeViewSavingThrow(key);
    }
  }

  updateEditModeViewSavingThrow(key) {
    const savingThrowElements = this.editElements.savingThrow[key];
    savingThrowElements.enable.checked = savingThrowsModel.savingThrows[key].isEnabled;
    savingThrowElements.modifier.textContent = savingThrowsModel.savingThrows[key].formattedModifier;
    savingThrowElements.proficient.checked = savingThrowsModel.savingThrows[key].isProficient;
    savingThrowElements.override.value = savingThrowsModel.savingThrows[key].override;
  }

  updateEditModeViewSavingThrowModifier(key) {
    this.editElements.savingThrow[key].modifier.textContent = savingThrowsModel.savingThrows[key].formattedModifier;
  }

  updateShowModeView() {
    const text = savingThrowsModel.text;
    this.empty = (text === '');
    this.showElements.text.textContent = text;
  }

  exportToJson() {
    return savingThrowsModel.toJson();
  }

  exportToHtml() {
    return savingThrowsModel.toHtml();
  }

  exportToHomebrewery() {
    return savingThrowsModel.toHomebrewery();
  }
}

class SavingThrowsShowElements extends propertyLineSectionModule.PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class SavingThrowsEditElements extends propertyLineSectionModule.PropertyLineEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.savingThrow = {};

    for (const key of savingThrowsModel.keys) {
      this.savingThrow[key] = {
        enable: shadowRoot.getElementById(`${key}-enable`),
        label: shadowRoot.getElementById(`${key}-label`),
        modifier: shadowRoot.getElementById(`${key}-saving-throw-modifier`),
        proficient: shadowRoot.getElementById(`${key}-proficient`),
        override: shadowRoot.getElementById(`${key}-override`)
      };
    }
  }

  get initiallySelectedElement() {
    return this.savingThrow['strength'].enable;
  }
}
