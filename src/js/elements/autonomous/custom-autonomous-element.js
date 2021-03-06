import HtmlTemplates from '../../helpers/html-templates.js';

export default class CustomAutonomousElement extends HTMLElement {
  static get elementName() {
    throw new Error(
      `The class '${this.name}' must implement the elementName() getter.`);
  }

  static get templatePaths() {
    return new Map();
  }

  static async define() {
    for (const [name, path] of this.templatePaths) {
      if (! HtmlTemplates.hasTemplate(name)) {
        await HtmlTemplates.addTemplate(name, path);
      }
    }

    customElements.define(this.elementName, this);
  }

  constructor(templatePaths) {
    super();

    this.isInitialized = false;
    this.attachShadow({mode: 'open'});

    for (const name of templatePaths.keys()) {
      const template = HtmlTemplates.getTemplate(name);
      const fragment = document.createRange().createContextualFragment(template);
      this.shadowRoot.appendChild(fragment.cloneNode(true));
    }
  }

  connectedCallback() {
    return;
  }
}