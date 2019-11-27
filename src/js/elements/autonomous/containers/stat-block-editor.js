import CustomAutonomousElement from '../custom-autonomous-element.js';
import * as HtmlExportDocumentFactory from '../../../helpers/html-export-document-factory.js';
import printHtml from '../../../helpers/print-helpers.js';
import GlobalOptions from '../../../helpers/global-options.js';
import isRunningInNode from '../../../helpers/is-running-in-node.js';

import StatBlockMenu from './stat-block-menu.js';
import StatBlockSidebar from './stat-block-sidebar.js';
import StatBlock from './stat-block.js';

import ExportDialog from '../dialogs/export-dialog.js';

import Creature from '../../../models/creature.js';

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

      this.jsonExportDialog = new ExportDialog();
      this.htmlExportDialog = new ExportDialog();
      this.homebreweryExportDialog = new ExportDialog();
    } else {
      this.statBlockMenu = document.querySelector('stat-block-menu');
      this.statBlockSidebar = document.querySelector('stat-block-sidebar');
      this.statBlock = document.querySelector('stat-block');

      this.jsonExportDialog = this.shadowRoot.getElementById('json-export-dialog');
      this.htmlExportDialog = this.shadowRoot.getElementById('html-export-dialog');
      this.homebreweryExportDialog = this.shadowRoot.getElementById('homebrewery-export-dialog');
    }
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.addEventListener('numberOfColumnsChanged', this.onNumberOfColumnsChanged.bind(this));
      this.addEventListener('twoColumnHeightChanged', this.onTwoColumnHeightChanged.bind(this));
      this.addEventListener('emptySectionsVisibilityChanged', this.onEmptySectionsVisiblityChanged.bind(this));
      this.addEventListener('allSectionsAction', this.onAllSectionsAction.bind(this));

      this.addEventListener('printAction', this.onPrintAction.bind(this));
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

  onPrintAction() {
    const content = this.exportToHtml(this.title);
    printHtml(content);
  }

  onExportAction(event) {
    const format = event.detail.format;

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
    const content = this.exportToJson();
    this.jsonExportDialog.launch(content, 'application/json', `${Creature.title}.json`);
  }

  openHtmlExportDialog() {
    const content = this.exportToHtml(`Statblock5e - ${Creature.title}`);
    this.htmlExportDialog.launch(content, 'text/html', `${Creature.title}.html`);
  }

  openHomebreweryExportDialog() {
    const content = this.exportToHomebrewery();
    this.homebreweryExportDialog.launch(content, 'text/plain', `${Creature.title}.txt`);
  }

  exportToJson() {
    const jsObject = this.statBlock.exportToJson();

    jsObject.meta = {
      version: '1.0.0',
      description: 'Created using statblock5e-creator',
      url: 'https://frumple.github.io/statblock5e-creator'
    };

    return JSON.stringify(jsObject, null, 2);
  }

  exportToHtml(title) {
    const exportDocument = HtmlExportDocumentFactory.createInstance();
    const titleElement = exportDocument.querySelector('title');
    const bodyElement = exportDocument.querySelector('body');
    const statBlockElement = this.statBlock.exportToHtml();

    titleElement.textContent = title;
    bodyElement.appendChild(statBlockElement);

    const doctype = '<!DOCTYPE html>';
    const content = `${doctype}${exportDocument.documentElement.outerHTML}`;
    const beautified_content = html_beautify(content, { indent_size: 2 });

    return beautified_content;
  }

  exportToHomebrewery() {
    return this.statBlock.exportToHomebrewery();
  }
}