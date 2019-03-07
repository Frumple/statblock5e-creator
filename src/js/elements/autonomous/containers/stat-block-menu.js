import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class StatBlockMenu extends CustomAutonomousElement {
  static get elementName() { return 'stat-block-menu'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block-menu',
      'src/html/elements/autonomous/containers/stat-block-menu.html');
  }

  constructor() {
    super(StatBlockMenu.templatePaths);

    this.oneColumnButton = this.shadowRoot.getElementById('one-column-label');
    this.twoColumnButton = this.shadowRoot.getElementById('two-column-label');

    this.showEmptySectionsButton = this.shadowRoot.getElementById('show-empty-sections-label');
    this.hideEmptySectionsButton = this.shadowRoot.getElementById('hide-empty-sections-label');

    this.editAllSectionsButton = this.shadowRoot.getElementById('edit-all-sections-button');
    this.saveAllSectionsButton = this.shadowRoot.getElementById('save-all-sections-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.oneColumnButton.addEventListener('click', this.onClickOneColumnButton.bind(this));
      this.twoColumnButton.addEventListener('click', this.onClickTwoColumnButton.bind(this));

      this.showEmptySectionsButton.addEventListener('click', this.onClickShowEmptySectionsButton.bind(this));
      this.hideEmptySectionsButton.addEventListener('click', this.onClickHideEmptySectionsButton.bind(this));

      this.editAllSectionsButton.addEventListener('click', this.onClickEditAllSectionsButton.bind(this));
      this.saveAllSectionsButton.addEventListener('click', this.onClickSaveAllSectionsButton.bind(this));

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

  dispatchMenuEvent(eventType, detail) {
    let menuEvent = new CustomEvent(eventType, {
      bubbles: true,
      composed: true,
      detail: detail
    });
    this.dispatchEvent(menuEvent);
  }
}