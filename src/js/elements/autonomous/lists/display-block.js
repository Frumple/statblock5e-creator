import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class DisplayBlock extends CustomAutonomousElement {
  static get elementName() { return 'display-block'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'display-block',
      'src/html/elements/autonomous/lists/display-block.html');
  }

  constructor() {
    super(DisplayBlock.templatePaths);

    this.blockElement = this.shadowRoot.getElementById('display-block');
    this.nameElement = this.shadowRoot.getElementById('display-block-name');
    this.textElement = this.shadowRoot.getElementById('display-block-text');
  }

  applyLegendaryActionStyles() {
    this.blockElement.classList.add('display-block_no-spacing');
    this.blockElement.classList.add('display-block_hanging-indent');
    this.nameElement.classList.add('display-block__name_no-italic');
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