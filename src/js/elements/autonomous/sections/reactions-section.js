import * as blockListSectionModule from './block-list-section.js';
import Reactions from '../../../stats/lists/block/reactions.js';

export default class ReactionsSection extends blockListSectionModule.BlockListSection {
  static get elementName() { return 'reactions-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'reactions-section',
      'src/html/elements/autonomous/sections/reactions-section.html');
  }

  constructor() {
    super(ReactionsSection.templatePaths,
          Reactions);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }
}