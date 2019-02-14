import CustomElementMixins from '/src/js/helpers/test/custom-element-mixins.js';
import isRunningInNode from '/src/js/helpers/is-running-in-node.js';
import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';

export default class CustomBuiltinInputElement extends HTMLInputElement {
  static get elementName() {
    throw new Error(
      `The class '${this.name}' must implement the elementName() getter.`);
  }

  static get mixin() {
    throw new Error(
      `The class '${this.name}' must implement the mixin() getter.`);
  }

  static define() {
    CustomElementMixins.define(this.elementName, this.mixin);

    if (! isRunningInNode) {
      customElements.define(this.elementName, this, { extends: 'input' });
    }
  }

  constructor() {
    super();

    copyObjectProperties(this, this.constructor.mixin);
    this.initializeMixin();
  }
}
