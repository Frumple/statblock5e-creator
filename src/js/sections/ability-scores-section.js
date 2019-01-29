import * as sectionModule from '/src/js/base/section.js';
import Abilities from '/src/js/helpers/abilities.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

export default class AbilityScoresSection extends sectionModule.Section {
  static get elementName() { return 'ability-scores-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'ability-scores-section',
      'src/html/sections/ability-scores-section.html');
  }

  constructor() {
    super(AbilityScoresSection.templatePaths,
          AbilityScoresShowElements,
          AbilityScoresEditElements);

    for (const key of Abilities.keys) {
      this.editElements.score[key].addEventListener('input', () => {
        this.onAbilityScoreChange(key);
      });
    }

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

  get initialSelectedEditElement() {
    return this.editElements.score.strength;
  }

  checkForErrors() {
    for (const key of Abilities.keys) {
      this.editElements.score[key].validate(this.errorMessages);
    }
    this.editElements.proficiencyBonus.validate(this.errorMessages);
  }

  update() {
    for (const key of Abilities.keys) {
      this.saveAbilityScore(key);
    }
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
}
