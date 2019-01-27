import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class AttributeList extends CustomAutonomousElement {
  static get elementName() { return 'attribute-list'; }
  static get templatePath() { return 'src/html/elements/attribute-list.html'; }

  constructor() {
    super(AttributeList.elementName);
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
    let spanElement = document.createElement('span');
    spanElement.setAttribute('slot', 'text');
    spanElement.textContent = text;

    listItemElement.appendChild(spanElement);
    this.appendChild(listItemElement);
  }
}
