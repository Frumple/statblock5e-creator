import * as sectionModule from '/src/js/base/section.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';
import { capitalizeFirstLetter } from '/src/js/helpers/string-format.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

export default class SavingThrowsSection extends sectionModule.Section {
  static get elementName() { return 'saving-throws-section'; }
  static get templatePath() { return 'src/html/sections/saving-throws-section.html'; }

  constructor() {
    super(SavingThrowsSection.elementName,
          SavingThrowsShowElements,
          SavingThrowsEditElements);

    AbilityScoreNames.forEachName( (name) => {
      this.editElements.enable[name].enableElementsWhenChecked(
        this.editElements.proficient[name],
        this.editElements.override[name]
      );

      const labelDisabledClass = 'section__label_disabled';
      let enableElement = this.editElements.enable[name];
      let labelElement = this.editElements.label[name];
      let modifierElement = this.editElements.savingThrowModifier[name];
      enableElement.addEventListener('input', () => {
        if (enableElement.checked) {
          labelElement.classList.remove(labelDisabledClass);
          modifierElement.classList.remove(labelDisabledClass);
        } else {
          labelElement.classList.add(labelDisabledClass);
          modifierElement.classList.add(labelDisabledClass);
        }
      });

      let isProficientElement = this.editElements.proficient[name];
      isProficientElement.addEventListener('input', () => {
        this.calculateSavingThrowModifier(name);
      });

      let overrideElement = this.editElements.override[name];
      overrideElement.addEventListener('input', () => {
        let overrideValue = parseInt(overrideElement.value, 10);

        if (isNaN(overrideValue)) {
          this.calculateSavingThrowModifier(name);
        } else {
          let formattedSavingThrow = SavingThrowsSection.formatSavingThrowModifier(overrideValue);
          this.editElements.savingThrowModifier[name].textContent = formattedSavingThrow;
        }
      });
    });
  }

  setAbilityModifier(abilityScoreName, abilityModifier) {
    this.editElements.abilityModifier[abilityScoreName].textContent = abilityModifier;
    this.calculateSavingThrowModifier(abilityScoreName);
    this.update();
  }

  setProficiencyBonus(proficiencyBonus) {
    this.editElements.proficiencyBonus.textContent = proficiencyBonus;
    AbilityScoreNames.forEachName( (name) => {
      this.calculateSavingThrowModifier(name);
    });
    this.update();
  }

  calculateSavingThrowModifier(abilityScoreName) {
    let override = this.editElements.override[abilityScoreName].value;

    if (override === "") {
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

  checkForErrors() {

  }

  update() {
    let text = '';

    AbilityScoreNames.forEachEntry( ([name, value]) => {
      let isEnabled = this.editElements.enable[name].checked;
      let savingThrowModifier = this.editElements.savingThrowModifier[name].textContent;

      let abbreviation = capitalizeFirstLetter(value.abbreviation);

      if (isEnabled) {
        if (text === '') {
          text += `${abbreviation} ${savingThrowModifier}`;
        } else {
          text += `, ${abbreviation} ${savingThrowModifier}`;
        }
      }
    });

    if (text === '') {
      this.showElements.section.classList.add('section_empty');
    } else {
      this.showElements.section.classList.remove('section_empty');
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

    AbilityScoreNames.forEachName( (name) => {
      this.enable[name] = shadowRoot.getElementById(`${name}-enable`);
      this.label[name] = shadowRoot.getElementById(`${name}-label`);
      this.savingThrowModifier[name] = shadowRoot.getElementById(`${name}-saving-throw-modifier`);
      this.proficient[name] = shadowRoot.getElementById(`${name}-proficient`);
      this.override[name] = shadowRoot.getElementById(`${name}-override`);
      this.abilityModifier[name] = shadowRoot.getElementById(`${name}-ability-modifier`);
    });

    this.proficiencyBonus = shadowRoot.getElementById('proficiency-bonus');
  }
}
