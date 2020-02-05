import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import isRunningInJsdom from '../../helpers/is-running-in-jsdom.js';
import { copyObjectProperties } from '../../helpers/object-helpers.js';

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
    CustomBuiltinElementMixins.define(this.elementName, this.mixin);

    if (! isRunningInJsdom) {
      customElements.define(this.elementName, this, { extends: 'input' });
    }
  }

  constructor() {
    super();

    copyObjectProperties(this, this.constructor.mixin);
    this.initializeMixin();
  }
}
