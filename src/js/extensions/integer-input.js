import CustomBuiltinInputElement from '/src/js/base/custom-builtin-input-element.js';

export default class IntegerInput extends CustomBuiltinInputElement {
  static get elementName() { return 'integer-input'; }
  static get mixin() { return IntegerInputMixin; }

  constructor() {
    super();
  }
}

export let IntegerInputMixin = {
  initializeMixin() {
    this.addEventListener('input', () => {
      if (this.value) {
        let value = this.valueAsInt;

        if (this.min && value < this.valueAsMin) {
          this.value = this.min;
        } else if(this.max && value > this.valueAsMax) {
          this.value = this.max;
        } else {
          // Used to eliminate leading zeroes from the inputted value
          this.value = value;
        }
      }
    });
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
