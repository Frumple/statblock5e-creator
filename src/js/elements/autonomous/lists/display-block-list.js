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

  clear() {
    let listItemElements = Array.from(this.querySelectorAll('display-block-list-item'));
    for (const element of listItemElements) {
      element.remove();
    }
  }

  addTextBlock(name, text) {
    let listItemElement = document.createElement('display-block-list-item');
    listItemElement.name = name;
    listItemElement.text = text;
    this.appendChild(listItemElement);
  }
}