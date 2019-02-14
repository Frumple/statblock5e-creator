import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class AttributeList extends CustomAutonomousElement {
  static get elementName() { return 'attribute-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'attribute-list',
      'src/html/elements/autonomous/attribute-list.html');
  }

  constructor() {
    super(AttributeList.templatePaths);

    this.draggedItem = null;
  }

  get itemsAsText() {
    let listItemElements = Array.from(this.querySelectorAll('attribute-list-item'));
    return listItemElements.map(element => element.text);
  }

  contains(itemText) {
    return this.itemsAsText.includes(itemText);
  }

  addItem(itemText) {
    let listItemElement = document.createElement('attribute-list-item');
    listItemElement.text = itemText;
    this.appendChild(listItemElement);
  }

  findItem(itemText) {
    let listItemElements = Array.from(this.querySelectorAll('attribute-list-item'));
    return listItemElements.filter(element => element.text === itemText)[0];
  }

  insertDraggedItemBefore(element) {
    if (this.draggedItem !== null) {
      this.insertBefore(this.draggedItem, element);
      this.draggedItem = null;
    }
  }
}
