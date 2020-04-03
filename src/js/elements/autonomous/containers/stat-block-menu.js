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

    this.oneColumnButton = this.shadowRoot.getElementById('one-column-label');
    this.twoColumnButton = this.shadowRoot.getElementById('two-column-label');

    this.showEmptySectionsButton = this.shadowRoot.getElementById('show-empty-sections-label');
    this.hideEmptySectionsButton = this.shadowRoot.getElementById('hide-empty-sections-label');

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

      this.oneColumnButton.addEventListener('click', this.onClickOneColumnButton.bind(this));
      this.twoColumnButton.addEventListener('click', this.onClickTwoColumnButton.bind(this));

      this.showEmptySectionsButton.addEventListener('click', this.onClickShowEmptySectionsButton.bind(this));
      this.hideEmptySectionsButton.addEventListener('click', this.onClickHideEmptySectionsButton.bind(this));

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

      this.versionButton.textContent = `Version: ${CurrentContext.version}`;

      this.isInitialized = true;
    }
  }

  onClickOneColumnButton() {
    this.dispatchMenuEvent('numberOfColumnsChanged', { columns: 1 });
  }

  onClickTwoColumnButton() {
    this.dispatchMenuEvent('numberOfColumnsChanged', { columns: 2 });
  }

  onClickShowEmptySectionsButton() {
    this.dispatchMenuEvent('emptySectionsVisibilityChanged', { visibility: true });
  }

  onClickHideEmptySectionsButton() {
    this.dispatchMenuEvent('emptySectionsVisibilityChanged', { visibility: false });
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
    this.dispatchMenuEvent('toggleGettingStartedAction');
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

  updateControls() {
    const layoutSettings = CurrentContext.layoutSettings;

    if (layoutSettings.columns === 1) {
      this.oneColumnButton.click();
    } else if (layoutSettings.columns === 2) {
      this.twoColumnButton.click();
    }

    if (layoutSettings.emptySectionsVisibility) {
      this.showEmptySectionsButton.click();
    } else {
      this.hideEmptySectionsButton.click();
    }
  }
}