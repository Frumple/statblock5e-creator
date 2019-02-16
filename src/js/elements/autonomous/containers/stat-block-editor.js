import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';
import GlobalOptions from '/src/js/helpers/global-options.js';

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
      this.addEventListener('numberOfColumnsChanged', this.onNumberOfColumnsChanged);
      this.addEventListener('emptySectionsVisibilityChanged', this.onEmptySectionsVisiblityChanged);
      this.addEventListener('allSectionsAction', this.onAllSectionsAction);

      this.isInitialized = true;
    }
  }

  onNumberOfColumnsChanged() {
    const columns = event.detail.columns;
  }

  onEmptySectionsVisiblityChanged(event) {
    const visibility = event.detail.visibility;
    GlobalOptions.emptySectionsVisibility = visibility;

    this.statBlock.setEmptySectionsVisibility(visibility);
  }

  onAllSectionsAction(event) {
    const action = event.detail.action;
    if (action === 'edit') {
      this.statBlock.editAllSections();
    } else if (action === 'save') {
      this.statBlock.saveAllSections();
    }
  }
}