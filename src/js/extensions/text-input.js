import CustomInputBuiltinElement from '/src/js/base/custom-input-builtin-element.js';

export default class TextInput extends CustomInputBuiltinElement {
  static async defineCustomElement() {
    super.defineCustomElement(
      'text-input',
      TextInput);
  }

  constructor() {
    super();

    this.addEventListener('keydown', (keyEvent) => {
     if (keyEvent.key === "Enter") {
       keyEvent.preventDefault();

       let saveEvent = new Event('fieldEnterKeyDown', { bubbles: true });
       this.dispatchEvent(saveEvent);
     }
    });
  }

  validate(error_messages) {
    if (this.required) {
      this.validateForEmpty(error_messages);
    }
  }

  validateForEmpty(error_messages) {
    if(this.value === "") {
      let pretty_name = this.getAttribute('pretty-name');
      let field_name = pretty_name ? pretty_name : this.name;
      error_messages.add(this,
        `${field_name} cannot be empty.`);
    }
  }
}
