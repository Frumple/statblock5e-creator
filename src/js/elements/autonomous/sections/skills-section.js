import * as propertyLineSectionModule from './property-line-section.js';
import Skills from '../../../stats/skills.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';
import { formatModifier } from '../../../helpers/string-formatter.js';

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
          SkillsEditElements,
          'Skills');

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
    Skills.skills[key].isEnabled = elements.enable.checked;

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
    
    this.dispatchSkillChangedEvent(key);
  }

  onInputSkillProficiency(key) {
    Skills.skills[key].isProficient = this.editElements.skill[key].proficient.checked;

    this.updateEditSectionModifier(key);
    this.dispatchSkillChangedEvent(key);
  }

  onInputSkillOverride(key) {
    const overrideValue = this.editElements.skill[key].override.valueAsInt;
    Skills.skills[key].override = overrideValue;

    this.updateEditSectionModifier(key);
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

  updateModifiers(abilityName = null) {
    for (const [key, value] of Skills.entries) {      
      if (abilityName === null || abilityName === value.abilityName) {
        this.updateEditSectionModifier(key);
      }
    }

    this.updateShowSection();
  }

  updateEditSectionModifier(key) {
    const skillModifier = Skills.skills[key].calculateModifier(false);
    const formattedSkillModifier = formatModifier(skillModifier);
    this.editElements.skill[key].modifier.textContent = formattedSkillModifier;
  }

  checkForErrors() {
    return;
  }

  updateShowSection() {
    const text = this.showSectionText;

    if (text === '') {
      this.empty = true;
    } else {
      this.empty = false;
    }

    this.showElements.text.textContent = text;
  }

  get showSectionText() {
    let text = '';

    for (const [key, value] of Skills.entries) {
      const skill = Skills.skills[key];
      const isEnabled = skill.isEnabled;
      
      if (isEnabled) {
        const skillModifier = formatModifier(skill.calculateModifier());

        if (text === '') {
          text += `${value.prettyName} ${skillModifier}`;
        } else {
          text += `, ${value.prettyName} ${skillModifier}`;
        }
      }
    }
    
    return text;
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
