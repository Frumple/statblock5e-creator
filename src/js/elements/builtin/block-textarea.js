import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import isRunningInNode from '../../helpers/is-running-in-node.js';
import { copyObjectProperties } from '../../helpers/object-helpers.js';
import { escapeHtml } from '../../helpers/string-formatter.js';
import * as Parser from '../../parsers/parser.js';

export default class BlockTextArea extends HTMLTextAreaElement {
  static async define() {
    const elementName = 'block-textarea';
    CustomBuiltinElementMixins.define(elementName, BlockTextAreaMixin);

    if (! isRunningInNode) {
      customElements.define(elementName, this, { extends: 'textarea' });
    }
  }

  constructor() {
    super();

    copyObjectProperties(this, BlockTextAreaMixin);
    this.initializeMixin();
  }
}

const BlockTextAreaMixin = {
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
    }
    this.parse(errorMessages);
  },

  parse(errorMessages = null) {
    const escapedText = escapeHtml(this.value);

    const nameParserResults = Parser.parseNames(escapedText);

    if (errorMessages && nameParserResults.error) {
      errorMessages.add(this, `${this.fieldName} has at least one invalid name expression.`);
      return;
    }

    const mathParserResults = Parser.parseMath(nameParserResults.outputText);

    if (errorMessages && mathParserResults.error) {
      errorMessages.add(this, `${this.fieldName} has at least one invalid math expression.`);
      return;
    }

    const markdownParserResults = Parser.parseMarkdown(mathParserResults.outputText);

    if (errorMessages && markdownParserResults.error) {
      errorMessages.add(this, `${this.fieldName} has invalid markdown syntax.`);
      return;
    }

    this.homebreweryText = mathParserResults.outputText.replace(/\n/g, '  \n> ');
    this.htmlText = markdownParserResults.outputText;
  }
};