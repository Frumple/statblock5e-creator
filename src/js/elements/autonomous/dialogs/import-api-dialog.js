import ImportDialog from './import-dialog.js';

export default class ImportApiDialog extends ImportDialog {
  static get elementName() { return 'import-api-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'import-api-dialog',
      'src/html/elements/autonomous/dialogs/import-api-dialog.html');
  }

  constructor() {
    super(ImportApiDialog.templatePaths);

    this.creatureSelect = this.shadowRoot.getElementById('creature-select');
    this.importButton = this.shadowRoot.getElementById('import-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.creatureSelect.addEventListener('input', this.onInputCreatureSelect.bind(this));
      this.importButton.addEventListener('click', this.onClickImportButton.bind(this));

      this.isInitialized = true;
    }
  }

  onInputCreatureSelect() {
    // TODO
  }

  onClickImportButton() {
    // TODO: Retrieve creature text
    const text = '';

    this.importCallback(text);
    this.closeModal();
  }

  launch(importCallback) {
    super.launch(importCallback);

    this.showModal();

    // TODO: Retrieve creature list on first time
    this.setStatus('Retrieving creature list from Open5e...');
  }
}