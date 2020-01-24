import OptionDialog from './option-dialog.js';
import isRunningInNode from '../../../helpers/is-running-in-node.js';

export default class ImportDialog extends OptionDialog {
  static get elementName() { return 'import-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'import-dialog',
      'src/html/elements/autonomous/dialogs/import-dialog.html');
  }

  constructor() {
    super(ImportDialog.templatePaths);

    this.statBlockEditor = null;

    this.chooseFileButton = this.shadowRoot.getElementById('choose-file-button');
    this.fileInput = this.shadowRoot.getElementById('file-input');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.chooseFileButton.addEventListener('click', this.onClickChooseFileButton.bind(this));
      this.fileInput.addEventListener('change', this.onJsonImportFileSelected.bind(this));

      this.isInitialized = true;
    }
  }

  onClickChooseFileButton() {
    this.fileInput.click();
  }

  async onJsonImportFileSelected() {
    const file = this.fileInput.files[0];

    // JSDOM does not yet support Blob.text()
    // Workaround is to use Blob.arrayBuffer() and decode it
    // Github issue: https://github.com/jsdom/jsdom/issues/2555
    let text;

    if (isRunningInNode) {
      const buffer = await file.arrayBuffer();
      text = new TextDecoder('utf-8').decode(buffer);
    } else {
      text = await file.text();
    }

    const json = JSON.parse(text);

    this.statBlockEditor.importFromJson(json);
    this.closeModal();
  }

  launch() {
    this.setStatus('Click "Choose File..." to begin.');
    this.showModal();
  }
}