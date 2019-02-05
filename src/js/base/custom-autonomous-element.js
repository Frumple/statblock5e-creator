import HtmlTemplates from '../helpers/html-templates.js';
import isRunningInNode from '../helpers/is-running-in-node.js';

class CustomAutonomousElement extends HTMLElement {
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

    this.attachShadow({mode: 'open'});

    for (const name of templatePaths.keys()) {
      let template = HtmlTemplates.getTemplate(name);
      let fragment = document.createRange().createContextualFragment(template);
      this.shadowRoot.appendChild(fragment.cloneNode(true));
    }
  }
}

class FakeCustomAutonomousElement {
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
  }

  constructor(templatePaths) {
    this.dataset = new Map();

    this.shadowRoot = document;

    for (const name of templatePaths.keys()) {
      let template = HtmlTemplates.getTemplate(name);
      this.shadowRoot.body.innerHTML += template;
    }
  }

  dispatchEvent() {
    // This method does nothing since we are only able to test one custom element at time for now
    return;
  }
}

let elementClass;

if (isRunningInNode) {
  elementClass = FakeCustomAutonomousElement;
} else {
  elementClass = CustomAutonomousElement;
}

export default elementClass;