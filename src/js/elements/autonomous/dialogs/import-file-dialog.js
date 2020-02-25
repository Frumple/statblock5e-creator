import ImportDialog from './import-dialog.js';

export default class ImportFileDialog extends ImportDialog {
  static get elementName() { return 'import-file-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'import-file-dialog',
      'src/html/elements/autonomous/dialogs/import-file-dialog.html');
  }

  constructor() {
    super(ImportFileDialog.templatePaths);

    this.chooseFileButton = this.shadowRoot.getElementById('choose-file-button');
    this.fileInput = this.shadowRoot.getElementById('file-input');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.chooseFileButton.addEventListener('click', this.onClickChooseFileButton.bind(this));
      this.fileInput.addEventListener('change', this.onFileSelected.bind(this));

      this.isInitialized = true;
    }
  }

  onClickChooseFileButton() {
    this.fileInput.click();
  }

  async onFileSelected() {
    const file = this.fileInput.files[0];
    const text = await file.text();

    this.importCallback(text);
    this.closeModal();
  }

  launch(importCallback) {
    super.launch(importCallback);

    this.fileInput.value = '';
    this.setStatus('Click "Choose File..." to begin.');
    this.showModal();
  }
}