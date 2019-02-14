import CustomBuiltinInputElement from '/src/js/elements/builtin/custom-builtin-input-element.js';

export default class IntegerInput extends CustomBuiltinInputElement {
  static get elementName() { return 'integer-input'; }
  static get mixin() { return IntegerInputMixin; }

  constructor() {
    super();
  }
}

export let IntegerInputMixin = {
  initializeMixin() {
    this.addEventListener('input', this.onInput);
  },

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
  },

  validate(errorMessages) {
    if (isNaN(this.valueAsInt)) {
      let prettyName = this.getAttribute('pretty-name');
      let fieldName = prettyName ? prettyName : this.name;
      errorMessages.add(this, `${fieldName} must be a valid number.`);
    }
  },
  
  get valueAsInt() {
    return parseInt(this.value, 10);
  },

  get minAsInt() {
    return parseInt(this.min, 10);
  },

  get maxAsInt() {
    return parseInt(this.max, 10);
  }
};
