import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

export default class SavingThrowsSection extends propertyLineSectionModule.PropertyLineSection {
  static get elementName() { return 'saving-throws-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'saving-throws-section',
      'src/html/elements/autonomous/sections/saving-throws-section.html');
  }

  constructor() {
    super(SavingThrowsSection.templatePaths,
          'savingThrows',
          SavingThrowsShowElements,
          SavingThrowsEditElements);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      for (const key of CurrentContext.creature.savingThrows.keys) {
        this.initializeSavingThrowElements(key);
      }

      this.isInitialized = true;
    }
  }

  initializeSavingThrowElements(key) {
    const elements = this.editElements.savingThrow[key];

    elements.enable.enableElementsWhenChecked(
      elements.label,
      elements.modifier,
      elements.proficient,
      elements.override
    );

    elements.enable.addEventListener('input', this.onInputSavingThrowEnabled.bind(this, key));
    elements.proficient.addEventListener('input', this.onInputSavingThrowProficiency.bind(this, key));
    elements.override.addEventListener('input', this.onInputSavingThrowOverride.bind(this, key));
  }

  onInputSavingThrowEnabled(key) {
    const elements = this.editElements.savingThrow[key];

    if (elements.enable.checked) {
      inputValueAndTriggerEvent(elements.proficient, true);
    } else {
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
    for (const key of CurrentContext.creature.savingThrows.keys) {
      this.updateModelSavingThrowEnabled(key);
      this.updateModelSavingThrowProficiency(key);
      this.updateModelSavingThrowOverride(key);
    }
  }

  updateModelSavingThrowEnabled(key) {
    CurrentContext.creature.savingThrows.savingThrows[key].isEnabled = this.editElements.savingThrow[key].enable.checked;
  }

  updateModelSavingThrowProficiency(key) {
    CurrentContext.creature.savingThrows.savingThrows[key].isProficient = this.editElements.savingThrow[key].proficient.checked;
  }

  updateModelSavingThrowOverride(key) {
    CurrentContext.creature.savingThrows.savingThrows[key].override = this.editElements.savingThrow[key].override.valueAsInt;
  }

  updateViewOnAttributeChange(abilityName) {
    if (abilityName) {
      this.updateEditModeViewSavingThrowModifier(abilityName);
    } else {
      for (const key of CurrentContext.creature.savingThrows.keys) {
        this.updateEditModeViewSavingThrowModifier(key);
      }
    }
    this.updateShowModeView();
  }

  updateEditModeView() {
    for (const key of CurrentContext.creature.savingThrows.keys) {
      this.updateEditModeViewSavingThrow(key);
      this.editElements.savingThrow[key].enable.onInputCheckbox();
    }
  }

  updateEditModeViewSavingThrow(key) {
    const savingThrowElements = this.editElements.savingThrow[key];
    const savingThrowsModel = CurrentContext.creature.savingThrows;

    savingThrowElements.enable.checked = savingThrowsModel.savingThrows[key].isEnabled;
    savingThrowElements.modifier.textContent = savingThrowsModel.savingThrows[key].formattedModifier;
    savingThrowElements.proficient.checked = savingThrowsModel.savingThrows[key].isProficient;
    savingThrowElements.override.value = savingThrowsModel.savingThrows[key].override;
  }

  updateEditModeViewSavingThrowModifier(key) {
    this.editElements.savingThrow[key].modifier.textContent = CurrentContext.creature.savingThrows.savingThrows[key].formattedModifier;
  }

  updateShowModeView() {
    const text = CurrentContext.creature.savingThrows.text;
    this.empty = (text === '');
    this.showElements.text.textContent = text;
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

    for (const key of CurrentContext.creature.savingThrows.keys) {
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
