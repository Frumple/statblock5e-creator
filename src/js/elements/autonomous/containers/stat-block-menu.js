import CustomAutonomousElement from '../custom-autonomous-element.js';
import CurrentContext from '../../../models/current-context.js';

export default class StatBlockMenu extends CustomAutonomousElement {
  static get elementName() { return 'stat-block-menu'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block-menu',
      'src/html/elements/autonomous/containers/stat-block-menu.html');
  }

  constructor(parent = null) {
    super(StatBlockMenu.templatePaths, parent);

    this.columnsToggle = this.shadowRoot.getElementById('columns-toggle');
    this.emptySectionsToggle = this.shadowRoot.getElementById('empty-sections-toggle');

    this.editAllSectionsButton = this.shadowRoot.getElementById('edit-all-sections-button');
    this.saveAllSectionsButton = this.shadowRoot.getElementById('save-all-sections-button');

    this.resetButton = this.shadowRoot.getElementById('reset-button');

    this.importJsonButton = this.shadowRoot.getElementById('import-json-button');
    this.importSrdButton = this.shadowRoot.getElementById('import-srd-button');
    this.importOpen5eButton = this.shadowRoot.getElementById('import-open5e-button');

    this.exportJsonButton = this.shadowRoot.getElementById('export-json-button');
    this.exportHtmlButton = this.shadowRoot.getElementById('export-html-button');
    this.exportMarkdownButton = this.shadowRoot.getElementById('export-markdown-button');

    this.printButton = this.shadowRoot.getElementById('print-button');

    this.gettingStartedButton = this.shadowRoot.getElementById('getting-started-button');
    this.wikiButton = this.shadowRoot.getElementById('wiki-button');

    this.githubButton = this.shadowRoot.getElementById('github-button');
    this.versionButton = this.shadowRoot.getElementById('version-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.columnsToggle.addEventListener('input', this.onInputColumnsToggle.bind(this));
      this.emptySectionsToggle.addEventListener('input', this.onInputEmptySectionsToggle.bind(this));

      this.editAllSectionsButton.addEventListener('click', this.onClickEditAllSectionsButton.bind(this));
      this.saveAllSectionsButton.addEventListener('click', this.onClickSaveAllSectionsButton.bind(this));

      this.resetButton.addEventListener('click', this.onClickResetButton.bind(this));

      this.importJsonButton.addEventListener('click', this.onClickImportJsonButton.bind(this));
      this.importSrdButton.addEventListener('click', this.onClickImportSrdButton.bind(this));
      this.importOpen5eButton.addEventListener('click', this.onClickImportOpen5eButton.bind(this));

      this.exportJsonButton.addEventListener('click', this.onClickExportJsonButton.bind(this));
      this.exportHtmlButton.addEventListener('click', this.onClickExportHtmlButton.bind(this));
      this.exportMarkdownButton.addEventListener('click', this.onClickExportMarkdownButton.bind(this));

      this.printButton.addEventListener('click', this.onClickPrintButton.bind(this));

      this.gettingStartedButton.addEventListener('click', this.onClickGettingStartedButton.bind(this));
      this.wikiButton.addEventListener('click', this.onClickWikiButton.bind(this));

      this.githubButton.addEventListener('click', this.onClickGithubButton.bind(this));
      this.versionButton.addEventListener('click', this.onClickVersionButton.bind(this));

      this.versionButton.textContent = `Version: ${CurrentContext.localSettings.version}`;

      this.isInitialized = true;
    }
  }

  onInputColumnsToggle() {
    const numberOfColumns = this.columnsToggle.checked ? 2 : 1;
    this.dispatchMenuEvent('numberOfColumnsChanged', { columns: numberOfColumns });
  }

  onInputEmptySectionsToggle() {
    const showEmptySections = this.emptySectionsToggle.checked;
    this.dispatchMenuEvent('emptySectionsVisibilityChanged', { visibility: showEmptySections });
  }

  onClickEditAllSectionsButton() {
    this.dispatchMenuEvent('allSectionsAction', { action: 'edit' });
  }

  onClickSaveAllSectionsButton() {
    this.dispatchMenuEvent('allSectionsAction', { action: 'save' });
  }

  onClickResetButton() {
    this.dispatchMenuEvent('resetAction');
  }

  onClickImportJsonButton() {
    this.dispatchMenuEvent('importAction', { format: 'json' });
  }

  onClickImportSrdButton() {
    this.dispatchMenuEvent('importAction', { format: 'srd' });
  }

  onClickImportOpen5eButton() {
    this.dispatchMenuEvent('importAction', { format: 'open5e' });
  }

  onClickExportJsonButton() {
    this.dispatchMenuEvent('exportAction', { format: 'json' });
  }

  onClickExportHtmlButton() {
    this.dispatchMenuEvent('exportAction', { format: 'html' });
  }

  onClickExportMarkdownButton() {
    this.dispatchMenuEvent('exportAction', { format: 'markdown' });
  }

  onClickPrintButton() {
    this.dispatchMenuEvent('printAction');
  }

  onClickGettingStartedButton() {
    this.dispatchMenuEvent('toggleGettingStarted');
  }

  onClickWikiButton() {
    window.open('https://github.com/Frumple/statblock5e-creator/wiki');
  }

  onClickGithubButton() {
    window.open('https://github.com/Frumple/statblock5e-creator');
  }

  onClickVersionButton() {
    window.open('https://github.com/Frumple/statblock5e-creator/releases');
  }

  dispatchMenuEvent(eventType, detail = null) {
    const menuEvent = new CustomEvent(eventType, {
      bubbles: true,
      composed: true,
      detail: detail
    });
    this.dispatchEvent(menuEvent);
  }

  updateColumnControls() {
    const layoutSettings = CurrentContext.layoutSettings;

    if (layoutSettings.columns === 1) {
      this.columnsToggle.checked = false;
    } else if (layoutSettings.columns === 2) {
      this.columnsToggle.checked = true;
    }

    this.onInputColumnsToggle();
  }

  updateEmptySectionControls() {
    const localSettings = CurrentContext.localSettings;

    if (localSettings.emptySectionsVisibility) {
      this.emptySectionsToggle.checked = true;
    } else {
      this.emptySectionsToggle.checked = false;
    }

    this.onInputEmptySectionsToggle();
  }
}