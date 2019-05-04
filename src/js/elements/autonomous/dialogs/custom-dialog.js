import CustomAutonomousElement from '../custom-autonomous-element.js';
import isRunningInNode from '../../../helpers/is-running-in-node.js';

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
    if (isRunningInNode) {
      this.open = true;
    } else {
      this.dialog.showModal();
    }
  }

  closeModal() {
    if (isRunningInNode) {
      this.open = false;
    } else {
      this.dialog.close();
    }
  }
}