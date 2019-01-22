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

      let isProficientElement = this.editElements.proficient[name];
      isProficientElement.addEventListener('input', () => {
        this.calculateSavingThrow(name);
      });

      let overrideElement = this.editElements.override[name];
      overrideElement.addEventListener('input', () => {
        let overrideValue = parseInt(overrideElement.value, 10);

        if (isNaN(overrideValue)) {
          this.calculateSavingThrow(name);
        } else {
          let formattedSavingThrow = SavingThrowsSection.formatSavingThrow(overrideValue);
          this.editElements.saving_throw[name].textContent = formattedSavingThrow;
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
    AbilityScoreNames.forEachName( (name) => {
      this.calculateSavingThrow(name);
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

    AbilityScoreNames.forEachEntry( ([name, value]) => {
      let isEnabled = this.editElements.enable[name].checked;
      let savingThrow = this.editElements.saving_throw[name].textContent;

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

    AbilityScoreNames.forEachName( (name) => {
      this.enable[name] = shadowRoot.getElementById(`${name}-enable`);
      this.saving_throw[name] = shadowRoot.getElementById(`${name}-saving-throw`);
      this.proficient[name] = shadowRoot.getElementById(`${name}-proficient`);
      this.override[name] = shadowRoot.getElementById(`${name}-override`);
      this.modifier[name] = shadowRoot.getElementById(`${name}-modifier`);
    });

    this.proficiency_bonus = shadowRoot.getElementById('proficiency-bonus');
  }
}
