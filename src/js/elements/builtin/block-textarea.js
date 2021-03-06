import { escapeHtml } from '../../helpers/string-formatter.js';
import { parseAll } from '../../parsers/parser.js';

export default class BlockTextArea extends HTMLTextAreaElement {
  static async define() {
    const elementName = 'block-textarea';
    customElements.define(elementName, this, { extends: 'textarea' });
  }

  constructor() {
    super();

    this.htmlText = null;
  }

  get fieldName() {
    const prettyName = this.getAttribute('pretty-name');
    return (prettyName ? prettyName : this.name);
  }

  validate(errorMessages) {
    if (this.required && this.value === '') {
      errorMessages.add(this, `${this.fieldName} cannot be blank.`);
    }
    this.parse(errorMessages);
  }

  parse(errorMessages = null) {
    const escapedText = escapeHtml(this.value);

    const parserResults = parseAll(escapedText);

    if (errorMessages) {
      if (parserResults.nameParserResults.error) {
        errorMessages.add(this, `${this.fieldName} has at least one invalid name expression.`);
      } else if (parserResults.mathParserResults.error) {
        errorMessages.add(this, `${this.fieldName} has at least one invalid math expression.`);
      } else if (parserResults.markdownParserResults.error) {
        errorMessages.add(this, `${this.fieldName} has invalid markdown syntax.`);
      }
    }

    if (! parserResults.mathParserResults.error) {
      this.markdownText = parserResults.mathParserResults.outputText.replace(/\n/g, '  \n> ');
    }

    this.htmlText = parserResults.text;
  }
}