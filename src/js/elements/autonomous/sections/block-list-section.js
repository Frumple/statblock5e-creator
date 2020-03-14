import * as sectionModule from './section.js';
import CurrentContext from '../../../models/current-context.js';

export class BlockListSection extends sectionModule.Section {
  static get templatePaths() {
    return super.templatePaths.set(
      'block-list-section',
      'src/html/elements/autonomous/sections/block-list-section.html');
  }

  constructor(templatePaths,
    modelPropertyName,
    showElements = BlockListShowSection,
    editElements = BlockListEditSection) {
    super(templatePaths, modelPropertyName, showElements, editElements);

    this.heading = this.shadowRoot.getElementById('heading');
  }

  connectedCallback() {
    super.connectedCallback();

    this.editElements.editableBlockList.blockType = CurrentContext.creature[this.modelPropertyName].singleName;

    this.reparse();

    this.editElements.addButton.addEventListener('click', this.onClickAddTextBlockButton.bind(this));
  }

  onClickAddTextBlockButton() {
    this.addBlock();
  }

  addBlock(name = '', text = '') {
    this.editElements.editableBlockList.addBlock(name, text);
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
    CurrentContext.creature[this.modelPropertyName].blocks = this.editElements.editableBlockList.toModel();
  }

  updateEditModeView() {
    const blocks = CurrentContext.creature[this.modelPropertyName].blocks;

    this.editElements.editableBlockList.clear();
    for (const block of blocks) {
      this.editElements.editableBlockList.addBlock(block.name, block.text);
    }
  }

  updateShowModeView() {
    const blocks = CurrentContext.creature[this.modelPropertyName].blocks;

    this.showElements.displayBlockList.clear();
    for (const block of blocks) {
      this.showElements.displayBlockList.addBlock(block.name, block.htmlText);
    }

    this.empty = (blocks.length <= 0);
  }

  reparse() {
    this.editElements.editableBlockList.parse();
    this.updateModel();

    for (const [index, blockModel] of CurrentContext.creature[this.modelPropertyName].blocks.entries()) {
      const editableBlock = this.editElements.editableBlockList.blocks[index];
      editableBlock.previewName = blockModel.name;
      editableBlock.previewText = blockModel.htmlText;

      if (this.mode === 'show') {
        const displayBlock = this.showElements.displayBlockList.blocks[index];
        displayBlock.text = blockModel.htmlText;
      }
    }
  }

  importFromOpen5e(json) {
    super.importFromOpen5e(json);
    this.reparse();
  }

  importFromJson(json) {
    super.importFromJson(json);
    this.reparse();
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