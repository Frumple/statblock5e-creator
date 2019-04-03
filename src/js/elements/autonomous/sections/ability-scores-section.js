import * as sectionModule from './section.js';
import Abilities from '../../../stats/abilities.js';
import ProficiencyBonus from '../../../stats/proficiency-bonus.js';


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
    this.updateModelAbilityScore(key);
    this.updateViewAbility(key);    
  }  

  onInputProficiencyBonus() {
    this.updateModelProficiencyBonus();
  } 

  checkForErrors() {
    for (const key of Abilities.keys) {
      this.editElements.score[key].validate(this.errorMessages);
    }
    this.editElements.proficiencyBonus.validate(this.errorMessages);
  }

  updateModel() {
    for (const key of Abilities.keys) {
      this.updateModelAbilityScore(key);
    }

    this.updateModelProficiencyBonus();
  }

  updateModelAbilityScore(key) {
    const score = this.editElements.score[key].valueAsInt;

    if (! isNaN(score)) {
      Abilities.abilities[key].score = score;
      this.dispatchAbilityScoreChangedEvent(key);
    }
  }

  dispatchAbilityScoreChangedEvent(key) {
    const changeEvent = new CustomEvent('abilityScoreChanged', {
      bubbles: true,
      composed: true,
      detail: {
        abilityName: key
      }
    });
    this.dispatchEvent(changeEvent);
  }

  updateModelProficiencyBonus() {
    const proficiencyBonus = this.editElements.proficiencyBonus.valueAsInt;

    if (! isNaN(proficiencyBonus)) {
      ProficiencyBonus.proficiencyBonus = proficiencyBonus;      
      this.dispatchProficiencyBonusChangedEvent();
    }
  }

  dispatchProficiencyBonusChangedEvent() {
    const changeEvent = new CustomEvent('proficiencyBonusChanged', {
      bubbles: true,
      composed: true,
      detail: {}
    });
    this.dispatchEvent(changeEvent);
  }

  updateView() {
    for (const key of Abilities.keys) {
      this.updateViewAbility(key);
    }
  }

  updateViewAbility(key) {
    const ability = Abilities.abilities[key];
    const formattedModifier = ability.formattedModifier;

    this.editElements.modifier[key].textContent = formattedModifier;

    this.showElements.score[key].textContent = ability.score;
    this.showElements.modifier[key].textContent = formattedModifier;
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
