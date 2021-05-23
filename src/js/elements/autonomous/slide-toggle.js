import CustomAutonomousElement from './custom-autonomous-element.js';

export default class SlideToggle extends CustomAutonomousElement {
  static get elementName() { return 'slide-toggle'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'slide-toggle',
      'src/html/elements/autonomous/slide-toggle.html');
  }

  constructor() {
    super(SlideToggle.templatePaths);

    this.checkbox = this.shadowRoot.getElementById('slide-toggle-checkbox');
    this.control = this.shadowRoot.getElementById('slide-toggle-control');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.control.dataset.uncheckedText = this.dataset.uncheckedText ? this.dataset.uncheckedText : 'Off';
      this.control.dataset.checkedText = this.dataset.checkedText ? this.dataset.checkedText : 'On';

      const orientationClass = this.dataset.orientation === 'vertical' ? 'slide-toggle__vertical-control' : 'slide-toggle__horizontal-control';
      this.control.classList.add(orientationClass);

      this.checked = this.hasAttribute('checked');

      this.isInitialized = true;
    }
  }

  get checked() {
    return this.checkbox.checked;
  }

  set checked(isChecked) {
    this.checkbox.checked = isChecked;
  }

  addEventListener(type, listener) {
    this.checkbox.addEventListener(type, listener);
  }

  click() {
    this.checkbox.click();
  }
}