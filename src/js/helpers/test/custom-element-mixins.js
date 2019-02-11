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
        Object.assign(element, mixin);
        element.iniitalizeMixin();
      }
    }
  }
}

export default new CustomElementMixins();