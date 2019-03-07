import * as sectionModule from './section.js';
import Abilities from '../../../stats/abilities.js';
import SavingThrows from '../../../stats/saving-throws.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { capitalizeFirstLetter, formatModifier } from '../../../helpers/string-formatter.js';

export default class SavingThrowsSection extends sectionModule.Section {
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
      for (const key of Abilities.keys) {
        this.initializeSavingThrowElements(key);
      }

      this.isInitialized = true;
    }
  }

  initializeSavingThrowElements(key) {    
    let elements = this.editElements.savingThrow[key];

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
    let elements = this.editElements.savingThrow[key];
    SavingThrows.savingThrows[key].isEnabled = elements.enable.checked;

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
  }

  onInputSavingThrowProficiency(key) {
    SavingThrows.savingThrows[key].isProficient = this.editElements.savingThrow[key].proficient.checked;

    this.updateEditSectionModifier(key);
  }

  onInputSavingThrowOverride(key) {
    let overrideValue = this.editElements.savingThrow[key].override.valueAsInt;
    SavingThrows.savingThrows[key].override = overrideValue;

    this.updateEditSectionModifier(key);
  }

  updateModifiers(abilityName = null) {
    for (const key of SavingThrows.keys) {
      if (abilityName === null || abilityName === key) {
        this.updateEditSectionModifier(key);
      }
    }

    this.updateShowSection();
  }

  updateEditSectionModifier(key) {    
    let savingThrowModifier = SavingThrows.savingThrows[key].calculateModifier(false);
    let formattedSavingThrowModifier = formatModifier(savingThrowModifier);
    this.editElements.savingThrow[key].modifier.textContent = formattedSavingThrowModifier; 
  }

  checkForErrors() {

  }

  updateShowSection() {
    let text = '';

    for (const [key, value] of Abilities.entries) {
      let savingThrow = SavingThrows.savingThrows[key];
      let isEnabled = savingThrow.isEnabled;

      if (isEnabled) {
        let abbreviation = capitalizeFirstLetter(value.abbreviation);
        let savingThrowModifier = formatModifier(savingThrow.calculateModifier());

        if (text === '') {
          text += `${abbreviation} ${savingThrowModifier}`;
        } else {
          text += `, ${abbreviation} ${savingThrowModifier}`;
        }
      }
    }

    if (text === '') {
      this.empty = true;
    } else {
      this.empty = false;
    }

    this.showElements.text.textContent = text;
  }
}

class SavingThrowsShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('saving-throws-text');
  }
}

class SavingThrowsEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.savingThrow = {};

    for (const key of Abilities.keys) {
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
