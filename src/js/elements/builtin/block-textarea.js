import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import isRunningInNode from '../../helpers/is-running-in-node.js';
import { copyObjectProperties } from '../../helpers/object-helpers.js';
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
    } else if('parsed' in this.dataset) {
      this.parse(errorMessages);
    }
  },

  parse(errorMessages) {
    const nameParserResults = Parser.parseNameExpressions(this.value);

    if (nameParserResults.error) {
      const message = `${this.fieldName} has invalid syntax.`;

      errorMessages.add(this, message);
      return;
    }

    const nameParserText = nameParserResults.outputText;

    const markdownParserResults = Parser.parseMarkdown(nameParserText);

    if (markdownParserResults.error) {
      const message = `${this.fieldName} has invalid syntax.`;

      errorMessages.add(this, message);
      return;
    }

    this.homebreweryText = nameParserText.replace(/\n/g, '  \n> ');
    this.htmlText = markdownParserResults.outputText;
  }
};