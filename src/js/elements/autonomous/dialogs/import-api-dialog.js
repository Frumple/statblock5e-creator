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

    this.setStatus('Retrieving creature list from Open5e...');
    this.creatureSelect.setAttribute('disabled', '');

    while (this.creatureSelect.options.length > 0) {
      this.creatureSelect.remove(0);
    }

    const creatureList = await this.client.loadCreatureList(documentSlug);

    for (const creature of creatureList) {
      this.creatureSelect.add(new Option(creature.name, creature.slug));
    }

    this.setStatus('Choose a creature:');
    this.creatureSelect.removeAttribute('disabled');
  }

  async onClickImportButton() {
    const creatureSlug = this.creatureSelect.value;
    const creatureJson = await this.client.loadCreature(creatureSlug);

    this.importCallback(creatureJson);
    this.closeModal();
  }

  launch(importCallback) {
    super.launch(importCallback);

    this.showModal();
  }
}