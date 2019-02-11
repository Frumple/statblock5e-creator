import CustomBuiltinInputElement from '/src/js/base/custom-builtin-input-element.js';

export default class IntegerInput extends CustomBuiltinInputElement {
  static get elementName() { return 'integer-input'; }
  static get mixin() { return IntegerInputMixin; }

  constructor() {
    super();
  }
}

export let IntegerInputMixin = {
  iniitalizeMixin() {
    this.addEventListener('input', () => {
      if (this.value) {
        let value = parseInt(this.value, 10);

        if (this.min && value < parseInt(this.min, 10)) {
          this.value = this.min;
        } else if(this.max && value > parseInt(this.max, 10)) {
          this.value = this.max;
        } else {
          // Used to eliminate leading zeroes from the inputted value
          this.value = value;
        }
      }
    });
  }
};
