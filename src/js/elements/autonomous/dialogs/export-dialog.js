import CustomDialog from './custom-dialog.js';

import { startFileDownload } from '../../../helpers/export-helpers.js';

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

    this.clipboard = null;

    this.title = null;
    this.content = null;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.downloadAsFileButton.addEventListener('click', this.onClickDownloadAsFileButton.bind(this));
      this.closeButton.addEventListener('click', this.onClickCloseButton.bind(this));

      this.isInitialized = true;
    }
  }

  onClickDownloadAsFileButton() {
    const contentType = 'text/html';
    const fileName = `${this.title}.html`;

    startFileDownload(this.content, contentType, fileName);

    this.status.textContent = 'File download initiated.';
    this.status.classList.add('export-dialog__status_complete');
  }

  onClickCloseButton() {
    this.clipboard.destroy();
  }

  launch(title, content) {
    this.title = title;
    this.content = content;

    this.status.textContent = 'Choose one of the following options:';
    this.status.classList.remove('export-dialog__status_complete');

    this.clipboard = new ClipboardJS(this.copyToClipboardButton, {
      container: this.dialog,
      text: function() {
        return content;
      }
    });

    this.clipboard.on('success', () => {
      this.status.textContent = 'Copied to clipboard.';
      this.status.classList.add('export-dialog__status_complete');
    });

    this.clipboard.on('error', () => {
      this.status.textContent = 'Press Ctrl+C to copy to clipboard.';
      this.status.classList.add('export-dialog__status_error');
    });

    this.showModal();
  }
}
