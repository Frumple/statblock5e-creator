import PropertyListSection from './property-list-section.js';
import Languages from '../../../models/lists/property/languages.js';
import isRunningInNode from '../../../helpers/is-running-in-node.js';

export default class LanguagesSection extends PropertyListSection {
  static get elementName() { return 'languages-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'languages-section',
      'src/html/elements/autonomous/sections/languages-section.html');
  }

  constructor() {
    super(LanguagesSection.templatePaths,
          Languages);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      if (! isRunningInNode) {
        this.addItem('Common');
        this.save();
      }

      this.isInitialized = true;
    }
  }
}
