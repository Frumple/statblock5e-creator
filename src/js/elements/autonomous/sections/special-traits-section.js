import TextBlockListSection from '/src/js/elements/autonomous/sections/text-block-list-section.js';

export default class SpecialTraitsSection extends TextBlockListSection {
  static get elementName() { return 'special-traits-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'special-traits-section',
      'src/html/elements/autonomous/sections/special-traits-section.html');
  }

  constructor() {
    super(SpecialTraitsSection.templatePaths);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }
}