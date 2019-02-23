import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

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
    return Array.from(this.querySelectorAll('display-block-list-item'));
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
}