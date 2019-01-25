import CustomBuiltinInputElement from '/src/js/base/custom-builtin-input-element.js';

export default class IntegerInput extends CustomBuiltinInputElement {
  static get elementName() { return 'integer-input'; }

  constructor() {
    super();

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

    this.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key === "Enter") {
        keyEvent.preventDefault();

        let fieldEnterKeyDownEvent = new Event('fieldEnterKeyDown', { bubbles: true });
        this.dispatchEvent(fieldEnterKeyDownEvent);
      }
    });
  }

  validate(errorMessages) {
    if (this.value === "") {
      let pretty_name = this.getAttribute('pretty-name');
      let field_name = pretty_name ? pretty_name : this.name;
      errorMessages.add(this,
        `${field_name} must be a valid integer.`);
    }
  }
}
