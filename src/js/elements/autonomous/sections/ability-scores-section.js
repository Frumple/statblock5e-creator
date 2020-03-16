import * as sectionModule from './section.js';
import CurrentContext from '../../../models/current-context.js';

export default class AbilityScoresSection extends sectionModule.Section {
  static get elementName() { return 'ability-scores-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'ability-scores-section',
      'src/html/elements/autonomous/sections/ability-scores-section.html');
  }

  constructor() {
    super(AbilityScoresSection.templatePaths,
          'abilities',
          AbilityScoresShowElements,
          AbilityScoresEditElements);

    for (const key of CurrentContext.creature.abilities.keys) {
      this.editElements.score[key].addEventListener('input', this.onInputAbilityScore.bind(this, key));
    }
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

  checkForErrors() {
    for (const key of CurrentContext.creature.abilities.keys) {
      this.editElements.score[key].validate(this.errorMessages);
    }
  }

  updateModel() {
    for (const key of CurrentContext.creature.abilities.keys) {
      this.updateModelAbilityScore(key);
    }
  }

  updateModelAbilityScore(key) {
    const score = this.editElements.score[key].valueAsInt;

    if (score !== null) {
      CurrentContext.creature.abilities.abilities[key].score = score;
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

  updateEditModeView() {
    for (const key of CurrentContext.creature.abilities.keys) {
      this.updateEditModeViewAbilityScore(key);
      this.updateEditModeViewAbilityModifier(key);
    }
  }

  updateEditModeViewAbilityScore(key) {
    this.editElements.score[key].value = CurrentContext.creature.abilities.abilities[key].score;

  }

  updateEditModeViewAbilityModifier(key) {
    this.editElements.modifier[key].textContent = CurrentContext.creature.abilities.abilities[key].formattedModifier;
  }

  updateShowModeView() {
    for (const key of CurrentContext.creature.abilities.keys) {
      this.updateShowModeViewAbility(key);
    }
  }

  updateShowModeViewAbility(key) {
    const ability = CurrentContext.creature.abilities.abilities[key];

    this.showElements.score[key].textContent = ability.score;
    this.showElements.modifier[key].textContent = ability.formattedModifier;
  }

  importFromJson(json) {
    CurrentContext.creature.abilities.fromJson(json);
    this.updateView();
  }
}

class AbilityScoresShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.score = {};
    this.modifier = {};

    for (const key of CurrentContext.creature.abilities.keys) {
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

    for (const key of CurrentContext.creature.abilities.keys) {
      this.score[key] = shadowRoot.getElementById(`${key}-score-edit`);
      this.modifier[key] = shadowRoot.getElementById(`${key}-modifier-edit`);
    }
  }

  get initiallySelectedElement() {
    return this.score.strength;
  }
}
