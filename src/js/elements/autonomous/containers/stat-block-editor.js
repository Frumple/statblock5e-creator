import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class StatBlockEditor extends CustomAutonomousElement {
  static get elementName() { return 'stat-block-editor'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block-editor',
      'src/html/elements/autonomous/containers/stat-block-editor.html');
  }

  constructor() {
    super(StatBlockEditor.templatePaths);

    this.statBlockMenu = document.querySelector('stat-block-menu');
    this.statBlock = document.querySelector('stat-block');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.addEventListener('editAllSections', this.onEditAllSections);
      this.addEventListener('saveAllSections', this.onSaveAllSections);

      this.isInitialized = true;
    }
  }

  onEditAllSections() {
    this.statBlock.editAllSections();
  }

  onSaveAllSections() {
    this.statBlock.saveAllSections();
  }
}