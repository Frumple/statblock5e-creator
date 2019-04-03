import * as blockListSectionModule from './block-list-section.js';
import SpecialTraits from '../../../stats/lists/block/special-traits.js';

export default class SpecialTraitsSection extends blockListSectionModule.BlockListSection {
  static get elementName() { return 'special-traits-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'special-traits-section',
      'src/html/elements/autonomous/sections/special-traits-section.html');
  }

  constructor() {
    super(SpecialTraitsSection.templatePaths,
          SpecialTraits);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }
}