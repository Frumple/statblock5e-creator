import * as sectionModule from '/src/js/elements/autonomous/sections/section.js';
import Abilities from '/src/js/stats/abilities.js';
import ProficiencyBonus from '/src/js/stats/proficiency-bonus.js';
import { formatModifier } from '/src/js/helpers/string-formatter.js';

export default class AbilityScoresSection extends sectionModule.Section {
  static get elementName() { return 'ability-scores-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'ability-scores-section',
      'src/html/elements/autonomous/sections/ability-scores-section.html');
  }

  constructor() {
    super(AbilityScoresSection.templatePaths,
          AbilityScoresShowElements,
          AbilityScoresEditElements);

    for (const key of Abilities.keys) {
      this.editElements.score[key].addEventListener('input', this.onInputAbilityScore.bind(this, key));
    }

    this.editElements.proficiencyBonus.addEventListener('input', this.onInputProficiencyBonus.bind(this));
  }

  onInputAbilityScore(key) {
    let score = this.editElements.score[key].valueAsInt;
    
    if (! isNaN(score)) {
      Abilities.abilities[key].score = score;
      let modifier = Abilities.abilities[key].modifier;

      this.updateEditSectionModifier(key, modifier);
    
      let changeEvent = new CustomEvent('abilityScoreChanged', {
        bubbles: true,
        composed: true,
        detail: {
          abilityName: key,
          abilityScore: score,
          abilityModifier: modifier
        }
      });
      this.dispatchEvent(changeEvent);
    }
  }

  updateEditSectionModifier(key, modifier) {
    let modifierElement = this.editElements.modifier[key];
    let formattedModifier = AbilityScoresSection.formatAbilityModifier(modifier);
    modifierElement.textContent = formattedModifier;
  }  

  onInputProficiencyBonus() {
    let proficiencyBonus = this.editElements.proficiencyBonus.valueAsInt;

    if (! isNaN(proficiencyBonus)) {
      ProficiencyBonus.proficiencyBonus = proficiencyBonus;
    
      let changeEvent = new CustomEvent('proficiencyBonusChanged', {
        bubbles: true,
        composed: true,
        detail: {
          proficiencyBonus: proficiencyBonus
        }
      });
      this.dispatchEvent(changeEvent);
    }
  }

  checkForErrors() {
    for (const key of Abilities.keys) {
      this.editElements.score[key].validate(this.errorMessages);
    }
    this.editElements.proficiencyBonus.validate(this.errorMessages);
  }

  updateShowSection() {
    for (const key of Abilities.keys) {
      this.updateShowSectionAbilities(key);
    }
  }

  updateShowSectionAbilities(key) {
    let scoreShowElement = this.showElements.score[key];
    let modifierShowElement = this.showElements.modifier[key];
    let ability = Abilities.abilities[key];
    let score = ability.score;
    let modifier = ability.modifier;

    scoreShowElement.textContent = score;
    modifierShowElement.textContent = AbilityScoresSection.formatAbilityModifier(modifier);
  }

  static formatAbilityModifier(modifier) {
    let formattedModifier = formatModifier(modifier);
    return `(${formattedModifier})`;
  }
}

class AbilityScoresShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    for (const key of Abilities.keys) {
      this.score[key] = shadowRoot.getElementById(`${key}-score-show`);
      this.modifier[key] = shadowRoot.getElementById(`${key}-modifier-show`);
    }
  }
}

class AbilityScoresEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    for (const key of Abilities.keys) {
      this.score[key] = shadowRoot.getElementById(`${key}-score-edit`);
      this.modifier[key] = shadowRoot.getElementById(`${key}-modifier-edit`);
    }

    this.proficiencyBonus = shadowRoot.getElementById('proficiency-bonus-input');
  }
  
  get initiallySelectedElement() {
    return this.score.strength;
  }
}
