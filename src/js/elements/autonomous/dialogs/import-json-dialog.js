import OptionDialog from './option-dialog.js';

export default class ImportJsonDialog extends OptionDialog {
  static get elementName() { return 'import-json-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'import-json-dialog',
      'src/html/elements/autonomous/dialogs/import-json-dialog.html');
  }

  constructor() {
    super(ImportJsonDialog.templatePaths);

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
    const text = await file.text();
    const json = JSON.parse(text);

    this.statBlockEditor.importFromJson(json);
    this.closeModal();
  }

  launch() {
    this.fileInput.value = '';
    this.setStatus('Click "Choose File..." to begin.');
    this.showModal();
  }
}