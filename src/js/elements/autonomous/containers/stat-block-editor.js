import CustomAutonomousElement from '../custom-autonomous-element.js';
import * as HtmlExportDocumentFactory from '../../../helpers/html-export-document-factory.js';
import printHtml from '../../../helpers/print-helpers.js';
import IsRunningInJsdom from '../../../helpers/is-running-in-jsdom.js';

import StatBlockMenu from './stat-block-menu.js';
import StatBlockSidebar from './stat-block-sidebar.js';
import StatBlock from './stat-block.js';

import ImportOpen5eDialog from '../dialogs/import-open5e-dialog.js';
import ImportFileDialog from '../dialogs/import-file-dialog.js';
import ExportDialog from '../dialogs/export-dialog.js';

import CurrentContext from '../../../models/current-context.js';

const html_beautify = require('js-beautify').html;

export default class StatBlockEditor extends CustomAutonomousElement {
  static get elementName() { return 'stat-block-editor'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block-editor',
      'src/html/elements/autonomous/containers/stat-block-editor.html');
  }

  constructor() {
    super(StatBlockEditor.templatePaths);

    if (IsRunningInJsdom) {
      this.statBlockMenu = new StatBlockMenu(this);
      this.statBlockSidebar = new StatBlockSidebar(this);
      this.statBlock = new StatBlock(this);

      this.importOpen5eDialog = new ImportOpen5eDialog();
      this.importJsonDialog = new ImportFileDialog();
      this.exportJsonDialog = new ExportDialog();
      this.exportHtmlDialog = new ExportDialog();
      this.exportMarkdownDialog = new ExportDialog();
    } else {
      this.statBlockMenu = document.querySelector('stat-block-menu');
      this.statBlockSidebar = document.querySelector('stat-block-sidebar');
      this.statBlock = document.querySelector('stat-block');

      this.importOpen5eDialog = this.shadowRoot.getElementById('import-open5e-dialog');
      this.importJsonDialog = this.shadowRoot.getElementById('import-json-dialog');
      this.exportJsonDialog = this.shadowRoot.getElementById('export-json-dialog');
      this.exportHtmlDialog = this.shadowRoot.getElementById('export-html-dialog');
      this.exportMarkdownDialog = this.shadowRoot.getElementById('export-markdown-dialog');
    }
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.addEventListener('numberOfColumnsChanged', this.onNumberOfColumnsChanged.bind(this));
      this.addEventListener('twoColumnHeightChanged', this.onTwoColumnHeightChanged.bind(this));
      this.addEventListener('emptySectionsVisibilityChanged', this.onEmptySectionsVisibilityChanged.bind(this));
      this.addEventListener('allSectionsAction', this.onAllSectionsAction.bind(this));

      this.addEventListener('importAction', this.onImportAction.bind(this));
      this.addEventListener('exportAction', this.onExportAction.bind(this));
      this.addEventListener('printAction', this.onPrintAction.bind(this));

      this.isInitialized = true;
    }
  }

  onNumberOfColumnsChanged(event) {
    const layoutSettings = CurrentContext.layoutSettings;

    const columns = event.detail.columns;
    layoutSettings.columns = columns;

    if (columns === 1) {
      this.statBlockSidebar.visible = false;
      this.statBlock.setColumnHeight('auto');
    } else if (columns === 2) {
      this.statBlockSidebar.visible = true;
      this.statBlock.setColumnHeight(
        layoutSettings.twoColumnMode,
        layoutSettings.twoColumnHeight);
    }

    this.statBlock.setColumns(columns);
  }

  onTwoColumnHeightChanged(event) {
    const layoutSettings = CurrentContext.layoutSettings;

    const mode = event.detail.mode;
    const height = event.detail.height;
    layoutSettings.twoColumnMode = mode;
    layoutSettings.twoColumnHeight = height;

    this.statBlock.setColumnHeight(mode, height);
  }

  onEmptySectionsVisibilityChanged(event) {
    const layoutSettings = CurrentContext.layoutSettings;

    const visibility = event.detail.visibility;
    layoutSettings.emptySectionsVisibility = visibility;

    this.statBlock.setEmptyVisibility(visibility);
  }

  onAllSectionsAction(event) {
    const action = event.detail.action;
    if (action === 'edit') {
      this.statBlock.edit();
    } else if (action === 'save') {
      this.statBlock.save();
    }
  }

  onImportAction(event) {
    const format = event.detail.format;

    switch(format) {
    case 'open5e':
      this.openImportOpen5eDialog();
      break;
    case 'json':
      this.openImportFileDialog();
      break;
    default:
      throw new Error(`Unknown import format: '${format}'.`);
    }
  }

  onExportAction(event) {
    const format = event.detail.format;

    switch(format) {
    case 'json':
      this.openExportJsonDialog();
      break;
    case 'html':
      this.openExportHtmlDialog();
      break;
    case 'markdown':
      this.openExportMarkdownDialog();
      break;
    default:
      throw new Error(`Unknown export format: '${format}'.`);
    }
  }

  onPrintAction() {
    const content = this.exportToHtml(CurrentContext.creature.title.fullName);
    printHtml(content);
  }

  openImportOpen5eDialog() {
    this.importOpen5eDialog.launch(this.importFromOpen5e.bind(this));
  }

  openImportFileDialog() {
    this.importJsonDialog.launch(this.importFromJson.bind(this));
  }

  openExportJsonDialog() {
    const content = this.exportToJson();
    this.exportJsonDialog.launch(content, 'application/json', `${CurrentContext.creature.title.fullName}.json`);
  }

  openExportHtmlDialog() {
    const content = this.exportToHtml(`Statblock5e - ${CurrentContext.creature.title.fullName}`);
    this.exportHtmlDialog.launch(content, 'text/html', `${CurrentContext.creature.title.fullName}.html`);
  }

  openExportMarkdownDialog() {
    const content = this.exportToMarkdown();
    this.exportMarkdownDialog.launch(content, 'text/markdown', `${CurrentContext.creature.title.fullName}.md`);
  }

  importFromOpen5e(json) {
    this.statBlock.importFromOpen5e(json);
  }

  importFromJson(text) {
    const json = JSON.parse(text);
    CurrentContext.layoutSettings.fromJson(json.layout);
    this.statBlock.importFromJson(json);

    this.statBlockMenu.updateControls();
    this.statBlockSidebar.updateControls();
  }

  exportToJson() {
    const layoutSettings = CurrentContext.layoutSettings;
    const version = CurrentContext.version;
    const json = this.statBlock.exportToJson();

    json.meta = {
      version: version,
      description: 'Created using statblock5e-creator',
      url: 'https://frumple.github.io/statblock5e-creator'
    };

    json.layout = layoutSettings.toJson();

    return JSON.stringify(json, null, 2);
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

  exportToMarkdown() {
    return this.statBlock.exportToMarkdown();
  }
}