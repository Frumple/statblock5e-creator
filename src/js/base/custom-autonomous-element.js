import HtmlTemplates from '/src/js/helpers/html-templates.js';

export default class CustomAutonomousElement extends HTMLElement {
  static get elementName() {
    throw new Error(
      `The class '${this.name}' must implement the elementName() getter.`);
  }

  static get templatePath() {
    throw new Error(
      `The class '${this.name}' must implement the templatePath() getter.`);
  }

  static async define() {
    await HtmlTemplates.addTemplate(this.elementName, this.templatePath);
    customElements.define(this.elementName, this);
  }

  constructor(elementName) {
    super();

    let template = HtmlTemplates.getTemplate(elementName);
    this.attachShadow({mode: 'open'})
      .appendChild(template.cloneNode(true));
  }
}
