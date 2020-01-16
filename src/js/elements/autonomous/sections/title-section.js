import * as sectionModule from './section.js';
import CurrentContext from '../../../models/current-context.js';

const title = CurrentContext.creature.title;

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
      title.fullName = fullName;
      this.dispatchCreatureNameChangedEvent();
    }
  }

  onInputShortName() {
    title.shortName = this.editElements.shortName.value;
    this.dispatchCreatureNameChangedEvent();
  }

  onInputProperNoun() {
    title.isProperNoun = this.editElements.properNoun.checked;
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
        creatureName: title.fullName,
        shortName: title.shortName,
        isProperNoun: title.isProperNoun
      }
    });
    this.dispatchEvent(changeEvent);
  }

  checkForErrors() {
    this.editElements.fullName.value = this.editElements.fullName.value.trim();
    this.editElements.fullName.validate(this.errorMessages);
  }

  updateModel() {
    title.fullName = this.editElements.fullName.value;
    title.shortName = this.editElements.shortName.value;
    title.isProperNoun = this.editElements.properNoun.checked;
  }

  updateView() {
    this.editElements.fullName.value = title.fullName;
    this.showElements.title.textContent = title.fullName;
  }

  exportToJson() {
    return title.toJson();
  }

  exportToHtml() {
    return title.toHtml();
  }

  exportToHomebrewery() {
    return title.toHomebrewery();
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
