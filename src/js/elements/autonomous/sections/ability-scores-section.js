import * as sectionModule from './section.js';
import CurrentContext from '../../../models/current-context.js';

const abilitiesModel = CurrentContext.creature.abilities;
const proficiencyBonusModel = CurrentContext.creature.proficiencyBonus;

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

    for (const key of abilitiesModel.keys) {
      this.editElements.score[key].addEventListener('input', this.onInputAbilityScore.bind(this, key));
    }

    this.editElements.proficiencyBonus.addEventListener('input', this.onInputProficiencyBonus.bind(this));
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }

  onInputAbilityScore(key) {
    this.updateModelAbilityScore(key);
    this.updateEditModeViewAbilityModifier(key);
    this.updateShowModeViewAbility(key);
  }

  onInputProficiencyBonus() {
    this.updateModelProficiencyBonus();
  }

  checkForErrors() {
    for (const key of abilitiesModel.keys) {
      this.editElements.score[key].validate(this.errorMessages);
    }
    this.editElements.proficiencyBonus.validate(this.errorMessages);
  }

  updateModel() {
    for (const key of abilitiesModel.keys) {
      this.updateModelAbilityScore(key);
    }

    this.updateModelProficiencyBonus();
  }

  updateModelAbilityScore(key) {
    const score = this.editElements.score[key].valueAsInt;

    if (score !== null) {
      abilitiesModel.abilities[key].score = score;
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

    if (proficiencyBonus !== null) {
      proficiencyBonusModel.proficiencyBonus = proficiencyBonus;
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

  updateEditModeView() {
    for (const key of abilitiesModel.keys) {
      this.updateEditModeViewAbilityScore(key);
      this.updateEditModeViewAbilityModifier(key);
    }

    this.editElements.proficiencyBonus.value = proficiencyBonusModel.proficiencyBonus;
  }

  updateEditModeViewAbilityScore(key) {
    this.editElements.score[key].value = abilitiesModel.abilities[key].score;

  }

  updateEditModeViewAbilityModifier(key) {
    this.editElements.modifier[key].textContent = abilitiesModel.abilities[key].formattedModifier;
  }

  updateShowModeView() {
    for (const key of abilitiesModel.keys) {
      this.updateShowModeViewAbility(key);
    }
  }

  updateShowModeViewAbility(key) {
    const ability = abilitiesModel.abilities[key];

    this.showElements.score[key].textContent = ability.score;
    this.showElements.modifier[key].textContent = ability.formattedModifier;
  }

  exportToJson() {
    return {
      abilityScores: abilitiesModel.toJson(),
      proficiencyBonus: proficiencyBonusModel.toJson()
    };
  }

  exportToHtml() {
    return abilitiesModel.toHtml();
  }

  exportToHomebrewery() {
    return abilitiesModel.toHomebrewery();
  }
}

class AbilityScoresShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    for (const key of abilitiesModel.keys) {
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

    for (const key of abilitiesModel.keys) {
      this.score[key] = shadowRoot.getElementById(`${key}-score-edit`);
      this.modifier[key] = shadowRoot.getElementById(`${key}-modifier-edit`);
    }

    this.proficiencyBonus = shadowRoot.getElementById('proficiency-bonus-input');
  }

  get initiallySelectedElement() {
    return this.score.strength;
  }
}
