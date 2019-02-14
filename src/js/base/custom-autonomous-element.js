import HtmlTemplates from '/src/js/helpers/html-templates.js';
import isRunningInNode from '/src/js/helpers/is-running-in-node.js';

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

    this.isInitialized = false;
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

  addEventListener(type, callback) {
    // Since this element is fake, add the event listener on the document on behalf of the element.
    document.addEventListener(type, callback);
  }

  dispatchEvent() {
    // This method does nothing since we are only able to test the shadow tree of one custom element at a time for now
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