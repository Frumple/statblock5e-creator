import OptionDialog from './option-dialog.js';

import { startFileDownload, ClipboardWrapper } from '../../../helpers/export-helpers.js';

export default class ExportDialog extends OptionDialog {
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

    this.clipboard = null;

    this.exportContent = null;
    this.exportContentType = null;
    this.exportFileName = null;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.downloadAsFileButton.addEventListener('click', this.onClickDownloadAsFileButton.bind(this));

      this.isInitialized = true;
    }
  }

  onClickDownloadAsFileButton() {
    startFileDownload(this.exportContent, this.exportContentType, this.exportFileName);

    this.setStatus('File download initiated.', 'success');
  }

  onClickCloseButton() {
    super.onClickCloseButton();

    this.clipboard.destroy();
  }

  launch(content, contentType, fileName) {
    this.exportContent = content;
    this.exportContentType = contentType;
    this.exportFileName = fileName;

    this.setStatus('Choose one of the following options:');

    this.clipboard = new ClipboardWrapper(
      content,
      this.dialog,
      this.copyToClipboardButton,
    );

    this.clipboard.setSuccessCallback(() => {
      this.setStatus('Copied to clipboard.', 'success');
    });

    this.clipboard.setErrorCallback(() => {
      this.setStatus('Press Ctrl+C to copy to clipboard.', 'error');
    });

    this.showModal();
  }
}
