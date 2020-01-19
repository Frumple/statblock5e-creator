import DragAndDropList from './drag-and-drop-list.js';
import { focusAndSelectElement } from '../../../helpers/element-helpers.js';

import isRunningInNode from '../../../helpers/is-running-in-node.js';
import EditableBlock from './editable-block.js';

export default class EditableBlockList extends DragAndDropList {
  static get elementName() { return 'editable-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'editable-block-list',
      'src/html/elements/autonomous/lists/editable-block-list.html');
  }

  constructor() {
    super(EditableBlockList.templatePaths);

    this.disableBlockNameItalics = false;
    this.blockType = null;
  }

  get blocks() {
    return Array.from(this.children);
  }

  clear() {
    for (const block of this.blocks) {
      block.remove();
    }
  }

  addBlock(name = '', originalText = '') {
    const block = EditableBlockList.createBlock(this, name, originalText);

    if (this.disableBlockNameItalics) {
      block.disableBlockNameItalics();
    }

    if (isRunningInNode) {
      block.connect();
    }

    this.appendChild(block);

    focusAndSelectElement(block.nameInput);

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

  static createBlock(list, name, originalText) {
    const block = isRunningInNode ? new EditableBlock() : document.createElement('editable-block');

    block.list = list;
    block.name = name;
    block.originalText = originalText;

    block.nameInput.setAttribute('pretty-name', `${list.blockType} Name`);
    block.textArea.setAttribute('pretty-name', `${list.blockType} Text`);

    return block;
  }
}