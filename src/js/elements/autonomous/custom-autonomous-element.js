import HtmlTemplates from '../../helpers/html-templates.js';
import isRunningInNode from '../../helpers/is-running-in-node.js';

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

  constructor(templatePaths, parent = null) {
    this._parent = parent;
    this._children = [];

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

  // Since this element is fake, add event listeners and dispatch events
  // from the fake shadow root on behalf of the element.
  addEventListener(type, callback) {    
    this.shadowRoot.addEventListener(type, callback);
  }

  dispatchEvent(event) {    
    this.shadowRoot.dispatchEvent(event);

    // Simulate event bubbling by dispatching the event to the parent if it exists.
    // Notes:
    // - Unlike real event bubbling, this event will continue to bubble even 
    //   if it is caught by a listener.
    // - JSDOM doesn't support the 'composed' property on events, so we only check
    //   if the event 'bubbles' property is true

    if (this._parent !== null && event.bubbles) {      
      this._parent.dispatchEvent(event);
    }
  }

  // Since this element is fake, non-shadow DOM child elements that are added
  // to the element are stored in an internal array.
  get children() {
    return this._children;
  }

  appendChild(child) {
    this._children.push(child);
  }

  removeChild(child) {
    const index = this._children.indexOf(child);
    if (index >= 0) {
      this._children.splice(index, 1);
    }
  }

  insertBefore(newNode, referenceNode) {
    const newNodeIndex = this._children.indexOf(newNode);
    const referenceNodeIndex = this._children.indexOf(referenceNode);
    this._children.splice(referenceNodeIndex, 0, this._children.splice(newNodeIndex, 1)[0]);
  }
}

let elementClass;

if (isRunningInNode) {
  elementClass = FakeCustomAutonomousElement;
} else {
  elementClass = CustomAutonomousElement;
}

export default elementClass;