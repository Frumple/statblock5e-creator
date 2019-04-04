import * as propertyLineSectionModule from './property-line-section.js';
import Skills from '../../../models/skills.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

export default class SkillsSection extends propertyLineSectionModule.PropertyLineSection {
  static get elementName() { return 'skills-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'skills-section',
      'src/html/elements/autonomous/sections/skills-section.html');
  }

  constructor() {
    super(SkillsSection.templatePaths,
          SkillsShowElements,
          SkillsEditElements);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      for (const key of Skills.keys) {
        this.initializeSkillElements(key);
      }

      this.isInitialized = true;
    }
  }

  initializeSkillElements(key) {    
    const elements = this.editElements.skill[key];

    elements.enable.enableElementsWhenChecked(
      elements.proficient,
      elements.override
    );

    elements.enable.addEventListener('input', this.onInputSkillEnabled.bind(this, key));
    elements.proficient.addEventListener('input', this.onInputSkillProficiency.bind(this, key));
    elements.override.addEventListener('input', this.onInputSkillOverride.bind(this, key));
  }

  onInputSkillEnabled(key) {
    const labelDisabledClass = 'section__label_disabled';
    const elements = this.editElements.skill[key];

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
    
    this.updateModelSkillEnabled(key);
    this.updateViewSkill(key);
    this.updateViewText();
    this.dispatchSkillChangedEvent(key);
  }

  onInputSkillProficiency(key) {
    this.updateModelSkillProficiency(key);
    this.updateViewSkill(key);
    this.updateViewText();
    this.dispatchSkillChangedEvent(key);
  }

  onInputSkillOverride(key) {
    this.updateModelSkillOverride(key);
    this.updateViewSkill(key);
    this.updateViewText();  
    this.dispatchSkillChangedEvent(key);
  }

  dispatchSkillChangedEvent(skillName) {
    const changeEvent = new CustomEvent('skillChanged', {
      bubbles: true,
      composed: true,
      detail: {
        skillName: skillName
      }
    });
    this.dispatchEvent(changeEvent);
  }

  checkForErrors() {
    return;
  }

  updateModel() {
    for (const key of Skills.keys) {
      this.updateModelSkillEnabled(key);
      this.updateModelSkillProficiency(key);
      this.updateModelSkillOverride(key);
    }
  }

  updateModelSkillEnabled(key) {
    Skills.skills[key].isEnabled = this.editElements.skill[key].enable.checked;
  }

  updateModelSkillProficiency(key) {
    Skills.skills[key].isProficient = this.editElements.skill[key].proficient.checked;
  }

  updateModelSkillOverride(key) {
    Skills.skills[key].override = this.editElements.skill[key].override.valueAsInt;
  }

  updateView() {
    for (const key of Skills.keys) {
      this.updateViewSkill(key);
    }

    this.updateViewText();
  }

  updateViewSkillsByAbility(abilityName) {
    for (const [key, value] of Skills.entries) {
      if (abilityName === value.abilityName) {
        this.updateViewSkill(key);
      }
    }
  }

  updateViewSkill(key) {
    const skill = Skills.skills[key];
    this.editElements.skill[key].modifier.textContent = skill.formattedModifier;
  }

  updateViewText() {
    const text = Skills.text;

    if (text === '') {
      this.empty = true;
    } else {
      this.empty = false;
    }

    this.showElements.text.textContent = text;
  }

  exportToHtml() {
    return Skills.toHtml();
  }

  exportToHomebrewery() {
    return Skills.toHomebrewery();
  }
}

class SkillsShowElements extends propertyLineSectionModule.PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class SkillsEditElements extends propertyLineSectionModule.PropertyLineEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.skill = {};

    for (const key of Skills.keys) {
      this.skill[key] = {
        enable: shadowRoot.getElementById(`${key}-enable`),
        label: shadowRoot.getElementById(`${key}-label`),
        modifier: shadowRoot.getElementById(`${key}-skill-modifier`),
        proficient: shadowRoot.getElementById(`${key}-proficient`),
        override: shadowRoot.getElementById(`${key}-override`)
      };
    }
  }
  
  get initiallySelectedElement() {
    return this.skill['acrobatics'].enable;
  }
}
