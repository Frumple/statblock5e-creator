import CustomDialog from './custom-dialog.js';

export default class OptionDialog extends CustomDialog {
  static get elementName() { return 'option-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'option-dialog',
      'src/html/elements/autonomous/dialogs/option-dialog.html');
  }

  constructor(templatePaths, parent = null) {
    super(templatePaths, parent);

    this.statusLabel = this.shadowRoot.getElementById('status-label');
    this.cancelButton = this.shadowRoot.getElementById('cancel-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.cancelButton.addEventListener('click', this.onClickCloseButton.bind(this));

      this.isInitialized = true;
    }
  }

  setStatus(text, type = null) {
    this.statusLabel.textContent = text;

    this.statusLabel.classList.remove('option-dialog__status-label_success');
    this.statusLabel.classList.remove('option-dialog__status-label_error');

    switch(type) {
    case 'success':
      this.statusLabel.classList.add('option-dialog__status-label_success');
      break;
    case 'error':
      this.statusLabel.classList.add('option-dialog__status-label_error');
      break;
    }
  }
}