import * as sectionModule from '/src/js/base/section.js';
import Abilities from '/src/js/stats/abilities.js';
import SavingThrows from '/src/js/stats/saving-throws.js';
import { capitalizeFirstLetter } from '/src/js/helpers/string-formatter.js';
import { formatModifier } from '/src/js/helpers/string-formatter.js';

export default class SavingThrowsSection extends sectionModule.Section {
  static get elementName() { return 'saving-throws-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'saving-throws-section',
      'src/html/sections/saving-throws-section.html');
  }

  constructor() {
    super(SavingThrowsSection.templatePaths,
          SavingThrowsShowElements,
          SavingThrowsEditElements);

    for (const key of Abilities.keys) {
      this.initializeSavingThrowElements(key);
    }

    this.mode = 'hidden';
    this.empty = true;
  }

  initializeSavingThrowElements(key) {
    const labelDisabledClass = 'section__label_disabled';
    let enableElement = this.editElements.enable[key];
    let labelElement = this.editElements.label[key];
    let modifierElement = this.editElements.savingThrowModifier[key];
    let isProficientElement = this.editElements.proficient[key];
    let overrideElement = this.editElements.override[key];

    enableElement.enableElementsWhenChecked(
      isProficientElement,
      overrideElement
    );

    enableElement.addEventListener('input', () => {
      SavingThrows.savingThrows[key].isEnabled = enableElement.checked;

      if (enableElement.checked) {
        labelElement.classList.remove(labelDisabledClass);
        modifierElement.classList.remove(labelDisabledClass);
      } else {
        labelElement.classList.add(labelDisabledClass);
        modifierElement.classList.add(labelDisabledClass);
      }
    });

    isProficientElement.addEventListener('input', () => {
      SavingThrows.savingThrows[key].isProficient = isProficientElement.checked;

      this.updateEditSectionModifier(key);
    });

    overrideElement.addEventListener('input', () => {
      let overrideValue = parseInt(overrideElement.value, 10);
      SavingThrows.savingThrows[key].override = overrideValue;

      this.updateEditSectionModifier(key);
    });
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
    this.editElements.savingThrowModifier[key].textContent = formattedSavingThrowModifier; 
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

    this.enable = {};
    this.label = {};
    this.savingThrowModifier = {};
    this.proficient = {};
    this.override = {};

    for (const key of Abilities.keys) {
      this.enable[key] = shadowRoot.getElementById(`${key}-enable`);
      this.label[key] = shadowRoot.getElementById(`${key}-label`);
      this.savingThrowModifier[key] = shadowRoot.getElementById(`${key}-saving-throw-modifier`);
      this.proficient[key] = shadowRoot.getElementById(`${key}-proficient`);
      this.override[key] = shadowRoot.getElementById(`${key}-override`);
    }
  }

  get initiallySelectedElement() {
    return this.enable.strength;
  }
}
