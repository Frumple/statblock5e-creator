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

    AbilityScoreNames.forEachKey( (key) => {
      this.editElements.enable[key].enableElementsWhenChecked(
        this.editElements.proficient[key],
        this.editElements.override[key]
      );

      let isProficientElement = this.editElements.proficient[key];
      isProficientElement.addEventListener('input', () => {
        this.calculateSavingThrow(key);
      });

      let overrideElement = this.editElements.override[key];
      overrideElement.addEventListener('input', () => {
        let overrideValue = parseInt(overrideElement.value, 10);

        if (isNaN(overrideValue)) {
          this.calculateSavingThrow(key);
        } else {
          let formattedSavingThrow = SavingThrowsSection.formatSavingThrow(overrideValue);
          this.editElements.saving_throw[key].textContent = formattedSavingThrow;
        }
      });
    });
  }

  setAbilityModifier(abilityScoreKey, abilityModifier) {
    this.editElements.modifier[abilityScoreKey].textContent = abilityModifier;
    this.calculateSavingThrow(abilityScoreKey);
    this.update();
  }

  setProficiencyBonus(proficiencyBonus) {
    this.editElements.proficiency_bonus.textContent = proficiencyBonus;
    AbilityScoreNames.forEachKey( (key) => {
      this.calculateSavingThrow(key);
    });
    this.update();
  }

  calculateSavingThrow(abilityScoreKey) {
    let override = this.editElements.override[abilityScoreKey].value;

    if (override === "") {
      let abilityModifierElement = this.editElements.modifier[abilityScoreKey];
      let isProficientElement = this.editElements.proficient[abilityScoreKey];

      let abilityModifier = parseInt(abilityModifierElement.textContent, 10);
      let isProficient = isProficientElement.checked;

      let savingThrow = abilityModifier;
      if (isProficient) {
        let proficiencyBonusElement = this.editElements.proficiency_bonus;
        let proficiencyBonus = parseInt(proficiencyBonusElement.textContent, 10);

        savingThrow += proficiencyBonus;
      }

      let formattedSavingThrow = SavingThrowsSection.formatSavingThrow(savingThrow);
      this.editElements.saving_throw[abilityScoreKey].textContent = formattedSavingThrow;
    }
  }

  static formatSavingThrow(savingThrow) {
    let operator = getModifierOperator(savingThrow);
    let number = getModifierNumber(savingThrow);

    return `${operator}${number}`;
  }

  checkForErrors() {

  }

  update() {
    let text = '';

    AbilityScoreNames.forEachEntry( ([key, value]) => {
      let isEnabled = this.editElements.enable[key].checked;
      let savingThrow = this.editElements.saving_throw[key].textContent;

      let abbreviation = capitalizeFirstLetter(value.abbreviation);

      if (isEnabled) {
        if (text === '') {
          text += `${abbreviation} ${savingThrow}`;
        } else {
          text += `, ${abbreviation} ${savingThrow}`;
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
    this.saving_throw = {};
    this.proficient = {};
    this.override = {};
    this.modifier = {};

    AbilityScoreNames.forEachEntry( ([key, value]) => {
      this.enable[key] = shadowRoot.getElementById(`${value.name}-enable`);
      this.saving_throw[key] = shadowRoot.getElementById(`${value.name}-saving-throw`);
      this.proficient[key] = shadowRoot.getElementById(`${value.name}-proficient`);
      this.override[key] = shadowRoot.getElementById(`${value.name}-override`);
      this.modifier[key] = shadowRoot.getElementById(`${value.name}-modifier`);
    });

    this.proficiency_bonus = shadowRoot.getElementById('proficiency-bonus');
  }
}
