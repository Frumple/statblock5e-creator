import DragAndDropList from './drag-and-drop-list.js';

import { focusAndSelectElement } from '../../../helpers/element-helpers.js';

export default class EditableBlockList extends DragAndDropList {
  static get elementName() { return 'editable-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'editable-block-list',
      'src/html/elements/autonomous/lists/editable-block-list.html');
  }

  constructor() {
    super(EditableBlockList.templatePaths);

    this.singleName = null;
    this.isLegendaryActionList = false;
  }

  get blocks() {
    return Array.from(this.children);
  }

  clear() {
    for (const block of this.blocks) {
      block.remove();
    }
  }

  addBlock(name = '', text = '') {
    const block = this.createBlock(name, text);

    // TODO: Refactor legendary action behaviour into subclass instead
    if (this.isLegendaryActionList) {
      block.convertToLegendaryActionBlock();
    }

    this.appendChild(block);

    focusAndSelectElement(block.nameInput);

    return block;
  }

  createBlock(name, text) {
    const block = document.createElement('editable-block');

    block.list = this;
    block.name = name;
    block.text = text;

    block.nameInput.setAttribute('pretty-name', `${this.singleName} Name`);
    block.textArea.setAttribute('pretty-name', `${this.singleName} Text`);

    return block;
  }

  validate(errorMessages) {
    for (const block of this.blocks) {
      block.validate(errorMessages);
    }
  }

  parse() {
    for (const block of this.blocks) {
      block.parse();
    }
  }

  toModel() {
    return this.blocks.map(block => block.toModel());
  }
}