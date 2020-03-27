import OptionDialog from './option-dialog.js';

export default class ResetDialog extends OptionDialog {
  static get elementName() { return 'reset-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'reset-dialog',
      'src/html/elements/autonomous/dialogs/reset-dialog.html');
  }

  constructor() {
    super(ResetDialog.templatePaths);

    this.resetButton = this.shadowRoot.getElementById('reset-button');

    this.resetCallback = null;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.resetButton.addEventListener('click', this.onClickResetButton.bind(this));

      this.isInitialized = true;
    }
  }

  onClickResetButton() {
    this.resetCallback();
    this.closeModal();
  }

  launch(resetCallback) {
    this.resetCallback = resetCallback;
    this.showModal();
  }
}