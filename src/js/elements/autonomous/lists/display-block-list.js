import CustomAutonomousElement from '../custom-autonomous-element.js';

import isRunningInNode from '../../../helpers/is-running-in-node.js';
import DisplayBlock from './display-block.js';

export default class DisplayBlockList extends CustomAutonomousElement {
  static get elementName() { return 'display-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'display-block-list',
      'src/html/elements/autonomous/lists/display-block-list.html');
  }

  constructor() {
    super(DisplayBlockList.templatePaths);

    this.disableBlockNameItalics = false;
  }

  get blocks() {
    return Array.from(this.children);
  }

  clear() {
    for (const block of this.blocks) {
      this.removeChild(block);
    }
  }

  addBlock(name, text) {
    const block = DisplayBlockList.createBlock(name, text);

    if (this.disableBlockNameItalics) {
      block.disableBlockNameItalics();
    }

    this.appendChild(block);
  }

  static createBlock(name, text) {
    const block = isRunningInNode ? new DisplayBlock() : document.createElement('display-block');

    block.name = name;
    block.text = text;

    return block;
  }
}