import * as sectionModule from '/src/js/base/section.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';

export default class SavingThrowsSection extends sectionModule.Section {
  static get elementName() { return 'saving-throws-section'; }
  static get templatePath() { return 'src/html/sections/saving-throws-section.html'; }

  constructor() {
    super(SavingThrowsSection.elementName,
          SavingThrowsShowElements,
          SavingThrowsEditElements);

  }

  checkForErrors() {

  }

  update() {

  }
}

class SavingThrowsShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('saving-throws-text');
  }
}

class SavingThrowsEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.input = {};
    this.proficiency = {};
    this.override = {};

    Object.entries(AbilityScoreNames).forEach( ([key, abilityScoreName]) => {
      this.input[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-input`);
      this.proficiency[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-proficiency`);
      this.override[abilityScoreName] = shadowRoot.getElementById(`${abilityScoreName}-override`);
    });
  }
}
