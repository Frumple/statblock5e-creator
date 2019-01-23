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

      let isProficientElement = this.editElements.proficient[name];
      isProficientElement.addEventListener('input', () => {
        this.calculateSkillModifier(name);
      });

      let overrideElement = this.editElements.override[name];
      overrideElement.addEventListener('input', () => {
        let overrideValue = parseInt(overrideElement.value, 10);

        if(isNaN(overrideValue)) {
          this.calculateSkillModifier(name);
        } else {
          let formattedSkillModifier = SkillsSection.formatSkillModifier(overrideValue);
          this.editElements.skill_modifier[name].textContent = formattedSkillModifier;
        }
      });
    });
  }

  setAbilityModifier(abilityScoreName, abilityModifier) {
    this.editElements.ability_modifier[abilityScoreName].textContent = abilityModifier;
    SkillNames.forEachEntry( ([name, value]) => {
      if (value.ability_score === abilityScoreName) {
        this.calculateSkillModifier(name);
      }
    });
    this.update();
  }

  setProficiencyBonus(proficiencyBonus) {
    this.editElements.proficiency_bonus.textContent = proficiencyBonus;
    SkillNames.forEach( (name) => {
      this.calculateSkillModifier(name);
    });
    this.update();
  }

  calculateSkillModifier(skillName) {
    let override = this.editElements.override[skillName].value;

    if (override === "") {
      let abilityScoreName = SkillNames.getEntry(skillName).ability_score;
      let abilityModifierElement = this.editElements.ability_modifier[abilityScoreName];
      let isProficientElement = this.editElements.proficient[skillName];

      let abilityModifier = parseInt(abilityModifierElement.textContent, 10);
      let isProficient = isProficientElement.checked;

      let skillModifier = abilityModifier;
      if (isProficient) {
        let proficiencyBonusElement = this.editElements.proficiency_bonus;
        let proficiencyBonus = parseInt(proficiencyBonusElement.textContent, 10);

        skillModifier += proficiencyBonus;
      }

      let formattedSkillModifier = SkillsSection.formatSkillModifier(skillModifier);
      this.editElements.skill_modifier[skillName].textContent = formattedSkillModifier;
    }
  }

  static formatSkillModifier(skillModifier) {
    let operator = getModifierOperator(skillModifier);
    let number = getModifierNumber(skillModifier);

    return `${operator}${number}`;
  }

  checkForErrors() {

  }

  update() {
    let text = '';

    SkillNames.forEachEntry( ([name, value]) => {
      let isEnabled = this.editElements.enable[name].checked;
      let skillModifier = this.editElements.skill_modifier[name].textContent;

      if (isEnabled) {
        if (text === '') {
          text += `${value.pretty_name} ${skillModifier}`;
        } else {
          text += `, ${value.pretty_name} ${skillModifier}`;
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
    this.skill_modifier = {};
    this.proficient = {};
    this.override = {};
    this.ability_modifier = {};

    SkillNames.forEach( (name) => {
      this.enable[name] = shadowRoot.getElementById(`${name}-enable`);
      this.skill_modifier[name] = shadowRoot.getElementById(`${name}-skill-modifier`);
      this.proficient[name] = shadowRoot.getElementById(`${name}-proficient`);
      this.override[name] = shadowRoot.getElementById(`${name}-override`);
    });

    AbilityScoreNames.forEachName( (name) => {
      this.ability_modifier[name] = shadowRoot.getElementById(`${name}-ability-modifier`);
    });

    this.proficiency_bonus = shadowRoot.getElementById('proficiency-bonus');
  }
}
