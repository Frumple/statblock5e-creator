import DragAndDropList from '/src/js/elements/autonomous/drag-and-drop-list.js';

export default class AttributeList extends DragAndDropList {
  static get elementName() { return 'attribute-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'attribute-list',
      'src/html/elements/autonomous/attribute-list.html');
  }

  constructor() {
    super(AttributeList.templatePaths);
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
}
