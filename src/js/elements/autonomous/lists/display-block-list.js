import CustomAutonomousElement from '../custom-autonomous-element.js';

import isRunningInNode from '../../../helpers/is-running-in-node.js';
import DisplayBlockListItem from './display-block-list-item.js';

export default class DisplayBlockList extends CustomAutonomousElement {
  static get elementName() { return 'display-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'display-block-list',
      'src/html/elements/autonomous/lists/display-block-list.html');
  }

  constructor() {
    super(DisplayBlockList.templatePaths);
  }

  get blocks() {
    return Array.from(this.children);
  }

  clear() {
    for (const block of this.blocks) {
      block.remove();
    }
  }

  addBlock(name, text) {
    const block = document.createElement('display-block-list-item');
    block.name = name;
    block.text = text;
    this.appendChild(block);
  }

  static createListItem() {
    if (isRunningInNode) {
      return new DisplayBlockListItem();
    }
    return document.createElement('display-block-list-item');
  }
}