import CustomBuiltinElementMixins from '/src/js/helpers/custom-builtin-element-mixins.js';
import isRunningInNode from '/src/js/helpers/is-running-in-node.js';
import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';

export default class CustomTextArea extends HTMLTextAreaElement {
  static async define() {
    const elementName = 'custom-textarea';
    CustomBuiltinElementMixins.define(elementName, CustomTextAreaMixin);

    if (! isRunningInNode) {
      customElements.define(elementName, this, { extends: 'textarea' });
    }
  }

  constructor() {
    super();

    copyObjectProperties(this, CustomTextAreaMixin);
    this.initializeMixin();
  }
}

const CustomTextAreaMixin = {
  initializeMixin() {
    return;
  },

  validate(errorMessages) {
    if (this.required && this.value === '') {
      let prettyName = this.getAttribute('pretty-name');
      let fieldName = prettyName ? prettyName : this.name;
      errorMessages.add(this, `${fieldName} cannot be blank.`);
    }
  }
};