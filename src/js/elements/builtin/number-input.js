import { convertToInteger } from '../../helpers/number-helpers.js';

export default class NumberInput extends HTMLInputElement {
  static async define() {
    const elementName = 'number-input';
    customElements.define(elementName, this, { extends: 'input' });
  }

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.addEventListener('input', this.onInput);

      this.initialized = true;
    }
  }

  onInput() {
    if (this.value) {
      let value = this.valueAsInt;

      if (this.min && value < this.minAsInt) {
        this.value = this.min;
      } else if(this.max && value > this.maxAsInt) {
        this.value = this.max;
      } else {
        // Used to eliminate leading zeroes from the inputted value
        this.value = value;
      }
    }
  }

  validate(errorMessages) {
    if (this.valueAsInt === null) {
      const prettyName = this.getAttribute('pretty-name');
      const fieldName = prettyName ? prettyName : this.name;
      errorMessages.add(this, `${fieldName} must be a valid number.`);
    }
  }

  get valueAsInt() {
    return convertToInteger(this.value);
  }

  get minAsInt() {
    return convertToInteger(this.min);
  }

  get maxAsInt() {
    return convertToInteger(this.max);
  }
}