import { PropertyListSection, PropertyListShowElements, PropertyListEditElements } from './property-list-section.js';
import CurrentContext from '../../../models/current-context.js';
import Languages from '../../../data/languages.js';

export default class LanguagesSection extends PropertyListSection {
  static get elementName() { return 'languages-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'languages-section',
      'src/html/elements/autonomous/sections/languages-section.html');
  }

  constructor() {
    super(LanguagesSection.templatePaths,
          'languages',
          LanguagesSectionShowElements,
          LanguagesSectionEditElements);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.editElements.propertyList.setDataList(Languages);

      this.isInitialized = true;
    }
  }

  updateModel() {
    super.updateModel();

    CurrentContext.creature.languages.telepathy = this.editElements.telepathy.valueAsInt;
  }

  updateEditModeView() {
    super.updateEditModeView();

    this.editElements.telepathy.value = CurrentContext.creature.languages.telepathy;
  }
}

class LanguagesSectionShowElements extends PropertyListShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class LanguagesSectionEditElements extends PropertyListEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.telepathy = shadowRoot.getElementById('telepathy-input');
  }
}