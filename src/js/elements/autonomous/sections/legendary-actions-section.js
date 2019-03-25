import * as blockListSectionModule from './block-list-section.js';

export default class LegendaryActionsSection extends blockListSectionModule.BlockListSection {
  static get elementName() { return 'legendary-actions-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'legendary-actions-section',
      'src/html/elements/autonomous/sections/legendary-actions-section.html');
  }

  constructor() {
    super(LegendaryActionsSection.templatePaths,
          'Legendary Action',
          LegendaryActionsSectionShowElements,
          LegendaryActionsSectionEditElements);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.showElements.displayList.disableBlockNameItalics = true;
      this.editElements.editableList.disableBlockNameItalics = true;

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

  updateShowSection() {
    super.updateShowSection();

    this.showElements.description.innerHTMLSanitized = this.editElements.description.parsedText;
  }

  reparse() {
    super.reparse();

    if (this.mode !== 'edit') {
      this.showElements.description.innerHTMLSanitized = this.editElements.description.parsedText;
    }
  }

  exportToHtml() {
    const fragment = super.exportToHtml();

    const description = document.createElement('p');
    description.innerHTML = this.showElements.description.innerHTMLSanitized;
    fragment.insertBefore(description, fragment.firstElementChild);

    const sectionHeading = document.createElement('h3');
    sectionHeading.textContent = 'Legendary Actions';
    fragment.insertBefore(sectionHeading, fragment.firstElementChild);

    return fragment;
  }
}

class LegendaryActionsSectionShowElements extends blockListSectionModule.EditableBlockListShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.description = shadowRoot.getElementById('description-show');
  }
}

class LegendaryActionsSectionEditElements extends blockListSectionModule.EditableBlockListEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.description = shadowRoot.getElementById('description-edit');
  }
}