import * as sectionModule from '/src/js/base/section.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

export default class AbilityScoresSection extends sectionModule.Section {
  static get elementName() { return 'ability-scores-section'; }
  static get templatePath() { return 'src/html/sections/ability-scores-section.html'; }

  constructor() {
    super(AbilityScoresSection.elementName,
          AbilityScoresShowElements,
          AbilityScoresEditElements);

    AbilityScoreNames.forEachName( (name) => {
      this.editElements.score[name].addEventListener('input', () => {
        this.onAbilityScoreChange(name);
      });
    });

    this.editElements.proficiencyBonus.addEventListener('input', () => {
      this.onProficiencyBonusChange();
    });
  }

  onAbilityScoreChange(abilityScoreName) {
    let scoreElement = this.editElements.score[abilityScoreName];
    let score = parseInt(scoreElement.value, 10);
    let modifier = AbilityScoresSection.calculateAbilityModifier(score);

    this.updateEditModeModifier(abilityScoreName, modifier);

    if (! isNaN(score)) {
      let changeEvent = new CustomEvent('abilityScoreChanged', {
        bubbles: true,
        composed: true,
        detail: {
          abilityScoreName: abilityScoreName,
          abilityScore: score,
          abilityModifier: modifier
        }
      });
      this.dispatchEvent(changeEvent);
    }
  }

  onProficiencyBonusChange() {
    let proficiencyBonusElement = this.editElements.proficiencyBonus;
    let proficiencyBonus = parseInt(proficiencyBonusElement.value, 10);

    if (! isNaN(proficiencyBonus)) {
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

  updateEditModeModifier(abilityScoreName, abilityModifier) {
    let modifierElement = this.editElements.modifier[abilityScoreName];
    let formattedModifier = AbilityScoresSection.formatAbilityModifier(abilityModifier);
    modifierElement.textContent = formattedModifier;
  }

  static formatAbilityModifier(abilityModifier) {
    if (isNaN(abilityModifier)) {
      return '()';
    }

    let operator = getModifierOperator(abilityModifier);
    let number = getModifierNumber(abilityModifier);

    return `(${operator}${number})`;
  }

  static calculateAbilityModifier(abilityScore) {
    let score = parseInt(abilityScore, 10);
    return Math.floor((score - 10) / 2);
  }

  get initialSelectedElement() {
    return this.editElements.score.strength;
  }

  checkForErrors() {
    AbilityScoreNames.forEachName( (name) => {
      this.editElements.score[name].validate(this.errorMessages);
    });
    this.editElements.proficiencyBonus.validate(this.errorMessages);
  }

  update() {
    AbilityScoreNames.forEachName( (name) => {
      this.saveAbilityScore(name);
    });
  }

  saveAbilityScore(abilityScoreName) {
    let scoreEditElement = this.editElements.score[abilityScoreName];
    let modifierEditElement = this.editElements.modifier[abilityScoreName];
    let scoreShowElement = this.showElements.score[abilityScoreName];
    let modifierShowElement = this.showElements.modifier[abilityScoreName];

    scoreShowElement.textContent = scoreEditElement.value.toString();
    modifierShowElement.textContent = modifierEditElement.textContent;
  }
}

class AbilityScoresShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    AbilityScoreNames.forEachName( (name) => {
      this.score[name] = shadowRoot.getElementById(`${name}-score-show`);
      this.modifier[name] = shadowRoot.getElementById(`${name}-modifier-show`);
    });
  }
}

class AbilityScoresEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    AbilityScoreNames.forEachName( (name) => {
      this.score[name] = shadowRoot.getElementById(`${name}-score-edit`);
      this.modifier[name] = shadowRoot.getElementById(`${name}-modifier-edit`);
    });

    this.proficiencyBonus = shadowRoot.getElementById('proficiency-bonus-input');
  }
}
