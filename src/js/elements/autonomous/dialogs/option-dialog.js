import CustomDialog from './custom-dialog.js';

const labelSuccessClass = 'option-dialog__status-label_success';
const labelErrorClass = 'option-dialog__status-label_error';

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
    super.connectedCallback();

    this.cancelButton.addEventListener('click', this.onClickCloseButton.bind(this));
  }

  get statusText() {
    return this.statusLabel.textContent;
  }

  get statusType() {
    if (this.statusLabel.classList.contains(labelSuccessClass)) {
      return 'success';
    }
    else if (this.statusLabel.classList.contains(labelErrorClass)) {
      return 'error';
    }

    return null;
  }

  setStatus(text, type = null) {
    this.statusLabel.textContent = text;

    this.statusLabel.classList.remove(labelSuccessClass);
    this.statusLabel.classList.remove(labelErrorClass);

    switch(type) {
    case 'success':
      this.statusLabel.classList.add(labelSuccessClass);
      break;
    case 'error':
      this.statusLabel.classList.add(labelErrorClass);
      break;
    }
  }
}