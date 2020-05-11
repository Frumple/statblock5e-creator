import CustomAutonomousElement from './custom-autonomous-element.js';

import isRunningInJsDom from '../../helpers/is-running-in-jsdom.js';
import PropertyList from './lists/property-list.js';

export default class SpellCategoryBox extends CustomAutonomousElement {
  static get elementName() { return 'spell-category-box'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'spell-category-box',
      'src/html/elements/autonomous/spell-category-box.html');
  }

  constructor() {
    super(SpellCategoryBox.templatePaths);

    if (isRunningInJsDom) {
      this.container = document.createElement('div');
      this.heading = document.createElement('label');
      this.propertyList = new PropertyList(this);
    } else {
      this.container = this.shadowRoot.getElementById('container');
      this.heading = this.shadowRoot.getElementById('heading');
      this.propertyList = this.shadowRoot.getElementById('property-list');
    }

    this.propertyList.singleItemName = 'spell';
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }
}