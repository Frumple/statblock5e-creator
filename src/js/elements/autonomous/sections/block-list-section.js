import * as sectionModule from './section.js';

export class BlockListSection extends sectionModule.Section {
  static get templatePaths() {
    return super.templatePaths.set(
      'block-list-section',
      'src/html/elements/autonomous/sections/block-list-section.html');
  }

  constructor(templatePaths,
    listModel,
    showElements = BlockListShowSection,
    editElements = BlockListEditSection) {
    super(templatePaths, showElements, editElements);

    this.listModel = listModel;
    this.heading = this.shadowRoot.getElementById('heading');
  }

  connectedCallback() {
    this.editElements.addButton.addEventListener('click', this.onClickAddTextBlockButton.bind(this));
  }

  onClickAddTextBlockButton() {
    this.addBlock();
  }

  addBlock(name = null, text = null) {
    const block = this.editElements.editableList.addBlock(this.listModel.singleName);

    if (name) {
      block.name = name;
    }
    if (text) {
      block.originalText = text;
    }
  }

  get mode() {
    return super.mode;
  }

  set mode(mode) {
    super.mode = mode;

    const hiddenHeadingClass = 'block-list-section__heading_hidden';

    switch (mode) {
    case 'hidden':
      this.heading.classList.add(hiddenHeadingClass);
      break;
    case 'show':
      this.heading.classList.remove(hiddenHeadingClass);
      break;
    case 'edit':
      this.heading.classList.remove(hiddenHeadingClass);
      break;
    }
  }

  get empty() {
    return super.empty;
  }

  set empty(isEmpty) {
    super.empty = isEmpty;

    const hiddenEmptyLabelClass = 'block-list-section__empty-label_hidden';

    if (isEmpty) {
      this.showElements.emptyLabel.classList.remove(hiddenEmptyLabelClass);
    } else {
      this.showElements.emptyLabel.classList.add(hiddenEmptyLabelClass);
    }
  }

  checkForErrors() {
    this.editElements.editableList.trimTrailingPeriodsInNames();
    this.editElements.editableList.validate(this.errorMessages);
  }

  updateModel() {
    this.listModel.blocks = this.editElements.editableList.toModel();
  }

  updateView() {
    const blocks = this.listModel.blocks;

    this.showElements.displayList.clear();
    for (const block of blocks) {
      this.showElements.displayList.addBlock(block.name, block.htmlText);
    }

    if (blocks.length > 0) {
      this.empty = false;
    } else {
      this.empty = true;
    }
  }

  reparse() {
    this.editElements.editableList.parse();
    this.updateModel();

    for (const [index, blockModel] of this.listModel.blocks.entries()) {
      const editableBlock = this.editElements.editableList.blocks[index];
      editableBlock.textPreview.innerHTMLSanitized = blockModel.htmlText;

      if (this.mode === 'show') {
        const displayBlock = this.showElements.displayList.blocks[index];
        displayBlock.text = blockModel.htmlText;
      }
    }
  }

  exportToHtml() {
    return this.listModel.toHtml();
  }

  exportToHomebrewery() {
    return this.listModel.toHomebrewery();
  }
}

export class BlockListShowSection extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.emptyLabel = shadowRoot.getElementById('empty-label');
    this.displayList = shadowRoot.getElementById('display-list');
  }
}

export class BlockListEditSection extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.editableList = shadowRoot.getElementById('editable-list');
    this.addButton = shadowRoot.getElementById('add-button');
  }

  get initiallySelectedElement() {
    if (this.editableList.blocks.length > 0) {
      return this.editableList.blocks[0].nameInput;
    }

    return this.addButton;
  }
}