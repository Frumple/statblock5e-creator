import PropertyListSection from './property-list-section.js';

export default class LanguagesSection extends PropertyListSection {
  static get elementName() { return 'languages-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'languages-section',
      'src/html/elements/autonomous/sections/languages-section.html');
  }

  constructor() {
    super(LanguagesSection.templatePaths,
          'Languages',
          'Language');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.addItem('Common');
      this.updateShowSection();

      this.isInitialized = true;
    }
  }

  postProcessText(text) {
    if (text === '') {
      // This is an EM dash (U+2014).
      // This appears significantly wider than a normal dash.
      text = '—';
    }
    return text;
  }
}
