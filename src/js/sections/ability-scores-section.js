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

    Object.entries(AbilityScoreNames).forEach( ([key, abilityScoreName]) => {
      this.editElements.score[abilityScoreName].addEventListener('input', () => {
        this.onAbilityScoreChange(abilityScoreName);
      });
    });
  }

  onAbilityScoreChange(abilityScoreName) {
    let scoreElement = this.editElements.score[abilityScoreName];
    let score = parseInt(scoreElement.value, 10);
    let modifier = AbilityScoresSection.calculateAbilityModifier(score);

    this.updateEditModeModifier(abilityScoreName, modifier);

    if (score) {
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

  updateEditModeModifier(abilityScoreName, abilityModifier) {
    let modifierElement = this.editElements.modifier[ abilityScoreName ];
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
    Object.entries(AbilityScoreNames).forEach( ([key, abilityScoreName]) => {
      this.editElements.score[abilityScoreName].validate(this.error_messages);
    });
    this.editElements.proficiency_bonus.validate(this.error_messages);
  }

  update() {
    Object.entries(AbilityScoreNames).forEach( ([key, abilityScoreName]) => {
      this.saveAbilityScore(abilityScoreName);
    });
  }

  saveAbilityScore(abilityScoreName) {
    let scoreEditElement = this.editElements.score[ abilityScoreName ];
    let modifierEditElement = this.editElements.modifier[ abilityScoreName ];
    let scoreShowElement = this.showElements.score[ abilityScoreName ];
    let modifierShowElement = this.showElements.modifier[ abilityScoreName ];

    scoreShowElement.textContent = scoreEditElement.value.toString();
    modifierShowElement.textContent = modifierEditElement.textContent;
  }
}

class AbilityScoresShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    Object.entries(AbilityScoreNames).forEach( ([key, abilityScoreName]) => {
      this.score[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-score-show`);
      this.modifier[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-modifier-show`);
    });
  }
}

class AbilityScoresEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    Object.entries(AbilityScoreNames).forEach( ([key, abilityScoreName]) => {
      this.score[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-score-edit`);
      this.modifier[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-modifier-edit`);
    });

    this.proficiency_bonus = shadowRoot.getElementById('proficiency-bonus-input');
  }
}
