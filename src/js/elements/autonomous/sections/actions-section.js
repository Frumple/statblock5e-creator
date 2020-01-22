import * as blockListSectionModule from './block-list-section.js';

export default class ActionsSection extends blockListSectionModule.BlockListSection {
  static get elementName() { return 'actions-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'actions-section',
      'src/html/elements/autonomous/sections/actions-section.html');
  }

  constructor() {
    super(ActionsSection.templatePaths,
          'actions',
          ActionsSectionShowElements,
          ActionsSectionEditElements);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.editElements.generateAttackButton.addEventListener('click', this.onClickGenerateAttackButton.bind(this));

      this.addEventListener('generateAttack', this.onGenerateAttackEvent.bind(this));

      this.isInitialized = true;
    }
  }

  onClickGenerateAttackButton() {
    this.editElements.generateAttackDialog.launch();
  }

  onGenerateAttackEvent(event) {
    this.addBlock(event.detail.name, event.detail.text);
    this.reparse();
  }

  reparse() {
    super.reparse();

    this.editElements.generateAttackDialog.update();
  }
}

class ActionsSectionShowElements extends blockListSectionModule.BlockListShowSection {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class ActionsSectionEditElements extends blockListSectionModule.BlockListEditSection {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.generateAttackButton = shadowRoot.getElementById('generate-attack-button');
    this.generateAttackDialog = shadowRoot.getElementById('generate-attack-dialog');
  }
}