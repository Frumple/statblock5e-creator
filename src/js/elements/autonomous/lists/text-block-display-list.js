import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class TextBlockDisplayList extends CustomAutonomousElement {
  static get elementName() { return 'text-block-display-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'text-block-display-list',
      'src/html/elements/autonomous/lists/text-block-display-list.html');
  }

  constructor() {
    super(TextBlockDisplayList.templatePaths);
  }

  clear() {
    let listItemElements = Array.from(this.querySelectorAll('text-block-display-list-item'));
    for (const element of listItemElements) {
      element.remove();
    }
  }

  addTextBlock(name, text) {
    let listItemElement = document.createElement('text-block-display-list-item');
    listItemElement.name = name;
    listItemElement.text = text;
    this.appendChild(listItemElement);
  }
}