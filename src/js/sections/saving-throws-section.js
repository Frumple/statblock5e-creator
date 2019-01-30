import * as sectionModule from '/src/js/base/section.js';
import Abilities from '/src/js/helpers/abilities.js';
import { capitalizeFirstLetter } from '/src/js/helpers/string-format.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

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
      if (enableElement.checked) {
        labelElement.classList.remove(labelDisabledClass);
        modifierElement.classList.remove(labelDisabledClass);
      } else {
        labelElement.classList.add(labelDisabledClass);
        modifierElement.classList.add(labelDisabledClass);
      }
    });

    isProficientElement.addEventListener('input', () => {
      this.calculateSavingThrowModifier(key);
    });

    overrideElement.addEventListener('input', () => {
      let overrideValue = parseInt(overrideElement.value, 10);

      if (isNaN(overrideValue)) {
        this.calculateSavingThrowModifier(key);
      } else {
        let formattedSavingThrow = SavingThrowsSection.formatSavingThrowModifier(overrideValue);
        this.editElements.savingThrowModifier[key].textContent = formattedSavingThrow;
      }
    });
  }

  setAbilityModifier(abilityScoreName, abilityModifier) {
    this.editElements.abilityModifier[abilityScoreName].textContent = abilityModifier;
    this.calculateSavingThrowModifier(abilityScoreName);
    this.update();
  }

  setProficiencyBonus(proficiencyBonus) {
    this.editElements.proficiencyBonus.textContent = proficiencyBonus;
    for (const key of Abilities.keys) {
      this.calculateSavingThrowModifier(key);
    }
    this.update();
  }

  calculateSavingThrowModifier(abilityScoreName) {
    let override = this.editElements.override[abilityScoreName].value;

    if (override === '') {
      let abilityModifierElement = this.editElements.abilityModifier[abilityScoreName];
      let isProficientElement = this.editElements.proficient[abilityScoreName];

      let abilityModifier = parseInt(abilityModifierElement.textContent, 10);
      let isProficient = isProficientElement.checked;

      let savingThrowModifier = abilityModifier;
      if (isProficient) {
        let proficiencyBonusElement = this.editElements.proficiencyBonus;
        let proficiencyBonus = parseInt(proficiencyBonusElement.textContent, 10);

        savingThrowModifier += proficiencyBonus;
      }

      let formattedSavingThrow = SavingThrowsSection.formatSavingThrowModifier(savingThrowModifier);
      this.editElements.savingThrowModifier[abilityScoreName].textContent = formattedSavingThrow;
    }
  }

  static formatSavingThrowModifier(savingThrowModifier) {
    let operator = getModifierOperator(savingThrowModifier);
    let number = getModifierNumber(savingThrowModifier);

    return `${operator}${number}`;
  }

  get initialSelectedEditElement() {
    return this.editElements.enable.strength;
  }

  checkForErrors() {

  }

  update() {
    let text = '';

    for (const [key, value] of Abilities.entries) {
      let isEnabled = this.editElements.enable[key].checked;
      let savingThrowModifier = this.editElements.savingThrowModifier[key].textContent;

      let abbreviation = capitalizeFirstLetter(value.abbreviation);

      if (isEnabled) {
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
    this.abilityModifier = {};

    for (const key of Abilities.keys) {
      this.enable[key] = shadowRoot.getElementById(`${key}-enable`);
      this.label[key] = shadowRoot.getElementById(`${key}-label`);
      this.savingThrowModifier[key] = shadowRoot.getElementById(`${key}-saving-throw-modifier`);
      this.proficient[key] = shadowRoot.getElementById(`${key}-proficient`);
      this.override[key] = shadowRoot.getElementById(`${key}-override`);
      this.abilityModifier[key] = shadowRoot.getElementById(`${key}-ability-modifier`);
    }

    this.proficiencyBonus = shadowRoot.getElementById('proficiency-bonus');
  }
}
