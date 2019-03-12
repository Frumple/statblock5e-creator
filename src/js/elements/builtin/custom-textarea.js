import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import isRunningInNode from '../../helpers/is-running-in-node.js';
import { copyObjectProperties } from '../../helpers/object-helpers.js';
import parseText from '../../parser/parse-text.js';

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
    this.parsedText = null;
  },

  validate(errorMessages) {
    const prettyName = this.getAttribute('pretty-name');
    const fieldName = prettyName ? prettyName : this.name;

    const sanitizedValue = DOMPurify.sanitize(this.value);

    if (this.required && sanitizedValue === '') {      
      errorMessages.add(this, `${fieldName} cannot be blank.`);
    } else if('parsed' in this.dataset) {
      const parserResults = parseText(sanitizedValue);
      const error = parserResults.error;

      if (error) {
        const message = 
          `${fieldName} has invalid syntax.`;

        errorMessages.add(this, message);
      } else {
        this.parsedText = parserResults.outputText;
      }
    }
  }
};