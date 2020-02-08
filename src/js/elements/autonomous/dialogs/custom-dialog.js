import CustomAutonomousElement from '../custom-autonomous-element.js';
import isRunningInJsdom from '../../../helpers/is-running-in-jsdom.js';

export default class CustomDialog extends CustomAutonomousElement {
  static get elementName() { return 'custom-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'custom-dialog',
      'src/html/elements/autonomous/dialogs/custom-dialog.html');
  }

  constructor(templatePaths, parent = null) {
    super(templatePaths, parent);

    this.dialog = this.shadowRoot.getElementById('dialog');
    this.closeButton = this.shadowRoot.getElementById('close-button');
  }

  connectedCallback() {
    this.closeButton.addEventListener('click', this.onClickCloseButton.bind(this));
  }

  onClickCloseButton() {
    this.closeModal();
  }

  set open(isOpen) {
    if (isOpen) {
      this.dialog.setAttribute('open', '');
    } else {
      this.dialog.removeAttribute('open');
    }
  }

  get open() {
    return this.dialog.getAttribute('open');
  }

  showModal() {
    if (isRunningInJsdom) {
      this.open = true;
    } else {
      this.dialog.showModal();
    }
  }

  closeModal() {
    if (isRunningInJsdom) {
      this.open = false;
    } else {
      this.dialog.close();
    }
  }
}