import * as sectionModule from './section.js';
import Abilities from '../../../stats/abilities.js';
import ProficiencyBonus from '../../../stats/proficiency-bonus.js';
import { formatModifier } from '../../../helpers/string-formatter.js';

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
    const score = this.editElements.score[key].valueAsInt;
    
    if (! isNaN(score)) {
      Abilities.abilities[key].score = score;
      const modifier = Abilities.abilities[key].modifier;

      this.updateEditSectionModifier(key, modifier);
    
      const changeEvent = new CustomEvent('abilityScoreChanged', {
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
    const modifierElement = this.editElements.modifier[key];
    const formattedModifier = AbilityScoresSection.formatAbilityModifier(modifier);
    modifierElement.textContent = formattedModifier;
  }  

  onInputProficiencyBonus() {
    const proficiencyBonus = this.editElements.proficiencyBonus.valueAsInt;

    if (! isNaN(proficiencyBonus)) {
      ProficiencyBonus.proficiencyBonus = proficiencyBonus;
    
      const changeEvent = new CustomEvent('proficiencyBonusChanged', {
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
    const scoreShowElement = this.showElements.score[key];
    const modifierShowElement = this.showElements.modifier[key];
    const ability = Abilities.abilities[key];
    const score = ability.score;
    const modifier = ability.modifier;

    scoreShowElement.textContent = score;
    modifierShowElement.textContent = AbilityScoresSection.formatAbilityModifier(modifier);
  }

  static formatAbilityModifier(modifier) {
    const formattedModifier = formatModifier(modifier);
    return `(${formattedModifier})`;
  }

  exportToHtml() {
    const abilitiesBlock = document.createElement('abilities-block');
    for (const [key, value] of Abilities.entries) {
      const abbreviation = value.abbreviation;
      abilitiesBlock.dataset[abbreviation] = this.showElements.score[key].textContent;
    }

    return abilitiesBlock;
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
