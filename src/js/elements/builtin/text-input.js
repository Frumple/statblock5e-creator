import CustomBuiltinInputElement from './custom-builtin-input-element.js';
import parseText from '../../parser/parse-text.js';

export default class TextInput extends CustomBuiltinInputElement {
  static get elementName() { return 'text-input'; }
  static get mixin() { return TextInputMixin; }

  constructor() {
    super();
  }
}

export let TextInputMixin = {
  initializeMixin() {
    this.parsedText = null;
  },

  validate(errorMessages) {
    const prettyName = this.getAttribute('pretty-name');
    const fieldName = prettyName ? prettyName : this.name;

    const sanitizedValue = DOMPurify.sanitize(this.value);

    if (this.required && sanitizedValue === '') {      
      errorMessages.add(this, `${fieldName} cannot be blank.`);
    } else if ('parsed' in this.dataset) {
      const parserSettings = {
        enableExpressions: false
      };
      const parserResults = parseText(sanitizedValue, parserSettings);
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
