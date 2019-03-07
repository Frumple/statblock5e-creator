import BlockListSection from './block-list-section.js';

export default class ActionsSection extends BlockListSection {
  static get elementName() { return 'actions-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'actions-section',
      'src/html/elements/autonomous/sections/actions-section.html');
  }

  constructor() {
    super(ActionsSection.templatePaths,
          'Action');

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }
}