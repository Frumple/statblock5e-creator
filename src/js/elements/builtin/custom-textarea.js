import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import isRunningInNode from '../../helpers/is-running-in-node.js';
import { copyObjectProperties } from '../../helpers/object-helpers.js';
import * as Parser from '../../parsers/parser.js';

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
    this.htmlText = null;
  },

  get fieldName() {
    const prettyName = this.getAttribute('pretty-name');
    return (prettyName ? prettyName : this.name);
  },

  validate(errorMessages) {
    if (this.required && this.value === '') {      
      errorMessages.add(this, `${this.fieldName} cannot be blank.`);
    } else if('parsed' in this.dataset) {
      this.parse(errorMessages);
    }
  },

  parse(errorMessages) {
    const expressionParserResults = Parser.parseExpressions(this.value);

    if (expressionParserResults.error) {
      const message = `${this.fieldName} has invalid syntax.`;

      errorMessages.add(this, message);
      return;
    } 
    
    const expressionParsedText = expressionParserResults.outputText;

    const markdownParserResults = Parser.parseMarkdown(expressionParsedText);

    if (markdownParserResults.error) {
      const message = `${this.fieldName} has invalid syntax.`;

      errorMessages.add(this, message);
      return;
    }

    this.homebreweryText = expressionParsedText.replace(/\n/g, '  \n> ');
    this.htmlText = markdownParserResults.outputText;    
  }
};