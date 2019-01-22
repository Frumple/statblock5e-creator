import * as sectionModule from '/src/js/base/section.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';
import AbilityScoreAbbreviations from '/src/js/helpers/ability-score-abbreviations.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

export default class SavingThrowsSection extends sectionModule.Section {
  static get elementName() { return 'saving-throws-section'; }
  static get templatePath() { return 'src/html/sections/saving-throws-section.html'; }

  constructor() {
    super(SavingThrowsSection.elementName,
          SavingThrowsShowElements,
          SavingThrowsEditElements);

    Object.entries(AbilityScoreNames).forEach( ([key, abilityScoreName]) => {
      this.editElements.enable[abilityScoreName].enableElementsWhenChecked(
        this.editElements.proficient[abilityScoreName],
        this.editElements.override[abilityScoreName]
      );

      let isProficientElement = this.editElements.proficient[abilityScoreName];
      isProficientElement.addEventListener('input', () => {
        this.calculateSavingThrow(abilityScoreName);
      });

      let overrideElement = this.editElements.override[abilityScoreName];
      overrideElement.addEventListener('input', () => {
        let overrideValue = parseInt(overrideElement.value, 10);

        if (isNaN(overrideValue)) {
          this.calculateSavingThrow(abilityScoreName);
        } else {
          let formattedSavingThrow = SavingThrowsSection.formatSavingThrow(overrideValue);
          this.editElements.saving_throw[abilityScoreName].textContent = formattedSavingThrow;
        }
      });
    });
  }

  setAbilityModifier(abilityScoreName, abilityModifier) {
    this.editElements.modifier[abilityScoreName].textContent = abilityModifier;
    this.calculateSavingThrow(abilityScoreName);
    this.update();
  }

  setProficiencyBonus(proficiencyBonus) {
    this.editElements.proficiency_bonus.textContent = proficiencyBonus;
    Object.entries(AbilityScoreNames).forEach( ([key, abilityScoreName]) => {
      this.calculateSavingThrow(abilityScoreName);
    });
    this.update();
  }

  calculateSavingThrow(abilityScoreName) {
    let override = this.editElements.override[abilityScoreName].value;

    if (override === "") {
      let abilityModifierElement = this.editElements.modifier[abilityScoreName];
      let isProficientElement = this.editElements.proficient[abilityScoreName];

      let abilityModifier = parseInt(abilityModifierElement.textContent, 10);
      let isProficient = isProficientElement.checked;

      let savingThrow = abilityModifier;
      if (isProficient) {
        let proficiencyBonusElement = this.editElements.proficiency_bonus;
        let proficiencyBonus = parseInt(proficiencyBonusElement.textContent, 10);

        savingThrow += proficiencyBonus;
      }

      let formattedSavingThrow = SavingThrowsSection.formatSavingThrow(savingThrow);
      this.editElements.saving_throw[abilityScoreName].textContent = formattedSavingThrow;
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

    Object.entries(AbilityScoreNames).forEach( ([key, abilityScoreName]) => {
      let isEnabled = this.editElements.enable[abilityScoreName].checked;
      let savingThrow = this.editElements.saving_throw[abilityScoreName].textContent;

      if (isEnabled) {
        let abbreviation = AbilityScoreAbbreviations[key];

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

    Object.entries(AbilityScoreNames).forEach( ([key, abilityScoreName]) => {
      this.enable[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-enable`);
      this.saving_throw[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-saving-throw`);
      this.proficient[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-proficient`);
      this.override[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-override`);
      this.modifier[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-modifier`);
    });

    this.proficiency_bonus = shadowRoot.getElementById('proficiency-bonus');
  }
}
