import * as sectionModule from '/src/js/elements/autonomous/sections/section.js';

export default class TextBlockListSection extends sectionModule.Section {
  static get templatePaths() {
    return super.templatePaths.set(
      'text-block-list-section',
      'src/html/elements/autonomous/sections/text-block-list-section.html');
  }

  constructor(templatePaths) {
    super(templatePaths,
          TextBlockListShowElements,
          TextBlockListEditElements);
  }

  connectedCallback() {
    this.editElements.addButton.addEventListener('click', this.onClickAddTextBlockButton.bind(this));
  }

  onClickAddTextBlockButton() {
    this.editElements.list.addTextBlock();
  }

  set empty(isEmpty) {
    super.empty = isEmpty;

    const hiddenEmptyLabelClass = 'text-block-list-section__empty-label_hidden';

    if (isEmpty) {
      this.showElements.emptyLabel.classList.remove(hiddenEmptyLabelClass);
    } else {
      this.showElements.emptyLabel.classList.add(hiddenEmptyLabelClass);
    }
  }

  checkForErrors() {
    this.editElements.list.trimTrailingPeriodsInNames();
    this.editElements.list.validate(this.errorMessages);
  }

  updateShowSection() {
    let textBlocks = this.editElements.list.textBlocks;

    this.showElements.displayList.clear();
    for (const textBlock of textBlocks) {
      this.showElements.displayList.addTextBlock(textBlock.name, textBlock.text);
    }

    if (textBlocks.length > 0) {
      this.empty = false;
    } else {
      this.empty = true;
    }
  }
}

class TextBlockListShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.emptyLabel = shadowRoot.getElementById('empty-label');
    this.displayList = shadowRoot.getElementById('display-list');
  }
}

class TextBlockListEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.list = shadowRoot.getElementById('list');
    this.addButton = shadowRoot.getElementById('add-button');
  }
  
  get initiallySelectedElement() {
    return this.addButton;
  }
}