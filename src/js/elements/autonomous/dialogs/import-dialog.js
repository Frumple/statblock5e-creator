import OptionDialog from './option-dialog.js';

export default class ImportDialog extends OptionDialog {
  static get elementName() { return 'import-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'import-dialog',
      'src/html/elements/autonomous/dialogs/import-dialog.html');
  }

  constructor(templatePaths) {
    super(templatePaths);

    this.importCallback = null;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  launch(importCallback) {
    this.importCallback = importCallback;
  }
}
