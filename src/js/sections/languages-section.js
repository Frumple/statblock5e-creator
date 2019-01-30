import AttributeListSection from '/src/js/sections/attribute-list-section.js';

export default class LanguagesSection extends AttributeListSection {
  static get elementName() { return 'languages-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'languages-section',
      'src/html/sections/languages-section.html');
  }

  constructor() {
    super(LanguagesSection.templatePaths,
          'Languages');

    this.listInitialized = false;
  }

  connectedCallback() {
    if (this.isConnected) {
      if (! this.listInitialized) {

        this.addItem('Common');
        this.update();
        this.listInitialized = true;
      }
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
