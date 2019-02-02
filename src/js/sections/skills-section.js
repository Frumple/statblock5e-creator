import * as sectionModule from '/src/js/base/section.js';
import Skills from '/src/js/stats/skills.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

export default class SkillsSection extends sectionModule.Section {
  static get elementName() { return 'skills-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'skills-section',
      'src/html/sections/skills-section.html');
  }

  constructor() {
    super(SkillsSection.templatePaths,
          SkillsShowElements,
          SkillsEditElements);

    for (const key of Skills.keys) {
      this.initializeSkillElements(key);
    }

    this.mode = 'hidden';
    this.empty = true;
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
      Skills.skills[key].isEnabled = enableElement.checked;

      if (enableElement.checked) {
        labelElement.classList.remove(labelDisabledClass);
        modifierElement.classList.remove(labelDisabledClass);
      } else {
        labelElement.classList.add(labelDisabledClass);
        modifierElement.classList.add(labelDisabledClass);
      }
      
      this.dispatchSkillChangedEvent(key);
    });

    isProficientElement.addEventListener('input', () => {
      Skills.skills[key].isProficient = isProficientElement.checked;

      this.updateEditSectionModifier(key);
      this.dispatchSkillChangedEvent(key);
    });

    overrideElement.addEventListener('input', () => {
      let overrideValue = parseInt(overrideElement.value, 10);
      Skills.skills[key].override = overrideValue;

      this.updateEditSectionModifier(key);
      this.dispatchSkillChangedEvent(key);
    });
  }

  dispatchSkillChangedEvent(skillName) {
    let changeEvent = new CustomEvent('skillChanged', {
      bubbles: true,
      composed: true,
      detail: {
        skillName: skillName
      }
    });
    this.dispatchEvent(changeEvent);
  }

  updateModifiers(abilityName = null) {
    for (const [key, value] of Skills.entries) {      
      if (abilityName === null || abilityName === value.abilityName) {
        this.updateEditSectionModifier(key);
      }
    }

    this.updateShowSection();
  }

  updateEditSectionModifier(key) {
    let skillModifier = Skills.skills[key].calculateModifier(false);
    let formattedSkillModifier = SkillsSection.formatSkillModifier(skillModifier);
    this.editElements.skillModifier[key].textContent = formattedSkillModifier;
  }

  get initialSelectedEditElement() {
    return this.editElements.enable.acrobatics;
  }

  checkForErrors() {

  }

  updateShowSection() {
    let text = '';

    for (const [key, value] of Skills.entries) {
      let skill = Skills.skills[key];
      let isEnabled = this.editElements.enable[key].checked;
      
      if (isEnabled) {
        let skillModifier = SkillsSection.formatSkillModifier(skill.calculateModifier());

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

  static formatSkillModifier(skillModifier) {
    let operator = getModifierOperator(skillModifier);
    let number = getModifierNumber(skillModifier);
  
    return `${operator}${number}`;
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

    for (const key of Skills.keys) {
      this.enable[key] = shadowRoot.getElementById(`${key}-enable`);
      this.label[key] = shadowRoot.getElementById(`${key}-label`);
      this.skillModifier[key] = shadowRoot.getElementById(`${key}-skill-modifier`);
      this.proficient[key] = shadowRoot.getElementById(`${key}-proficient`);
      this.override[key] = shadowRoot.getElementById(`${key}-override`);
    }
  }
}
