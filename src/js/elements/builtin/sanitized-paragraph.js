import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import isRunningInJsdom from '../../helpers/is-running-in-jsdom.js';
import { copyObjectProperties } from '../../helpers/object-helpers.js';
import sanitizeHTML from '../../helpers/sanitize-html.js';

export default class SanitizedParagraph extends HTMLParagraphElement {
  static async define() {
    const elementName = 'sanitized-paragraph';
    CustomBuiltinElementMixins.define(elementName, SanitizedParagraphMixin);

    if (! isRunningInJsdom) {
      customElements.define(elementName, this, { extends: 'p' });
    }
  }

  constructor() {
    super();

    copyObjectProperties(this, SanitizedParagraphMixin);
    this.initializeMixin();
  }
}

const SanitizedParagraphMixin = {
  initializeMixin() {
    return;
  },

  set innerHTMLSanitized(html) {
    this.innerHTML = sanitizeHTML(html);
  },

  get innerHTMLSanitized() {
    return this.innerHTML;
  }
};