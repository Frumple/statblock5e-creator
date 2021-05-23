import CustomAutonomousElement from './custom-autonomous-element.js';

export default class SpellCategoryBox extends CustomAutonomousElement {
  static get elementName() { return 'spell-category-box'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'spell-category-box',
      'src/html/elements/autonomous/spell-category-box.html');
  }

  constructor(parent) {
    super(SpellCategoryBox.templatePaths, parent);

    this.container = this.shadowRoot.getElementById('container');
    this.heading = this.shadowRoot.getElementById('heading');
    this.propertyList = this.shadowRoot.getElementById('property-list');

    this.propertyList.singleItemName = 'spell';
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(isDisabled) {
    const containerDisabledClass = 'spell-category__container_disabled';

    if (isDisabled) {
      this.setAttribute('disabled', '');
      this.container.classList.add(containerDisabledClass);
    } else {
      this.removeAttribute('disabled');
      this.container.classList.remove(containerDisabledClass);
    }
  }
}