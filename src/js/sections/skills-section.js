import * as sectionModule from '/src/js/base/section.js';
import Abilities from '/src/js/helpers/abilities.js';
import Skills from '/src/js/helpers/skills.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

export default class SkillsSection extends sectionModule.Section {
  static get elementName() { return 'skills-section'; }
  static get templatePath() { return 'src/html/sections/skills-section.html'; }

  constructor() {
    super(SkillsSection.elementName,
          SkillsShowElements,
          SkillsEditElements);

    for (const key of Skills.keys) {
      this.initializeSkillElements(key);
    }
  }

  initializeSkillElements(key) {
    const labelDisabledClass = 'section__label_disabled';
    let enableElement = this.editElements.enable[key];
    let labelElement = this.editElements.label[key];
    let modifierElement = this.editElements.skillModifier[key];
    let isProficientElement = this.editElements.proficient[key];
    let overrideElement = this.editElements.override[key];

    enableElement.enableElementsWhenChecked(
      isProficientElement,
      overrideElement
    );

    enableElement.addEventListener('input', () => {
      if (enableElement.checked) {
        let isProficient = isProficientElement.checked;
        let overrideValue = parseInt(overrideElement.value, 10);

        labelElement.classList.remove(labelDisabledClass);
        modifierElement.classList.remove(labelDisabledClass);

        this.fireSkillChangedEvent(key, isProficient, overrideValue);
      } else {
        labelElement.classList.add(labelDisabledClass);
        modifierElement.classList.add(labelDisabledClass);

        this.fireSkillChangedEvent(key, false, NaN);
      }
    });

    isProficientElement.addEventListener('input', () => {
      let isProficient = isProficientElement.checked;
      let overrideValue = parseInt(overrideElement.value, 10);

      this.calculateSkillModifier(key);

      this.fireSkillChangedEvent(key, isProficient, overrideValue);
    });

    overrideElement.addEventListener('input', () => {
      let isProficient = isProficientElement.checked;
      let overrideValue = parseInt(overrideElement.value, 10);

      if(isNaN(overrideValue)) {
        this.calculateSkillModifier(key);
      } else {
        let formattedSkillModifier = SkillsSection.formatSkillModifier(overrideValue);
        this.editElements.skillModifier[key].textContent = formattedSkillModifier;
      }

      this.fireSkillChangedEvent(key, isProficient, overrideValue);
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

  setAbilityModifier(abilityName, abilityModifier) {
    this.editElements.abilityModifier[abilityName].textContent = abilityModifier;
    for (const [key, value] of Skills.entries) {
      if (value.ability === abilityName) {
        this.calculateSkillModifier(key);
      }
    }
    this.update();
  }

  setProficiencyBonus(proficiencyBonus) {
    this.editElements.proficiencyBonus.textContent = proficiencyBonus;
    for (const key of Skills.keys) {
      this.calculateSkillModifier(key);
    }
    this.update();
  }

  calculateSkillModifier(key) {
    let override = this.editElements.override[key].value;

    if (override === '') {
      let abilityName = Skills.skills[key].ability;
      let abilityModifierElement = this.editElements.abilityModifier[abilityName];
      let isProficientElement = this.editElements.proficient[key];

      let abilityModifier = parseInt(abilityModifierElement.textContent, 10);
      let isProficient = isProficientElement.checked;

      let skillModifier = abilityModifier;
      if (isProficient) {
        let proficiencyBonusElement = this.editElements.proficiencyBonus;
        let proficiencyBonus = parseInt(proficiencyBonusElement.textContent, 10);

        skillModifier += proficiencyBonus;
      }

      let formattedSkillModifier = SkillsSection.formatSkillModifier(skillModifier);
      this.editElements.skillModifier[key].textContent = formattedSkillModifier;
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

    for (const [key, value] of Skills.entries) {
      let isEnabled = this.editElements.enable[key].checked;
      let skillModifier = this.editElements.skillModifier[key].textContent;

      if (isEnabled) {
        if (text === '') {
          text += `${value.prettyName} ${skillModifier}`;
        } else {
          text += `, ${value.prettyName} ${skillModifier}`;
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

    for (const key of Skills.keys) {
      this.enable[key] = shadowRoot.getElementById(`${key}-enable`);
      this.label[key] = shadowRoot.getElementById(`${key}-label`);
      this.skillModifier[key] = shadowRoot.getElementById(`${key}-skill-modifier`);
      this.proficient[key] = shadowRoot.getElementById(`${key}-proficient`);
      this.override[key] = shadowRoot.getElementById(`${key}-override`);
    }

    for (const key of Abilities.keys) {
      this.abilityModifier[key] = shadowRoot.getElementById(`${key}-ability-modifier`);
    }

    this.proficiencyBonus = shadowRoot.getElementById('proficiency-bonus');
  }
}
