import { BlockListSection, BlockListShowElements, BlockListEditElements } from './block-list-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class LegendaryActionsSection extends BlockListSection {
  static get elementName() { return 'legendary-actions-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'legendary-actions-section',
      'src/html/elements/autonomous/sections/legendary-actions-section.html');
  }

  constructor() {
    super(LegendaryActionsSection.templatePaths,
          'legendaryActions',
          LegendaryActionsSectionShowElements,
          LegendaryActionsSectionEditElements);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.isInitialized = true;
    }
  }

  get empty() {
    return super.empty;
  }

  set empty(isEmpty) {
    super.empty = isEmpty;

    const hiddenEmptyLabelClass = 'legendary-actions-show-section__text_hidden';

    if (isEmpty) {
      this.showElements.description.classList.add(hiddenEmptyLabelClass);
    } else {
      this.showElements.description.classList.remove(hiddenEmptyLabelClass);
    }
  }

  checkForErrors() {
    super.checkForErrors();

    this.editElements.description.validate(this.errorMessages);
  }

  updateModel() {
    super.updateModel();

    const model = CurrentContext.creature.legendaryActions;

    model.description = this.editElements.description.value;
    model.markdownDescription = this.editElements.description.markdownText;
    model.htmlDescription = this.editElements.description.htmlText;
  }

  updateEditModeView() {
    super.updateEditModeView();

    this.editElements.description.value = CurrentContext.creature.legendaryActions.description;
  }

  updateShowModeView() {
    super.updateShowModeView();

    this.showElements.description.innerHTMLSanitized = CurrentContext.creature.legendaryActions.htmlDescription;
  }

  reparse() {
    this.editElements.description.parse();

    super.reparse();

    if (this.mode === 'show') {
      this.showElements.description.innerHTMLSanitized = CurrentContext.creature.legendaryActions.htmlDescription;
    }
  }
}

class LegendaryActionsSectionShowElements extends BlockListShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.description = shadowRoot.getElementById('description-show');
  }
}

class LegendaryActionsSectionEditElements extends BlockListEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.description = shadowRoot.getElementById('description-edit');
  }
}