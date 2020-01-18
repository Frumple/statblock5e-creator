import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';
import { inputValueAndTriggerEvent } from '../../../helpers/element-helpers.js';

const abilitiesModel = CurrentContext.creature.abilities;
const skillsModel = CurrentContext.creature.skills;

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
      super.connectedCallback();

      for (const key of skillsModel.keys) {
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
    this.updateEditModeViewSkillModifier(key);
    this.updateShowModeView();
    this.dispatchSkillChangedEvent(key);
  }

  onInputSkillProficiency(key) {
    this.updateModelSkillProficiency(key);
    this.updateEditModeViewSkillModifier(key);
    this.updateShowModeView();
    this.dispatchSkillChangedEvent(key);
  }

  onInputSkillOverride(key) {
    this.updateModelSkillOverride(key);
    this.updateEditModeViewSkillModifier(key);
    this.updateShowModeView();
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
    for (const key of skillsModel.keys) {
      this.updateModelSkillEnabled(key);
      this.updateModelSkillProficiency(key);
      this.updateModelSkillOverride(key);
    }
  }

  updateModelSkillEnabled(key) {
    skillsModel.skills[key].isEnabled = this.editElements.skill[key].enable.checked;
  }

  updateModelSkillProficiency(key) {
    skillsModel.skills[key].isProficient = this.editElements.skill[key].proficient.checked;
  }

  updateModelSkillOverride(key) {
    skillsModel.skills[key].override = this.editElements.skill[key].override.valueAsInt;
  }

  updateViewOnAttributeChange(abilityName) {
    if (abilityName) {
      for (const [key, value] of skillsModel.entries) {
        if (abilitiesModel.abilities[abilityName] === value.ability) {
          this.updateEditModeViewSkillModifier(key);
        }
      }
    } else {
      for (const key of skillsModel.keys) {
        this.updateEditModeViewSkillModifier(key);
      }
    }
    this.updateShowModeView();
  }

  updateEditModeView() {
    for (const key of skillsModel.keys) {
      this.updateEditModeViewSkillModifier(key);
    }
  }

  updateEditModeViewSkill(key) {
    const skillElements = skillsModel.skills[key];
    skillElements.enable.checked = skillsModel.savingThrows[key].isEnabled;
    skillElements.modifier.textContent = skillsModel.savingThrows[key].formattedModifier;
    skillElements.proficient.checked = skillsModel.savingThrows[key].isProficient;
    skillElements.override.value = skillsModel.savingThrows[key].override;
  }

  updateEditModeViewSkillModifier(key) {
    this.editElements.skill[key].modifier.textContent = skillsModel.skills[key].formattedModifier;
  }

  updateShowModeView() {
    const text = skillsModel.text;

    if (text === '') {
      this.empty = true;
    } else {
      this.empty = false;
    }

    this.showElements.text.textContent = text;
  }

  exportToJson() {
    return skillsModel.toJson();
  }

  exportToHtml() {
    return skillsModel.toHtml();
  }

  exportToHomebrewery() {
    return skillsModel.toHomebrewery();
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

    for (const key of skillsModel.keys) {
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
