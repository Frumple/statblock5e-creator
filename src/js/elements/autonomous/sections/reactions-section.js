import { BlockListSection } from './block-list-section.js';

export default class ReactionsSection extends BlockListSection {
  static get elementName() { return 'reactions-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'reactions-section',
      'src/html/elements/autonomous/sections/reactions-section.html');
  }

  constructor() {
    super(ReactionsSection.templatePaths,
          'reactions');

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }
}