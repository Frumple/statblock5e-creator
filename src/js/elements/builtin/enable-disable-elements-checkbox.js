import CustomBuiltinInputElement from './custom-builtin-input-element.js';
import { focusAndSelectElement } from '../../helpers/element-helpers.js';

export default class EnableDisableElementsCheckbox extends CustomBuiltinInputElement {
  static get elementName() { return 'enable-disable-elements-checkbox'; }
  static get mixin() { return EnableDisableElementsCheckboxMixin; }

  constructor() {
    super();
  }
}

export let EnableDisableElementsCheckboxMixin = {
  enabledElements: [],
  disabledElements: [],

  initializeMixin() {
    this.addEventListener('input', this.onInputCheckbox.bind(this));
  },

  onInputCheckbox() {
    let elementsToEnable, elementsToDisable;       
    if (this.checked) {
      elementsToEnable = this.enabledElements;
      elementsToDisable = this.disabledElements;        
    } else {
      elementsToEnable = this.disabledElements;
      elementsToDisable = this.enabledElements;
    }

    for (const [index, element] of elementsToEnable.entries()) {
      element.removeAttribute('disabled');
      if (index === 0) {
        focusAndSelectElement(element);
      }
    }
    for (const element of elementsToDisable) {
      element.setAttribute('disabled', '');
    }
  },

  enableElementsWhenChecked(...elements) {
    this.enabledElements = this.enabledElements.concat(elements);
  },

  disableElementsWhenChecked(...elements) {
    this.disabledElements = this.disabledElements.concat(elements);
  }
};