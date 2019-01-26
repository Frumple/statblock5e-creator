import * as sectionModule from '/src/js/base/section.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';

export default class LanguagesSection extends sectionModule.Section {
  static get elementName() { return 'languages-section'; }
  static get templatePath() { return 'src/html/sections/languages-section.html'; }

  constructor() {
    super(LanguagesSection.elementName,
          LanguagesShowElements,
          LanguagesEditElements);

  }

  get initialSelectedElement() {
    return this.editElements.input;
  }

  checkForErrors() {

  }

  update() {

  }
}

class LanguagesShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('languages-text');
  }
}

class LanguagesEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.input = shadowRoot.getElementById('languages-input');
    this.addButton = shadowRoot.getElementById('languages-add-button');
  }
}
