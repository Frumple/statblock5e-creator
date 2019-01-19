import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';
import * as sectionModule from '/src/js/components/base/section.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

export default class AbilityScoresSection extends sectionModule.Section {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'ability-scores-section',
      'src/html/sections/ability-scores-section.html');
  }

  constructor(element) {
    super(element,
          new AbilityScoresShowElements(element.shadowRoot),
          new AbilityScoresEditElements(element.shadowRoot));

    this.editElements.score[ AbilityScoreNames.STRENGTH ].addEventListener('input', () => {
      this.onAbilityScoreChange( AbilityScoreNames.STRENGTH );
    });

    this.editElements.score[ AbilityScoreNames.DEXTERITY ].addEventListener('input', () => {
      this.onAbilityScoreChange( AbilityScoreNames.DEXTERITY );
    });

    this.editElements.score[ AbilityScoreNames.CONSTITUTION ].addEventListener('input', () => {
      this.onAbilityScoreChange( AbilityScoreNames.CONSTITUTION );
    });

    this.editElements.score[ AbilityScoreNames.INTELLIGENCE ].addEventListener('input', () => {
      this.onAbilityScoreChange( AbilityScoreNames.INTELLIGENCE );
    });

    this.editElements.score[ AbilityScoreNames.WISDOM ].addEventListener('input', () => {
      this.onAbilityScoreChange( AbilityScoreNames.WISDOM );
    });

    this.editElements.score[ AbilityScoreNames.CHARISMA ].addEventListener('input', () => {
      this.onAbilityScoreChange( AbilityScoreNames.CHARISMA );
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
      this.element.dispatchEvent(changeEvent);
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
    Object.entries(AbilityScoreNames).forEach( ([key, value]) => {
      this.editElements.score[ value ].validate(this.error_messages);
    });
    this.editElements.proficiency_bonus.validate(this.error_messages);
  }

  update() {
    Object.entries(AbilityScoreNames).forEach( ([key, value]) => {
      this.saveAbilityScore(value);
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

    this.score[ AbilityScoreNames.STRENGTH ] = shadowRoot.getElementById('strength-score-show');
    this.score[ AbilityScoreNames.DEXTERITY ] = shadowRoot.getElementById('dexterity-score-show');
    this.score[ AbilityScoreNames.CONSTITUTION ] = shadowRoot.getElementById('constitution-score-show');
    this.score[ AbilityScoreNames.INTELLIGENCE ] = shadowRoot.getElementById('intelligence-score-show');
    this.score[ AbilityScoreNames.WISDOM ] = shadowRoot.getElementById('wisdom-score-show');
    this.score[ AbilityScoreNames.CHARISMA ] = shadowRoot.getElementById('charisma-score-show');

    this.modifier[ AbilityScoreNames.STRENGTH ] = shadowRoot.getElementById('strength-modifier-show');
    this.modifier[ AbilityScoreNames.DEXTERITY ]  = shadowRoot.getElementById('dexterity-modifier-show');
    this.modifier[ AbilityScoreNames.CONSTITUTION ]  = shadowRoot.getElementById('constitution-modifier-show');
    this.modifier[ AbilityScoreNames.INTELLIGENCE ]  = shadowRoot.getElementById('intelligence-modifier-show');
    this.modifier[ AbilityScoreNames.WISDOM ]  = shadowRoot.getElementById('wisdom-modifier-show');
    this.modifier[ AbilityScoreNames.CHARISMA ]  = shadowRoot.getElementById('charisma-modifier-show');
  }
}

class AbilityScoresEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    this.score[ AbilityScoreNames.STRENGTH ] = shadowRoot.getElementById('strength-score-edit');
    this.score[ AbilityScoreNames.DEXTERITY ] = shadowRoot.getElementById('dexterity-score-edit');
    this.score[ AbilityScoreNames.CONSTITUTION ] = shadowRoot.getElementById('constitution-score-edit');
    this.score[ AbilityScoreNames.INTELLIGENCE ] = shadowRoot.getElementById('intelligence-score-edit');
    this.score[ AbilityScoreNames.WISDOM ] = shadowRoot.getElementById('wisdom-score-edit');
    this.score[ AbilityScoreNames.CHARISMA ] = shadowRoot.getElementById('charisma-score-edit');

    this.modifier[ AbilityScoreNames.STRENGTH ] = shadowRoot.getElementById('strength-modifier-edit');
    this.modifier[ AbilityScoreNames.DEXTERITY ] = shadowRoot.getElementById('dexterity-modifier-edit');
    this.modifier[ AbilityScoreNames.CONSTITUTION ] = shadowRoot.getElementById('constitution-modifier-edit');
    this.modifier[ AbilityScoreNames.INTELLIGENCE ] = shadowRoot.getElementById('intelligence-modifier-edit');
    this.modifier[ AbilityScoreNames.WISDOM ] = shadowRoot.getElementById('wisdom-modifier-edit');
    this.modifier[ AbilityScoreNames.CHARISMA ] = shadowRoot.getElementById('charisma-modifier-edit');

    this.proficiency_bonus = shadowRoot.getElementById('proficiency-bonus-input');
  }
}
