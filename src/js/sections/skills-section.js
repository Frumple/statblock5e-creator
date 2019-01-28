import * as sectionModule from '/src/js/base/section.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';
import SkillNames from '/src/js/helpers/skill-names.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

export default class SkillsSection extends sectionModule.Section {
  static get elementName() { return 'skills-section'; }
  static get templatePath() { return 'src/html/sections/skills-section.html'; }

  constructor() {
    super(SkillsSection.elementName,
          SkillsShowElements,
          SkillsEditElements);

    SkillNames.forEach( (name) => {
      this.editElements.enable[name].enableElementsWhenChecked(
        this.editElements.proficient[name],
        this.editElements.override[name]
      );

      const labelDisabledClass = 'section__label_disabled';
      let enableElement = this.editElements.enable[name];
      let labelElement = this.editElements.label[name];
      let modifierElement = this.editElements.skillModifier[name];
      let isProficientElement = this.editElements.proficient[name];
      let overrideElement = this.editElements.override[name];

      enableElement.addEventListener('input', () => {
        if (enableElement.checked) {
          let isProficient = isProficientElement.checked;
          let overrideValue = parseInt(overrideElement.value, 10);

          labelElement.classList.remove(labelDisabledClass);
          modifierElement.classList.remove(labelDisabledClass);

          this.fireSkillChangedEvent(name, isProficient, overrideValue);
        } else {
          labelElement.classList.add(labelDisabledClass);
          modifierElement.classList.add(labelDisabledClass);

          this.fireSkillChangedEvent(name, false, NaN);
        }
      });

      isProficientElement.addEventListener('input', () => {
        let isProficient = isProficientElement.checked;
        let overrideValue = parseInt(overrideElement.value, 10);

        this.calculateSkillModifier(name);

        this.fireSkillChangedEvent(name, isProficient, overrideValue);
      });

      overrideElement.addEventListener('input', () => {
        let isProficient = isProficientElement.checked;
        let overrideValue = parseInt(overrideElement.value, 10);

        if(isNaN(overrideValue)) {
          this.calculateSkillModifier(name);
        } else {
          let formattedSkillModifier = SkillsSection.formatSkillModifier(overrideValue);
          this.editElements.skillModifier[name].textContent = formattedSkillModifier;
        }

        this.fireSkillChangedEvent(name, isProficient, overrideValue);
      });
    });
  }

  fireSkillChangedEvent(skillName, isProficient, overrideModifier) {
    let changeEvent = new CustomEvent('skillChanged', {
      bubbles: true,
      composed: true,
      detail: {
        skillName: skillName,
        isProficient: isProficient,
        overrideModifier: overrideModifier
      }
    });
    this.dispatchEvent(changeEvent);
  }

  setAbilityModifier(abilityScoreName, abilityModifier) {
    this.editElements.abilityModifier[abilityScoreName].textContent = abilityModifier;
    SkillNames.forEachEntry( ([name, value]) => {
      if (value.ability_score === abilityScoreName) {
        this.calculateSkillModifier(name);
      }
    });
    this.update();
  }

  setProficiencyBonus(proficiencyBonus) {
    this.editElements.proficiencyBonus.textContent = proficiencyBonus;
    SkillNames.forEach( (name) => {
      this.calculateSkillModifier(name);
    });
    this.update();
  }

  calculateSkillModifier(skillName) {
    let override = this.editElements.override[skillName].value;

    if (override === '') {
      let abilityScoreName = SkillNames.getEntry(skillName).ability_score;
      let abilityModifierElement = this.editElements.abilityModifier[abilityScoreName];
      let isProficientElement = this.editElements.proficient[skillName];

      let abilityModifier = parseInt(abilityModifierElement.textContent, 10);
      let isProficient = isProficientElement.checked;

      let skillModifier = abilityModifier;
      if (isProficient) {
        let proficiencyBonusElement = this.editElements.proficiencyBonus;
        let proficiencyBonus = parseInt(proficiencyBonusElement.textContent, 10);

        skillModifier += proficiencyBonus;
      }

      let formattedSkillModifier = SkillsSection.formatSkillModifier(skillModifier);
      this.editElements.skillModifier[skillName].textContent = formattedSkillModifier;
    }
  }

  static formatSkillModifier(skillModifier) {
    let operator = getModifierOperator(skillModifier);
    let number = getModifierNumber(skillModifier);

    return `${operator}${number}`;
  }

  get initialSelectedEditElement() {
    return this.editElements.enable.acrobatics;
  }

  checkForErrors() {

  }

  update() {
    let text = '';

    SkillNames.forEachEntry( ([name, value]) => {
      let isEnabled = this.editElements.enable[name].checked;
      let skillModifier = this.editElements.skillModifier[name].textContent;

      if (isEnabled) {
        if (text === '') {
          text += `${value.pretty_name} ${skillModifier}`;
        } else {
          text += `, ${value.pretty_name} ${skillModifier}`;
        }
      }
    });

    if (text === '') {
      this.empty = true;
    } else {
      this.empty = false;
    }

    this.showElements.text.textContent = text;
  }
}

class SkillsShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('skills-text');
  }
}

class SkillsEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.enable = {};
    this.label = {};
    this.skillModifier = {};
    this.proficient = {};
    this.override = {};
    this.abilityModifier = {};

    SkillNames.forEach( (name) => {
      this.enable[name] = shadowRoot.getElementById(`${name}-enable`);
      this.label[name] = shadowRoot.getElementById(`${name}-label`);
      this.skillModifier[name] = shadowRoot.getElementById(`${name}-skill-modifier`);
      this.proficient[name] = shadowRoot.getElementById(`${name}-proficient`);
      this.override[name] = shadowRoot.getElementById(`${name}-override`);
    });

    AbilityScoreNames.forEachName( (name) => {
      this.abilityModifier[name] = shadowRoot.getElementById(`${name}-ability-modifier`);
    });

    this.proficiencyBonus = shadowRoot.getElementById('proficiency-bonus');
  }
}
