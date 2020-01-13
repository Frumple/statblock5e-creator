import * as sectionModule from './section.js';
import Title from '../../../models/title.js';

export default class TitleSection extends sectionModule.Section {
  static get elementName() { return 'title-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'title-section',
      'src/html/elements/autonomous/sections/title-section.html');
  }

  constructor() {
    super(TitleSection.templatePaths,
          TitleShowElements,
          TitleEditElements);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.editElements.fullName.addEventListener('input', this.onInputCreatureName.bind(this));
      this.editElements.shortName.addEventListener('input', this.onInputShortName.bind(this));
      this.editElements.properNoun.addEventListener('input', this.onInputProperNoun.bind(this));
    }
  }

  onInputCreatureName() {
    const fullName = this.editElements.fullName.value;

    if (fullName !== '') {
      Title.fullName = fullName;
      this.dispatchCreatureNameChangedEvent();
    }
  }

  onInputShortName() {
    Title.shortName = this.editElements.shortName.value;
    this.dispatchCreatureNameChangedEvent();
  }

  onInputProperNoun() {
    Title.isProperNoun = this.editElements.properNoun.checked;
    this.dispatchCreatureNameChangedEvent();
  }

  get title() {
    return this.showElements.title.textContent;
  }

  dispatchCreatureNameChangedEvent() {
    const changeEvent = new CustomEvent('creatureNameChanged', {
      bubbles: true,
      composed: true,
      detail: {
        creatureName: Title.fullName,
        shortName: Title.shortName,
        isProperNoun: Title.isProperNoun
      }
    });
    this.dispatchEvent(changeEvent);
  }

  checkForErrors() {
    this.editElements.fullName.value = this.editElements.fullName.value.trim();
    this.editElements.fullName.validate(this.errorMessages);
  }

  updateModel() {
    Title.fullName = this.editElements.fullName.value;
    Title.shortName = this.editElements.shortName.value;
    Title.isProperNoun = this.editElements.properNoun.checked;
  }

  updateView() {
    this.editElements.fullName.value = Title.fullName;
    this.showElements.title.textContent = Title.title;
  }

  exportToJson() {
    return Title.toJson();
  }

  exportToHtml() {
    return Title.toHtml();
  }

  exportToHomebrewery() {
    return Title.toHomebrewery();
  }
}

class TitleShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.title = shadowRoot.getElementById('title-text');
  }
}

class TitleEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.fullName = shadowRoot.getElementById('full-name-input');
    this.shortName = shadowRoot.getElementById('short-name-input');
    this.properNoun = shadowRoot.getElementById('proper-noun-input');
  }

  get initiallySelectedElement() {
    return this.fullName;
  }
}
