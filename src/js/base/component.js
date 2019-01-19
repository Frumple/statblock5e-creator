export default class Component {
  static async defineCustomElement() {
    throw new Error(
      `The class '${this.name}' must implement the defineCustomElement() static method.`);
  }

  constructor(element) {
    this.element = element;
    this.shadowRoot = element.shadowRoot;
  }
}
