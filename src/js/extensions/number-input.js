import CustomBuiltinInputElement from '/src/js/base/custom-builtin-input-element.js';

export default class NumberInput extends CustomBuiltinInputElement {
  static get elementName() { return 'number-input'; }

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

        let saveEvent = new Event('fieldEnterKeyDown', { bubbles: true });
        this.dispatchEvent(saveEvent);
      }
    });
  }

  validate(error_messages) {
    if (this.value === "") {
      let pretty_name = this.getAttribute('pretty-name');
      let field_name = pretty_name ? pretty_name : this.name;
      error_messages.add(this,
        `${field_name} must be a valid integer.`);
    }
  }
}
