import CustomAutonomousElement from '../custom-autonomous-element.js';
import * as HtmlExportDocumentFactory from '../../../helpers/html-export-document-factory.js';
import printHtml from '../../../helpers/print-helpers.js';
import IsRunningInJsdom from '../../../helpers/is-running-in-jsdom.js';

import StatBlockMenu from './stat-block-menu.js';
import StatBlockSidebar from './stat-block-sidebar.js';
import StatBlock from './stat-block.js';

import ResetDialog from '../dialogs/reset-dialog.js';

import ImportJsonDialog from '../dialogs/import-json-dialog.js';
import ImportSrdDialog from '../dialogs/import-srd-dialog.js';
import ImportOpen5eDialog from '../dialogs/import-open5e-dialog.js';

import ExportDialog from '../dialogs/export-dialog.js';

import CurrentContext from '../../../models/current-context.js';
import LocalStorageProxy from '../../../helpers/local-storage-proxy.js';

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

      this.resetDialog = new ResetDialog();

      this.importJsonDialog = new ImportJsonDialog();
      this.importSrdDialog = new ImportSrdDialog();
      this.importOpen5eDialog = new ImportOpen5eDialog();

      this.exportJsonDialog = new ExportDialog();
      this.exportHtmlDialog = new ExportDialog();
      this.exportMarkdownDialog = new ExportDialog();
    } else {
      this.statBlockMenu = document.querySelector('stat-block-menu');
      this.statBlockSidebar = document.querySelector('stat-block-sidebar');
      this.statBlock = document.querySelector('stat-block');

      this.resetDialog = this.shadowRoot.getElementById('reset-dialog');

      this.importJsonDialog = this.shadowRoot.getElementById('import-json-dialog');
      this.importSrdDialog = this.shadowRoot.getElementById('import-srd-dialog');
      this.importOpen5eDialog = this.shadowRoot.getElementById('import-open5e-dialog');

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

      this.addEventListener('resetAction', this.onResetAction.bind(this));
      this.addEventListener('importAction', this.onImportAction.bind(this));
      this.addEventListener('exportAction', this.onExportAction.bind(this));
      this.addEventListener('printAction', this.onPrintAction.bind(this));
      this.addEventListener('toggleGettingStarted', this.onToggleGettingStarted.bind(this));

      this.addEventListener('sectionSaved', this.onSectionSaved.bind(this));

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
    this.saveJsonToLocalStorage();
  }

  onTwoColumnHeightChanged(event) {
    const layoutSettings = CurrentContext.layoutSettings;

    const mode = event.detail.mode;
    const height = event.detail.height;
    layoutSettings.twoColumnMode = mode;
    layoutSettings.twoColumnHeight = height;

    this.statBlock.setColumnHeight(mode, height);
    this.saveJsonToLocalStorage();
  }

  onEmptySectionsVisibilityChanged(event) {
    const localSettings = CurrentContext.localSettings;

    const visibility = event.detail.visibility;
    localSettings.emptySectionsVisibility = visibility;

    this.statBlock.setEmptyVisibility(visibility);
    this.saveLocalSettingsToLocalStorage();
  }

  onAllSectionsAction(event) {
    const action = event.detail.action;
    if (action === 'edit') {
      this.statBlock.edit();
    } else if (action === 'save') {
      this.statBlock.save();
    }
  }

  onResetAction() {
    this.openResetDialog();
  }

  onImportAction(event) {
    const format = event.detail.format;

    switch(format) {
    case 'json':
      this.openImportJsonDialog();
      break;
    case 'srd':
      this.openImportSrdDialog();
      break;
    case 'open5e':
      this.openImportOpen5eDialog();
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

  onToggleGettingStarted() {
    const localSettings = CurrentContext.localSettings;

    localSettings.gettingStartedVisibility = ! localSettings.gettingStartedVisibility;
    this.saveLocalSettingsToLocalStorage();
    this.statBlock.setGettingStartedVisibility(localSettings.gettingStartedVisibility);
  }

  onSectionSaved() {
    this.saveJsonToLocalStorage();
  }

  openResetDialog() {
    this.resetDialog.launch(this.reset.bind(this));
  }

  openImportJsonDialog() {
    this.importJsonDialog.launch(this.importFromJson.bind(this));
  }

  openImportSrdDialog() {
    this.importSrdDialog.launch(this.importFromJson.bind(this));
  }

  openImportOpen5eDialog() {
    this.importOpen5eDialog.launch(this.importFromOpen5e.bind(this));
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

  loadJsonFromLocalStorage() {
    const jsonString = LocalStorageProxy.loadJson();

    if (jsonString !== null) {
      const json = JSON.parse(jsonString);

      if (json.meta.version === CurrentContext.localSettings.version) {
        this.importFromJson(json);
      }
    }
  }

  saveJsonToLocalStorage() {
    const jsonString = this.exportToJson();
    LocalStorageProxy.saveJson(jsonString);
  }

  loadLocalSettingsFromLocalStorage() {
    const localSettingsString = LocalStorageProxy.loadLocalSettings();

    if (localSettingsString !== null) {
      const localSettings = JSON.parse(localSettingsString);

      if (localSettings.version === CurrentContext.localSettings.version) {
        Object.assign(CurrentContext.localSettings, localSettings);
        this.statBlockMenu.updateEmptySectionControls();
        this.statBlock.setGettingStartedVisibility(localSettings.gettingStartedVisibility);
      }
    }
  }

  saveLocalSettingsToLocalStorage() {
    const localSettingsString = JSON.stringify(CurrentContext.localSettings);
    LocalStorageProxy.saveLocalSettings(localSettingsString);
  }

  reset() {
    CurrentContext.reset();
    LocalStorageProxy.clearJson();

    this.statBlock.updateView();
    this.statBlockMenu.updateColumnControls();
    this.statBlockMenu.updateEmptySectionControls();
    this.statBlockSidebar.updateControls();
  }

  importFromOpen5e(json) {
    this.statBlock.importFromOpen5e(json);

    this.saveJsonToLocalStorage();
  }

  importFromJson(json) {
    CurrentContext.layoutSettings.fromJson(json.layout);
    this.statBlock.importFromJson(json);

    this.statBlockMenu.updateColumnControls();
    this.statBlockSidebar.updateControls();

    this.saveJsonToLocalStorage();
  }

  exportToJson() {
    const layoutSettings = CurrentContext.layoutSettings;
    const version = CurrentContext.localSettings.version;
    const json = this.statBlock.exportToJson();

    json.layout = layoutSettings.toJson();

    json.meta = {
      version: version,
      description: 'Created using statblock5e-creator',
      url: 'https://frumple.github.io/statblock5e-creator'
    };

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

    const beautified_content = html_beautify(content, {
      indent_size: 2,
      content_unformatted: 'p'
    });

    return beautified_content;
  }

  exportToMarkdown() {
    return this.statBlock.exportToMarkdown();
  }
}