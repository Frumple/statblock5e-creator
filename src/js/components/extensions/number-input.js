import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class NumericInput {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'number-input',
      'src/html/extensions/number-input.html',
      NumericInput.elementClass,
      { extends: 'input' });
  }

  static elementClass(contentNode) {
    return NumericInputElement;
  }
}

class NumericInputElement extends HTMLInputElement {
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

        let saveEvent = new Event('saveSection', { bubbles: true });
        this.dispatchEvent(saveEvent);
      }
    });
  }

  validate(error_messages) {
    if (!this.value) {
      let pretty_name = this.getAttribute('pretty-name');
      let field_name = pretty_name ? pretty_name : this.name;
      error_messages.add(this,
        `${field_name} must be a valid integer.`);
    }
  }
}
