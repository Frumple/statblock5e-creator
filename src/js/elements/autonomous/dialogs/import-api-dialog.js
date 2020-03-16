import ImportDialog from './import-dialog.js';

import Open5eClient from '../../../api/open5e-client.js';

export default class ImportApiDialog extends ImportDialog {
  static get elementName() { return 'import-api-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'import-api-dialog',
      'src/html/elements/autonomous/dialogs/import-api-dialog.html');
  }

  constructor() {
    super(ImportApiDialog.templatePaths);

    this.client = new Open5eClient();

    this.srdRadioButton = this.shadowRoot.getElementById('srd-radio');
    this.tobRadioButton = this.shadowRoot.getElementById('tob-radio');
    this.ccRadioButton = this.shadowRoot.getElementById('cc-radio');

    this.creatureSelect = this.shadowRoot.getElementById('creature-select');
    this.importButton = this.shadowRoot.getElementById('import-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.srdRadioButton.addEventListener('change', this.onChangeSource.bind(this));
      this.tobRadioButton.addEventListener('change', this.onChangeSource.bind(this));
      this.ccRadioButton.addEventListener('change', this.onChangeSource.bind(this));

      this.importButton.addEventListener('click', this.onClickImportButton.bind(this));

      this.isInitialized = true;
    }
  }

  async onChangeSource() {
    const documentSlug = this.shadowRoot.querySelector('input[name="source"]:checked').value;
    let creatureList;

    this.setStatus('Retrieving creature list from Open5e...');

    this.creatureSelect.disable();
    this.creatureSelect.clear();

    try {
      creatureList = await this.client.loadCreatureList(documentSlug);
    } catch (error) {
      this.setStatus('Error: Unable to load creature list.', 'error');
      return;
    }

    this.creatureSelect.populate(
      creatureList.map(creature => new Option(creature.name, creature.slug)));

    this.creatureSelect.enable();
    this.setStatus('Choose a creature:');
  }

  async onClickImportButton() {
    const creatureSlug = this.creatureSelect.value;
    let creatureJson;

    try {
      creatureJson = await this.client.loadCreature(creatureSlug);
    } catch (error) {
      this.setStatus('Error: Unable to load creature.', 'error');
    }

    this.importCallback(creatureJson);
    this.closeModal();
  }

  launch(importCallback) {
    super.launch(importCallback);

    this.showModal();
  }
}