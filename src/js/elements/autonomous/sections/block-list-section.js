import * as sectionModule from './section.js';

export class BlockListSection extends sectionModule.Section {
  static get templatePaths() {
    return super.templatePaths.set(
      'block-list-section',
      'src/html/elements/autonomous/sections/block-list-section.html');
  }

  constructor(templatePaths, 
    itemType,
    showElements = EditableBlockListShowElements,
    editElements = EditableBlockListEditElements) {

    super(templatePaths, showElements, editElements);

    this.itemType = itemType;

    this.header = this.shadowRoot.getElementById('header');
  }

  connectedCallback() {
    this.editElements.addButton.addEventListener('click', this.onClickAddTextBlockButton.bind(this));
  }

  onClickAddTextBlockButton() {
    this.addBlock();
  }

  addBlock(name = null, text = null) {
    const block = this.editElements.editableList.addBlock(this.itemType);

    if (name) {
      block.name = name;
    }
    if (text) {
      block.text = text;
    }
  }

  get mode() {
    return super.mode;
  }

  set mode(mode) {
    super.mode = mode;

    const hiddenHeaderClass = 'block-list-section__header_hidden';

    switch (mode) {
    case 'hidden':
      this.header.classList.add(hiddenHeaderClass);
      break;
    case 'show':
      this.header.classList.remove(hiddenHeaderClass);
      break;
    case 'edit':
      this.header.classList.remove(hiddenHeaderClass);
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

  updateShowSection() {
    const blocks = this.editElements.editableList.blocks;

    this.showElements.displayList.clear();
    for (const block of blocks) {
      this.showElements.displayList.addBlock(block.name, block.parsedText);
    }

    if (blocks.length > 0) {
      this.empty = false;
    } else {
      this.empty = true;
    }
  }

  reparse() {
    if (this.mode !== 'edit') {
      this.checkForErrors();

      for (const [index, editableBlock] of this.editElements.editableList.blocks.entries()) {
        const displayBlock = this.showElements.displayList.blocks[index];
        displayBlock.text = editableBlock.parsedText;
      }
    }
  }
}

export class EditableBlockListShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.emptyLabel = shadowRoot.getElementById('empty-label');
    this.displayList = shadowRoot.getElementById('display-list');
  }
}

export class EditableBlockListEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.editableList = shadowRoot.getElementById('editable-list');
    this.addButton = shadowRoot.getElementById('add-button');
  }
  
  get initiallySelectedElement() {
    if (this.editableList.blocks.length > 0) {
      return this.editableList.blocks[0].nameElement;
    }

    return this.addButton;
  }
}