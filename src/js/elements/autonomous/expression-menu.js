import CustomAutonomousElement from './custom-autonomous-element.js';

export default class ExpressionMenu extends CustomAutonomousElement {
  static get elementName() { return 'expression-menu'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'expression-menu',
      'src/html/elements/autonomous/expression-menu.html');
  }

  constructor() {
    super(ExpressionMenu.templatePaths);

    this.items = this.shadowRoot.getElementById('expression-menu-items');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.items.addEventListener('click', this.onClickItems.bind(this));

      this.initialized = true;
    }
  }

  async onClickItems() {
    // When an item is clicked, apply the hidden style, wait briefly, then remove the hidden style.
    // The delay is necessary to ensure that the items are actually hidden.
    this.items.style.visibility = 'hidden';
    await new Promise(resolve => setTimeout(resolve, 100));
    this.items.style.visibility = '';
  }
}