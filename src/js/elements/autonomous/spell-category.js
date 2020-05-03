import CustomAutonomousElement from './custom-autonomous-element.js';

export default class SpellCategory extends CustomAutonomousElement {
  static get elementName() { return 'spell-category'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'spell-category',
      'src/html/elements/autonomous/spell-category.html');
  }

  constructor() {
    super(SpellCategory.templatePaths);

    this.container = this.shadowRoot.getElementById('container');
    this.heading = this.shadowRoot.getElementById('heading');
    this.propertyList = this.shadowRoot.getElementById('property-list');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }
}