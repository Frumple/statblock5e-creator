import CustomBuiltinInputElement from '/src/js/base/custom-builtin-input-element.js';

export default class EnableDisableElementsCheckbox extends CustomBuiltinInputElement {
  static get elementName() { return 'enable-disable-elements-checkbox'; }

  constructor() {
    super();

    this.enabledElements = [];
    this.disabledElements = [];

    this.addEventListener('input', () => {
      if (this.checked) {
        for (const element of this.enabledElements) {
          element.removeAttribute('disabled');
        }
        for (const element of this.disabledElements) {
          element.setAttribute('disabled', '');
        }
      } else {
        for (const element of this.enabledElements) {
          element.setAttribute('disabled', '');
        }
        for (const element of this.disabledElements) {
          element.removeAttribute('disabled');
        }
      }
    });
  }

  enableElementsWhenChecked(...elements) {
    this.enabledElements = this.enabledElements.concat(elements);
  }

  disableElementsWhenChecked(...elements) {
    this.disabledElements = this.disabledElements.concat(elements);
  }
}
