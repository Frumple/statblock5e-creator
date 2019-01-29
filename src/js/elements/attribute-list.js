import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class AttributeList extends CustomAutonomousElement {
  static get elementName() { return 'attribute-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'attribute-list',
      'src/html/elements/attribute-list.html');
  }

  constructor() {
    super(AttributeList.templatePaths);

    this.draggedItem = null;
  }

  get itemTextList() {
    let listItemElements = this.querySelectorAll('attribute-list-item');
    let elementArray = Array.from(listItemElements);
    return elementArray.map(element => element.text);
  }

  contains(text) {
    return this.itemTextList.includes(text);
  }

  addItem(text) {
    let listItemElement = document.createElement('attribute-list-item');
    listItemElement.text = text;
    this.appendChild(listItemElement);
  }

  insertDraggedItemBefore(element) {
    if (this.draggedItem !== null) {
      this.insertBefore(this.draggedItem, element);
      this.draggedItem = null;
    }
  }
}
