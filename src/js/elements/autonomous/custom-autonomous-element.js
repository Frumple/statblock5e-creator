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
      const template = HtmlTemplates.getTemplate(name);
      const fragment = document.createRange().createContextualFragment(template);
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

    // Create an in-memory fake shadow root and append the HTML templates to its body
    this.shadowRoot = document.createDocumentFragment();
    const body = document.createElement('body');
    this.shadowRoot.appendChild(body);

    for (const name of templatePaths.keys()) {
      const template = HtmlTemplates.getTemplate(name);
      body.innerHTML += template;
    }
  }

  connectedCallback() {
    return;
  }

  connect() {
    this.isConnected = true;
    this.connectedCallback();
  }

  addEventListener(type, callback) {
    // Since this element is fake, add the event listener to the fake shadow root on behalf of the element.
    this.shadowRoot.addEventListener(type, callback);
  }

  dispatchEvent(event) {
    // Since this element is fake, dispatch the event from the fake shadow root on behalf of the element.
    this.shadowRoot.dispatchEvent(event);
  }
}

let elementClass;

if (isRunningInNode) {
  elementClass = FakeCustomAutonomousElement;
} else {
  elementClass = CustomAutonomousElement;
}

export default elementClass;