import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class StatBlockMenu extends CustomAutonomousElement {
  static get elementName() { return 'stat-block-menu'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block-menu',
      'src/html/elements/autonomous/containers/stat-block-menu.html');
  }

  constructor() {
    super(StatBlockMenu.templatePaths);

    this.editAllSectionsButton = this.shadowRoot.getElementById('edit-all-sections-button');
    this.saveAllSectionsButton = this.shadowRoot.getElementById('save-all-sections-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.editAllSectionsButton.addEventListener('click', this.onClickEditAllSectionsButton.bind(this));
      this.saveAllSectionsButton.addEventListener('click', this.onClickSaveAllSectionsButton.bind(this));

      this.isInitialized = true;
    }
  }

  onClickEditAllSectionsButton() {
    let editAllSectionsEvent = new Event('editAllSections', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(editAllSectionsEvent);
  }

  onClickSaveAllSectionsButton() {
    let saveAllSectionsEvent = new Event('saveAllSections', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(saveAllSectionsEvent);
  }
}