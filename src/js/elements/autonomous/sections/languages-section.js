import PropertyListSection from './property-list-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class LanguagesSection extends PropertyListSection {
  static get elementName() { return 'languages-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'languages-section',
      'src/html/elements/autonomous/sections/languages-section.html');
  }

  constructor() {
    super(LanguagesSection.templatePaths,
          CurrentContext.creature.languages);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }
}
