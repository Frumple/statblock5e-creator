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
    super.connectedCallback();

    this.reparse();

    this.editElements.addButton.addEventListener('click', this.onClickAddTextBlockButton.bind(this));
  }

  onClickAddTextBlockButton() {
    this.addBlock();
  }

  addBlock(name = null, text = null) {
    const block = this.editElements.editableBlockList.addBlock(this.listModel.singleName);

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
    this.editElements.editableBlockList.validate(this.errorMessages);
  }

  updateModel() {
    this.listModel.blocks = this.editElements.editableBlockList.toModel();
  }

  updateEditModeView() {
    const blocks = this.listModel.blocks;

    this.editElements.editableBlockList.clear();
    for (const block of blocks) {
      this.editElements.editableBlockList.addBlock(this.listModel.singleName, block.name, block.originalText);
    }
  }

  updateShowModeView() {
    const blocks = this.listModel.blocks;

    this.showElements.displayBlockList.clear();
    for (const block of blocks) {
      this.showElements.displayBlockList.addBlock(block.name, block.htmlText);
    }

    if (blocks.length > 0) {
      this.empty = false;
    } else {
      this.empty = true;
    }
  }

  reparse() {
    this.editElements.editableBlockList.parse();
    this.updateModel();

    for (const [index, blockModel] of this.listModel.blocks.entries()) {
      const editableBlock = this.editElements.editableBlockList.blocks[index];
      editableBlock.previewName = blockModel.name;
      editableBlock.previewText = blockModel.htmlText;

      if (this.mode === 'show') {
        const displayBlock = this.showElements.displayBlockList.blocks[index];
        displayBlock.text = blockModel.htmlText;
      }
    }
  }

  exportToJson() {
    return this.listModel.toJson();
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
    this.displayBlockList = shadowRoot.getElementById('display-block-list');
  }
}

export class BlockListEditSection extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.editableBlockList = shadowRoot.getElementById('editable-block-list');
    this.addButton = shadowRoot.getElementById('add-button');
  }

  get initiallySelectedElement() {
    if (this.editableBlockList.blocks.length > 0) {
      return this.editableBlockList.blocks[0].nameInput;
    }

    return this.addButton;
  }
}