import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';
import * as sectionModule from '/src/js/helpers/section.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierValue } from '/src/js/helpers/string-format.js';

export default class AbilityScoresSection extends sectionModule.Section {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'ability-scores-section',
      'src/html/sections/ability-scores-section.html');
  }

  constructor(element) {
    super(element,
          new AbilityScoresShowElements(element.shadowRoot),
          new AbilityScoresEditElements(element.shadowRoot));

    this.editElements.score[ AbilityScoreNames.STRENGTH ].addEventListener('input', () => {
      this.updateEditModeModifier( AbilityScoreNames.STRENGTH );
    });

    this.editElements.score[ AbilityScoreNames.DEXTERITY ].addEventListener('input', () => {
      this.updateEditModeModifier( AbilityScoreNames.DEXTERITY );
    });

    this.editElements.score[ AbilityScoreNames.CONSTITUTION ].addEventListener('input', () => {
      this.updateEditModeModifier( AbilityScoreNames.CONSTITUTION );
    });

    this.editElements.score[ AbilityScoreNames.INTELLIGENCE ].addEventListener('input', () => {
      this.updateEditModeModifier( AbilityScoreNames.INTELLIGENCE );
    });

    this.editElements.score[ AbilityScoreNames.WISDOM ].addEventListener('input', () => {
      this.updateEditModeModifier( AbilityScoreNames.WISDOM );
    });

    this.editElements.score[ AbilityScoreNames.CHARISMA ].addEventListener('input', () => {
      this.updateEditModeModifier( AbilityScoreNames.CHARISMA );
    });
  }

  updateEditModeModifier(abilityScoreName) {
    let scoreElement = this.editElements.score[ abilityScoreName ];
    let modifierElement = this.editElements.modifier[ abilityScoreName ];

    let score = parseInt(scoreElement.value);
    let modifier = AbilityScoresSection.calculateAbilityModifier(score);
    let formattedModifier = AbilityScoresSection.formatAbilityModifier(modifier);

    modifierElement.textContent = formattedModifier;
  }

  static formatAbilityModifier(abilityModifier) {
    if (isNaN(abilityModifier)) {
      return '';
    }

    let operator = getModifierOperator(abilityModifier);
    let value = getModifierValue(abilityModifier);

    return `${operator}${value}`;
  }

  static calculateAbilityModifier(abilityScore) {
    let score = parseInt(abilityScore, 10);
    return Math.floor((score - 10) / 2);
  }

  save() {
    Object.entries(AbilityScoreNames).forEach( ([key, value]) => {
      this.saveAbilityScore(value);
    });

    this.switchToShowMode();
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
