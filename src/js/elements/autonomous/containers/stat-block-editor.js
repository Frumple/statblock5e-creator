import CustomAutonomousElement from '../custom-autonomous-element.js';
import GlobalOptions from '../../../helpers/global-options.js';
import isRunningInNode from '../../../helpers/is-running-in-node.js';

import StatBlockMenu from './stat-block-menu.js';
import StatBlockSidebar from './stat-block-sidebar.js';
import StatBlock from './stat-block.js';

import ExportDialog from '../dialogs/export-dialog.js';

export default class StatBlockEditor extends CustomAutonomousElement {
  static get elementName() { return 'stat-block-editor'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block-editor',
      'src/html/elements/autonomous/containers/stat-block-editor.html');
  }

  constructor() {
    super(StatBlockEditor.templatePaths);

    if (isRunningInNode) {
      this.statBlockMenu = new StatBlockMenu(this);
      this.statBlockSidebar = new StatBlockSidebar(this);
      this.statBlock = new StatBlock(this);

      this.htmlExportDialog = new ExportDialog();
    } else {
      this.statBlockMenu = document.querySelector('stat-block-menu');
      this.statBlockSidebar = document.querySelector('stat-block-sidebar');
      this.statBlock = document.querySelector('stat-block');

      this.htmlExportDialog = this.shadowRoot.getElementById('html-export-dialog');
    }    
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.addEventListener('numberOfColumnsChanged', this.onNumberOfColumnsChanged.bind(this));
      this.addEventListener('twoColumnHeightChanged', this.onTwoColumnHeightChanged.bind(this));
      this.addEventListener('emptySectionsVisibilityChanged', this.onEmptySectionsVisiblityChanged.bind(this));
      this.addEventListener('allSectionsAction', this.onAllSectionsAction.bind(this));

      this.addEventListener('exportAction', this.onExportAction.bind(this));

      this.isInitialized = true;
    }
  }

  onNumberOfColumnsChanged(event) {
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

  onTwoColumnHeightChanged(event) {
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

  onExportAction(event) {
    const format = event.detail.format;
    this.openExportDialog(format);    
  }

  get title() {
    const creatureName = this.statBlock.headingSection.title;
    return `Statblock5e - ${creatureName}`;
  }
  
  openExportDialog(format) {
    switch(format) {
    case 'json':
      this.openJsonExportDialog();
      break;
    case 'html':
      this.openHtmlExportDialog();
      break;
    case 'homebrewery':
      this.openHomebreweryExportDialog();
      break;
    default:
      throw new Error(`Unknown export format: '${format}'.`);
    }
  }

  openJsonExportDialog() {
    // TODO
  }

  openHtmlExportDialog() {
    const title = this.title;
    const content = this.statBlock.exportToHtml(title);

    this.htmlExportDialog.launch(title, content);
  }

  openHomebreweryExportDialog() {
    // TODO
  }
}