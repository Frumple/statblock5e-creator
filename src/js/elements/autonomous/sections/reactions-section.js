import * as blockListSectionModule from './block-list-section.js';

export default class ReactionsSection extends blockListSectionModule.BlockListSection {
  static get elementName() { return 'reactions-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'reactions-section',
      'src/html/elements/autonomous/sections/reactions-section.html');
  }

  constructor() {
    super(ReactionsSection.templatePaths,
          'Reaction');

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }

  exportToHtml() {
    const fragment = super.exportToHtml();

    const sectionHeading = document.createElement('h3');
    sectionHeading.textContent = 'Reactions';
    fragment.insertBefore(sectionHeading, fragment.firstElementChild);

    return fragment;
  }
}