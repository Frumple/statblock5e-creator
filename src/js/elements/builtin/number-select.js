import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import isRunningInJsdom from '../../helpers/is-running-in-jsdom.js';
import { copyObjectProperties } from '../../helpers/object-helpers.js';
import { convertToInteger } from '../../helpers/number-helpers.js';

export default class NumberSelect extends HTMLSelectElement {
  static async define() {
    const elementName = 'number-select';
    CustomBuiltinElementMixins.define(elementName, NumberSelectMixin);

    if (! isRunningInJsdom) {
      customElements.define(elementName, this, { extends: 'select' });
    }
  }

  constructor() {
    super();

    copyObjectProperties(this, NumberSelectMixin);
    this.initializeMixin();
  }
}

export let NumberSelectMixin = {
  initializeMixin() {
    return;
  },

  get valueAsInt() {
    return convertToInteger(this.value);
  }
};