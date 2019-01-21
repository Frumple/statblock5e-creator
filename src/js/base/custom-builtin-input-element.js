export default class CustomBuiltinInputElement extends HTMLInputElement {
  static get elementName() {
    throw new Error(
      `The class '${this.name}' must implement the elementName() getter.`);
  }

  static async define() {
    customElements.define(this.elementName, this, { extends: 'input' });
  }

  constructor() {
    super();
  }
}
