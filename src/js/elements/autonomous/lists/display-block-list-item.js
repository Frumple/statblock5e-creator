import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class DisplayBlockListItem extends CustomAutonomousElement {
  static get elementName() { return 'display-block-list-item'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'display-block-list-item',
      'src/html/elements/autonomous/lists/display-block-list-item.html');
  }

  constructor() {
    super(DisplayBlockListItem.templatePaths);

    this.nameElement = this.shadowRoot.getElementById('display-block-name');
    this.textElement = this.shadowRoot.getElementById('display-block-text');
  }

  get name() {
    return this.nameElement.textContent;
  }

  set name(name) {
    this.nameElement.textContent = name;
  }

  get text() {
    return this.textElement.innerHTML;
  }

  set text(text) {
    this.textElement.innerHTML = text;
  }
}