import CustomAutonomousElement from './custom-autonomous-element.js';

const hiddenClass = 'getting-started-help-box_hidden';

export default class GettingStartedHelpBox extends CustomAutonomousElement {
  static get elementName() { return 'getting-started-help-box'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'getting-started-help-box',
      'src/html/elements/autonomous/getting-started-help-box.html');
  }

  constructor() {
    super(GettingStartedHelpBox.templatePaths);

    this.container = this.shadowRoot.getElementById('container');
    this.closeButton = this.shadowRoot.getElementById('close-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.closeButton.addEventListener('click', this.onClickCloseButton.bind(this));

      this.isInitialized = true;
    }
  }

  onClickCloseButton() {
    const event = new CustomEvent('toggleGettingStarted', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  set visible(isVisible) {
    isVisible ? this.container.classList.remove(hiddenClass) : this.container.classList.add(hiddenClass);
  }

  get visible() {
    return ! this.container.classList.contains(hiddenClass);
  }
}