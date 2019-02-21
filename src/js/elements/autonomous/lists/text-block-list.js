import DragAndDropList from '/src/js/elements/autonomous/lists/drag-and-drop-list.js';

export default class TextBlockList extends DragAndDropList {
  static get elementName() { return 'text-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'text-block-list',
      'src/html/elements/autonomous/lists/text-block-list.html');
  }

  constructor() {
    super(TextBlockList.templatePaths);
  }

  get textBlocks() {
    let listItemElements = Array.from(this.querySelectorAll('text-block-list-item'));
    return listItemElements;
  }

  addTextBlock() {
    let listItemElement = document.createElement('text-block-list-item');
    this.appendChild(listItemElement);
  }

  validate(errorMessages) {
    let listItemElements = Array.from(this.querySelectorAll('text-block-list-item'));
    for (const element of listItemElements) {
      element.validate(errorMessages);
    }
  }
}