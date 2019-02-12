import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';

class CustomElementMixins {
  constructor() {
    this.mixins = new Map();
  }

  define(elementName, mixin) {
    this.mixins.set(elementName, mixin);
  }

  applyToElement(element) {
    const is = element.getAttribute('is');

    if (is) {
      const mixin = this.mixins.get(is);

      if (mixin) {
        copyObjectProperties(element, mixin);
        element.initializeMixin();
      }
    }
  }
}

export default new CustomElementMixins();