import * as sectionModule from './section.js';
import CurrentContext from '../../../models/current-context.js';

const titleModel = CurrentContext.creature.title;

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

    this.classModel = CurrentContext.creature.title;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.editElements.fullName.addEventListener('input', this.onInputCreatureName.bind(this));
      this.editElements.shortName.addEventListener('input', this.onInputShortName.bind(this));
      this.editElements.properNoun.addEventListener('input', this.onInputProperNoun.bind(this));
    }
  }

  onInputCreatureName() {
    const fullName = this.editElements.fullName.value;

    if (fullName !== '') {
      titleModel.fullName = fullName;
      this.dispatchCreatureNameChangedEvent();
    }
  }

  onInputShortName() {
    titleModel.shortName = this.editElements.shortName.value;
    this.dispatchCreatureNameChangedEvent();
  }

  onInputProperNoun() {
    titleModel.isProperNoun = this.editElements.properNoun.checked;
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
        creatureName: titleModel.fullName,
        shortName: titleModel.shortName,
        isProperNoun: titleModel.isProperNoun
      }
    });
    this.dispatchEvent(changeEvent);
  }

  checkForErrors() {
    this.editElements.fullName.value = this.editElements.fullName.value.trim();
    this.editElements.fullName.validate(this.errorMessages);
  }

  updateModel() {
    titleModel.fullName = this.editElements.fullName.value;
    titleModel.shortName = this.editElements.shortName.value;
    titleModel.isProperNoun = this.editElements.properNoun.checked;
  }

  updateEditModeView() {
    this.editElements.fullName.value = titleModel.fullName;
  }

  updateShowModeView() {
    this.showElements.title.textContent = titleModel.fullName;
  }

  exportToJson() {
    return titleModel.toJson();
  }

  exportToHtml() {
    return titleModel.toHtml();
  }

  exportToHomebrewery() {
    return titleModel.toHomebrewery();
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
