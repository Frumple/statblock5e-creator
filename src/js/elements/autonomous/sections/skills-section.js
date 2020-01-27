import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';
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
          'skills',
          SkillsShowElements,
          SkillsEditElements);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      for (const key of CurrentContext.creature.skills.keys) {
        this.initializeSkillElements(key);
      }

      this.isInitialized = true;
    }
  }

  initializeSkillElements(key) {
    const elements = this.editElements.skill[key];

    elements.enable.enableElementsWhenChecked(
      elements.label,
      elements.modifier,
      elements.proficient,
      elements.override
    );

    elements.enable.addEventListener('input', this.onInputSkillEnabled.bind(this, key));
    elements.proficient.addEventListener('input', this.onInputSkillProficiency.bind(this, key));
    elements.override.addEventListener('input', this.onInputSkillOverride.bind(this, key));
  }

  onInputSkillEnabled(key) {
    const elements = this.editElements.skill[key];

    if (elements.enable.checked) {
      inputValueAndTriggerEvent(elements.proficient, true);
    } else {
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
    for (const key of CurrentContext.creature.skills.keys) {
      this.updateModelSkillEnabled(key);
      this.updateModelSkillProficiency(key);
      this.updateModelSkillOverride(key);
    }
  }

  updateModelSkillEnabled(key) {
    CurrentContext.creature.skills.skills[key].isEnabled = this.editElements.skill[key].enable.checked;
  }

  updateModelSkillProficiency(key) {
    CurrentContext.creature.skills.skills[key].isProficient = this.editElements.skill[key].proficient.checked;
  }

  updateModelSkillOverride(key) {
    CurrentContext.creature.skills.skills[key].override = this.editElements.skill[key].override.valueAsInt;
  }

  updateViewOnAttributeChange(abilityName) {
    const skillsModel = CurrentContext.creature.skills;

    if (abilityName) {
      for (const [key, value] of skillsModel.entries) {
        if (CurrentContext.creature.abilities.abilities[abilityName] === value.ability) {
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
    for (const key of CurrentContext.creature.skills.keys) {
      this.updateEditModeViewSkill(key);
      this.editElements.skill[key].enable.onInputCheckbox();
    }
  }

  updateEditModeViewSkill(key) {
    const skillElements = this.editElements.skill[key];
    const skillsModel = CurrentContext.creature.skills;

    skillElements.enable.checked = skillsModel.skills[key].isEnabled;
    skillElements.modifier.textContent = skillsModel.skills[key].formattedModifier;
    skillElements.proficient.checked = skillsModel.skills[key].isProficient;
    skillElements.override.value = skillsModel.skills[key].override;
  }

  updateEditModeViewSkillModifier(key) {
    this.editElements.skill[key].modifier.textContent = CurrentContext.creature.skills.skills[key].formattedModifier;
  }

  updateShowModeView() {
    const text = CurrentContext.creature.skills.text;
    this.empty = (text === '');
    this.showElements.text.textContent = text;
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

    for (const key of CurrentContext.creature.skills.keys) {
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
