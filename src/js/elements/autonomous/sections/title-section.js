import { Section, ShowElements, EditElements } from './section.js';
import CurrentContext from '../../../models/current-context.js';
import { capitalizeFirstLetter } from '../../../helpers/string-formatter.js';

export default class TitleSection extends Section {
  static get elementName() { return 'title-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'title-section',
      'src/html/elements/autonomous/sections/title-section.html');
  }

  constructor() {
    super(TitleSection.templatePaths,
          'title',
          TitleShowElements,
          TitleEditElements);
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
      CurrentContext.creature.title.fullName = fullName;
      this.dispatchCreatureNameChangedEvent();
    }
  }

  onInputShortName() {
    CurrentContext.creature.title.shortName = this.editElements.shortName.value;
    this.dispatchCreatureNameChangedEvent();
  }

  onInputProperNoun() {
    CurrentContext.creature.title.isProperNoun = this.editElements.properNoun.checked;
    this.dispatchCreatureNameChangedEvent();
  }

  get title() {
    return this.showElements.title.textContent;
  }

  dispatchCreatureNameChangedEvent() {
    const titleModel = CurrentContext.creature.title;
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
    this.editElements.fullName.value = capitalizeFirstLetter(this.editElements.fullName.value.trim());
    this.editElements.fullName.validate(this.errorMessages);
  }

  updateModel() {
    const title = CurrentContext.creature.title;
    title.fullName = this.editElements.fullName.value;
    title.shortName = this.editElements.shortName.value;
    title.isProperNoun = this.editElements.properNoun.checked;
  }

  updateEditModeView() {
    const title = CurrentContext.creature.title;
    this.editElements.fullName.value = title.fullName;
    this.editElements.shortName.value = title.shortName;
    this.editElements.properNoun.checked = title.isProperNoun;
  }

  updateShowModeView() {
    this.showElements.title.textContent = CurrentContext.creature.title.fullName;
  }
}

class TitleShowElements extends ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.title = shadowRoot.getElementById('title-text');
  }
}

class TitleEditElements extends EditElements {
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
