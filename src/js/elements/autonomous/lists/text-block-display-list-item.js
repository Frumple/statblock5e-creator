import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class TextBlockDisplayListItem extends CustomAutonomousElement {
  static get elementName() { return 'text-block-display-list-item'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'text-block-display-list-item',
      'src/html/elements/autonomous/lists/text-block-display-list-item.html');
  }

  constructor() {
    super(TextBlockDisplayListItem.templatePaths);

    this.nameElement = this.shadowRoot.getElementById('text-block-name');
    this.textElement = this.shadowRoot.getElementById('text-block-text');
  }

  get name() {
    return this.nameElement.textContent;
  }

  set name(name) {
    this.nameElement.textContent = `${name}.`;
  }

  get text() {
    return this.textElement.textContent;
  }

  set text(text) {
    this.textElement.textContent = text;
  }
}