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
    this.statBlockSidebar = document.querySelector('stat-block-sidebar');
    this.statBlock = document.querySelector('stat-block');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.addEventListener('numberOfColumnsChanged', this.onNumberOfColumnsChanged);
      this.addEventListener('twoColumnHeightChanged', this.onTwoColumnHeightChanged);
      this.addEventListener('emptySectionsVisibilityChanged', this.onEmptySectionsVisiblityChanged);
      this.addEventListener('allSectionsAction', this.onAllSectionsAction);

      this.isInitialized = true;
    }
  }

  onNumberOfColumnsChanged() {
    const columns = event.detail.columns;
    GlobalOptions.columns = columns;

    if (columns === 1) {
      this.statBlockSidebar.visible = false;
      this.statBlock.setColumnHeight('auto');
    } else if (columns === 2) {
      this.statBlockSidebar.visible = true;
      this.statBlock.setColumnHeight(
        GlobalOptions.twoColumnMode,
        GlobalOptions.twoColumnHeight);
    }
    
    this.statBlock.setColumns(columns);
  }

  onTwoColumnHeightChanged() {
    const mode = event.detail.mode;
    const height = event.detail.height;
    GlobalOptions.twoColumnMode = mode;
    GlobalOptions.twoColumnHeight = height;

    this.statBlock.setColumnHeight(mode, height);
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