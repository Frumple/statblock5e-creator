import CustomDialog from './custom-dialog.js';

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
    this.status = this.shadowRoot.getElementById('status');

    this.copyToClipboardCallback = null;
    this.downloadAsFileCallback = null;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.copyToClipboardButton.addEventListener('click', this.onClickCopyToClipboardButton.bind(this));
      this.downloadAsFileButton.addEventListener('click', this.onClickDownloadAsFileButton.bind(this));

      this.isInitialized = true;
    }
  }

  onClickCopyToClipboardButton() {
    this.copyToClipboardCallback();
    
    this.status.textContent = 'Content copied to clipboard.';
    this.status.classList.add('export-dialog__status_complete');
  }

  onClickDownloadAsFileButton() {
    this.downloadAsFileCallback();

    this.status.textContent = 'File download initiated.';
    this.status.classList.add('export-dialog__status_complete');
  }

  attachCallbacks(copyToClipboardCallback, downloadAsFileCallback) {
    this.copyToClipboardCallback = copyToClipboardCallback;
    this.downloadAsFileCallback = downloadAsFileCallback;
  }

  showModal() {
    super.showModal();

    this.status.textContent = 'Choose one of the following options:';
    this.status.classList.remove('export-dialog__status_complete');
  }
}
