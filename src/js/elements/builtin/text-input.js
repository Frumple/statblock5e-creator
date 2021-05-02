import { escapeHtml } from '../../helpers/string-formatter.js';
import { parseMarkdown } from '../../parsers/parser.js';

export default class TextInput extends HTMLInputElement {
  static async define() {
    const elementName = 'text-input';
    customElements.define(elementName, this, { extends: 'input' });
  }

  constructor() {
    super();

    this.htmlText = '';
  }

  get fieldName() {
    const prettyName = this.getAttribute('pretty-name');
    return (prettyName ? prettyName : this.name);
  }

  validate(errorMessages) {
    if (this.required && this.value === '') {
      errorMessages.add(this, `${this.fieldName} cannot be blank.`);
    } else if ('parsed' in this.dataset) {
      this.parse(errorMessages);
    }
  }

  parse(errorMessages) {
    const escapedText = escapeHtml(this.value);
    const parserResults = parseMarkdown(escapedText);

    if (parserResults.error) {
      const message = `${this.fieldName} has invalid Markdown syntax.`;
      errorMessages.add(this, message);
    } else {
      this.htmlText = parserResults.outputText;
    }
  }
}
