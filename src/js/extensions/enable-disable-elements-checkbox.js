import CustomInputBuiltinElement from '/src/js/base/custom-input-builtin-element.js';

export default class EnableDisableElementsCheckbox extends CustomInputBuiltinElement {
  static get elementName() { return 'enable-disable-elements-checkbox'; }

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
