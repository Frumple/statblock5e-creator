import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class DisplayBlockList extends CustomAutonomousElement {
  static get elementName() { return 'display-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'display-block-list',
      'src/html/elements/autonomous/lists/display-block-list.html');
  }

  constructor(templatePaths) {
    super(templatePaths ? templatePaths : DisplayBlockList.templatePaths);
  }

  get blockElementTag() {
    return 'display-block';
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
    const block = document.createElement(this.blockElementTag);

    block.name = name;
    block.text = text;

    this.appendChild(block);
  }
}