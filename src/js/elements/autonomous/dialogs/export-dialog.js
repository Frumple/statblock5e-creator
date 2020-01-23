import CustomDialog from './custom-dialog.js';

import { startFileDownload, ClipboardWrapper } from '../../../helpers/export-helpers.js';

export default class ExportDialog extends CustomDialog {
  static get elementName() { return 'export-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'export-dialog',
      'src/html/elements/autonomous/dialogs/export-dialog.html');
  }

  constructor() {
    super(ExportDialog.templatePaths);

    this.copyToClipboardButton = this.shadowRoot.getElementById('copy-to-clipboard-button');
    this.downloadAsFileButton = this.shadowRoot.getElementById('download-as-file-button');
    this.cancelButton = this.shadowRoot.getElementById('cancel-button');
    this.statusLabel = this.shadowRoot.getElementById('status-label');

    this.clipboard = null;

    this.exportContent = null;
    this.exportContentType = null;
    this.exportFileName = null;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.downloadAsFileButton.addEventListener('click', this.onClickDownloadAsFileButton.bind(this));
      this.cancelButton.addEventListener('click', this.onClickCloseButton.bind(this));

      this.isInitialized = true;
    }
  }

  onClickDownloadAsFileButton() {
    startFileDownload(this.exportContent, this.exportContentType, this.exportFileName);

    this.statusLabel.textContent = 'File download initiated.';
    this.statusLabel.classList.add('export-dialog__status-label_complete');
  }

  onClickCloseButton() {
    super.onClickCloseButton();

    this.clipboard.destroy();
  }

  launch(content, contentType, fileName) {
    this.exportContent = content;
    this.exportContentType = contentType;
    this.exportFileName = fileName;

    this.statusLabel.textContent = 'Choose one of the following options:';
    this.statusLabel.classList.remove('export-dialog__status-label_complete');

    this.clipboard = new ClipboardWrapper(
      content,
      this.dialog,
      this.copyToClipboardButton,
    );

    this.clipboard.setSuccessCallback(() => {
      this.statusLabel.textContent = 'Copied to clipboard.';
      this.statusLabel.classList.add('export-dialog__status-label_complete');
    });

    this.clipboard.setErrorCallback(() => {
      this.statusLabel.textContent = 'Press Ctrl+C to copy to clipboard.';
      this.statusLabel.classList.add('export-dialog__status-label_error');
    });

    this.showModal();
  }
}
