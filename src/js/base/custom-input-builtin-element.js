export default class CustomInputBuiltinElement extends HTMLInputElement {
  static async defineCustomElement(name, elementClass) {
    customElements.define(name, elementClass, { extends: 'input' });
  }

  constructor() {
    super();
  }
}
