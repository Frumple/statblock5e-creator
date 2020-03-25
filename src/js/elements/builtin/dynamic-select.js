import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import isRunningInJsdom from '../../helpers/is-running-in-jsdom.js';
import { copyObjectProperties } from '../../helpers/object-helpers.js';

export default class DynamicSelect extends HTMLSelectElement {
  static async define() {
    const elementName = 'dynamic-select';
    CustomBuiltinElementMixins.define(elementName, DynamicSelectMixin);

    if (! isRunningInJsdom) {
      customElements.define(elementName, this, { extends: 'select' });
    }
  }

  constructor() {
    super();

    copyObjectProperties(this, DynamicSelectMixin);
    this.initializeMixin();
  }
}

export let DynamicSelectMixin = {
  initializeMixin() {
    return;
  },

  enable() {
    this.removeAttribute('disabled');
  },

  disable() {
    this.setAttribute('disabled', '');
  },

  get isEnabled() {
    return ! this.hasAttribute('disabled');
  },

  clear() {
    while (this.options.length > 0) {
      this.remove(0);
    }
  },

  populate(optionList) {
    for (const option of optionList) {
      this.add(option);
    }
  }
};
