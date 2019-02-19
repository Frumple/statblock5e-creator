import DragAndDropList from '/src/js/elements/autonomous/drag-and-drop-list.js';

export default class PropertyList extends DragAndDropList {
  static get elementName() { return 'property-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'property-list',
      'src/html/elements/autonomous/property-list.html');
  }

  constructor() {
    super(PropertyList.templatePaths);
  }

  get itemsAsText() {
    let listItemElements = Array.from(this.querySelectorAll('property-list-item'));
    return listItemElements.map(element => element.text);
  }

  contains(itemText) {
    return this.itemsAsText.includes(itemText);
  }

  addItem(itemText) {
    let listItemElement = document.createElement('property-list-item');
    listItemElement.text = itemText;
    this.appendChild(listItemElement);
  }

  findItem(itemText) {
    let listItemElements = Array.from(this.querySelectorAll('property-list-item'));
    return listItemElements.filter(element => element.text === itemText)[0];
  }  
}
