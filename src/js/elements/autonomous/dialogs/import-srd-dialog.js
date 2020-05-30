import ImportDialog from './import-dialog.js';

import SrdCreatureList from '../../../data/srd-creature-list.js';
import { fetchFromFile } from '../../../helpers/file-helpers.js';

export default class ImportSrdDialog extends ImportDialog {
  static get elementName() { return 'import-srd-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'import-srd-dialog',
      'src/html/elements/autonomous/dialogs/import-srd-dialog.html');
  }

  constructor() {
    super(ImportSrdDialog.templatePaths);

    this.creatureSelect = this.shadowRoot.getElementById('creature-select');
    this.importButton = this.shadowRoot.getElementById('import-button');
  }

  connectedCallback() {
    super.connectedCallback();

    this.importButton.addEventListener('click', this.onClickImportButton.bind(this));

    this.isInitialized = true;
  }

  async onClickImportButton() {
    const creatureSlug = this.creatureSelect.value;
    const path = `examples/5e-srd/${creatureSlug}.json`;
    const text = await fetchFromFile(path);
    const json = JSON.parse(text);

    this.importCallback(json);
    this.closeModal();
  }

  launch(importCallback) {
    super.launch(importCallback);

    if (this.creatureSelect.options.length === 0) {
      this.creatureSelect.populate(
        SrdCreatureList.map(creature => new Option(creature.name, creature.slug)));
    }

    this.setStatus('Choose a creature:');

    this.showModal();
  }
}