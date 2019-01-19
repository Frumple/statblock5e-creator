import { defineCustomBuiltinElement } from '/src/js/helpers/define-custom-element.js';

export default class EnableDisableElementsCheckbox {
  static async defineCustomElement() {
    defineCustomBuiltinElement(
      'enable-disable-elements-checkbox',
      EnableDisableElementsCheckboxElement,
      'input');
  }
}

class EnableDisableElementsCheckboxElement extends HTMLInputElement {
  constructor() {
    super();

    this.enabledElements = [];
    this.disabledElements = [];

    this.addEventListener('input', () => {
      if (this.checked) {
        this.enabledElements.forEach( (element) => {
          element.removeAttribute('disabled');
        });
        this.disabledElements.forEach( (element) => {
          element.setAttribute('disabled', '');
        });
      } else {
        this.enabledElements.forEach( (element) => {
          element.setAttribute('disabled', '');
        });
        this.disabledElements.forEach( (element) => {
          element.removeAttribute('disabled');
        });
      }
    });
  }

  enableElementWhenChecked(element) {
    this.enabledElements.push(element);
  }

  disableElementWhenChecked(element) {
    this.disabledElements.push(element);
  }
}
