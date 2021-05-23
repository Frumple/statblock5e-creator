import { focusAndSelectElement } from '../../helpers/element-helpers.js';

export default class EnableDisableElementsCheckbox extends HTMLInputElement {
  static async define() {
    const elementName = 'enable-disable-elements-checkbox';
    customElements.define(elementName, this, { extends: 'input' });
  }

  constructor() {
    super();

    this.enabledElements = [];
    this.disabledElements = [];
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.addEventListener('input', this.onInputCheckbox.bind(this));

      this.initialized = true;
    }
  }

  onInputCheckbox() {
    const elementsToEnable = this.checked ? this.enabledElements : this.disabledElements;
    const elementsToDisable = this.checked ? this.disabledElements : this.enabledElements;

    for (const [index, element] of elementsToEnable.entries()) {
      element.removeAttribute('disabled');
      if (index === 0) {
        focusAndSelectElement(element);
      }
    }
    for (const element of elementsToDisable) {
      element.setAttribute('disabled', '');
    }
  }

  enableElementsWhenChecked(...elements) {
    this.enabledElements = this.enabledElements.concat(elements);
  }

  disableElementsWhenChecked(...elements) {
    this.disabledElements = this.disabledElements.concat(elements);
  }
}