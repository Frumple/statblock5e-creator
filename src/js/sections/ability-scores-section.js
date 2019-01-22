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

    AbilityScoreNames.forEachKey( (key) => {
      this.editElements.score[key].addEventListener('input', () => {
        this.onAbilityScoreChange(key);
      });
    });

    this.editElements.proficiency_bonus.addEventListener('input', () => {
      this.onProficiencyBonusChange();
    });
  }

  onAbilityScoreChange(abilityScoreKey) {
    let scoreElement = this.editElements.score[abilityScoreKey];
    let score = parseInt(scoreElement.value, 10);
    let modifier = AbilityScoresSection.calculateAbilityModifier(score);

    this.updateEditModeModifier(abilityScoreKey, modifier);

    if (! isNaN(score)) {
      let changeEvent = new CustomEvent('abilityScoreChanged', {
        bubbles: true,
        composed: true,
        detail: {
          abilityScoreKey: abilityScoreKey,
          abilityScore: score,
          abilityModifier: modifier
        }
      });
      this.dispatchEvent(changeEvent);
    }
  }

  onProficiencyBonusChange() {
    let proficiencyBonusElement = this.editElements.proficiency_bonus;
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

  updateEditModeModifier(abilityScoreKey, abilityModifier) {
    let modifierElement = this.editElements.modifier[abilityScoreKey];
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

  checkForErrors() {
    AbilityScoreNames.forEachKey( (key) => {
      this.editElements.score[key].validate(this.error_messages);
    });
    this.editElements.proficiency_bonus.validate(this.error_messages);
  }

  update() {
    AbilityScoreNames.forEachKey( (key) => {
      this.saveAbilityScore(key);
    });
  }

  saveAbilityScore(abilityScoreKey) {
    let scoreEditElement = this.editElements.score[abilityScoreKey];
    let modifierEditElement = this.editElements.modifier[abilityScoreKey];
    let scoreShowElement = this.showElements.score[abilityScoreKey];
    let modifierShowElement = this.showElements.modifier[abilityScoreKey];

    scoreShowElement.textContent = scoreEditElement.value.toString();
    modifierShowElement.textContent = modifierEditElement.textContent;
  }
}

class AbilityScoresShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    AbilityScoreNames.forEachEntry( ([key, value]) => {
      this.score[key] = shadowRoot.getElementById(`${value.name}-score-show`);
      this.modifier[key] = shadowRoot.getElementById(`${value.name}-modifier-show`);
    });
  }
}

class AbilityScoresEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    AbilityScoreNames.forEachEntry( ([key, value]) => {
      this.score[key] = shadowRoot.getElementById(`${value.name}-score-edit`);
      this.modifier[key] = shadowRoot.getElementById(`${value.name}-modifier-edit`);
    });

    this.proficiency_bonus = shadowRoot.getElementById('proficiency-bonus-input');
  }
}
