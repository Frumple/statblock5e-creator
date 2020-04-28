import { BlockListSection, BlockListShowElements, BlockListEditElements } from './block-list-section.js';

export default class SpecialTraitsSection extends BlockListSection {
  static get elementName() { return 'special-traits-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'special-traits-section',
      'src/html/elements/autonomous/sections/special-traits-section.html');
  }

  constructor() {
    super(SpecialTraitsSection.templatePaths,
          'specialTraits',
          SpecialTraitsSectionShowElements,
          SpecialTraitsSectionEditElements);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.editElements.generateSpellcastingButton.addEventListener('click', this.onClickGenerateSpellcastingButton.bind(this));

      this.addEventListener('generateSpellcasting', this.onGenerateSpellcasting.bind(this));

      this.isInitialized = true;
    }
  }

  onClickGenerateSpellcastingButton() {
    this.editElements.generateSpellcastingDialog.launch();
  }

  onGenerateSpellcasting(event) {
    this.addBlock(event.detail.name, event.detail.text);
    this.reparse();
  }

  reparse() {
    super.reparse();

    this.editElements.generateSpellcastingDialog.update();
  }
}

class SpecialTraitsSectionShowElements extends BlockListShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class SpecialTraitsSectionEditElements extends BlockListEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.generateSpellcastingButton = shadowRoot.getElementById('generate-spellcasting-button');
    this.generateSpellcastingDialog = shadowRoot.getElementById('generate-spellcasting-dialog');
  }
}