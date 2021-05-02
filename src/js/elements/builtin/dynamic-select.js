export default class DynamicSelect extends HTMLSelectElement {
  static async define() {
    const elementName = 'dynamic-select';
    customElements.define(elementName, this, { extends: 'select' });
  }

  constructor() {
    super();
  }

  enable() {
    this.removeAttribute('disabled');
  }

  disable() {
    this.setAttribute('disabled', '');
  }

  get isEnabled() {
    return ! this.hasAttribute('disabled');
  }

  clear() {
    while (this.options.length > 0) {
      this.remove(0);
    }
  }

  populate(optionList) {
    for (const option of optionList) {
      this.add(option);
    }
  }
}
