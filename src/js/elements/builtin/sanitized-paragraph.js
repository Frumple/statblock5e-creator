import sanitizeHTML from '../../helpers/sanitize-html.js';

export default class SanitizedParagraph extends HTMLParagraphElement {
  static async define() {
    const elementName = 'sanitized-paragraph';
    customElements.define(elementName, this, { extends: 'p' });
  }

  constructor() {
    super();
  }

  set innerHTMLSanitized(html) {
    this.innerHTML = sanitizeHTML(html);
  }

  get innerHTMLSanitized() {
    return this.innerHTML;
  }
}