import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class DisplayBlock extends CustomAutonomousElement {
  static get elementName() { return 'display-block'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'display-block',
      'src/html/elements/autonomous/lists/display-block.html');
  }

  constructor(templatePaths) {
    super(templatePaths ? templatePaths : DisplayBlock.templatePaths);

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
    return this.textElement.innerHTMLSanitized;
  }

  set text(text) {
    this.textElement.innerHTMLSanitized = text;
  }
}