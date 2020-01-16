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
    this.updateViewSavingThrow(key);
    this.updateViewText();
  }

  onInputSavingThrowProficiency(key) {
    this.updateModelSavingThrowProficiency(key);
    this.updateViewSavingThrow(key);
    this.updateViewText();
  }

  onInputSavingThrowOverride(key) {
    this.updateModelSavingThrowOverride(key);
    this.updateViewSavingThrow(key);
    this.updateViewText();
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

  updateView() {
    for (const key of savingThrowsModel.keys) {
      this.updateViewSavingThrow(key);
    }

    this.updateViewText();
  }

  updateViewSavingThrow(key) {
    const savingThrow = savingThrowsModel.savingThrows[key];
    this.editElements.savingThrow[key].modifier.textContent = savingThrow.formattedModifier;
  }

  updateViewText() {
    const text = savingThrowsModel.text;

    if (text === '') {
      this.empty = true;
    } else {
      this.empty = false;
    }

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
