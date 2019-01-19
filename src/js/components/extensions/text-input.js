import { defineCustomBuiltinElement } from '/src/js/helpers/define-custom-element.js';

export default class TextInput {
  static async defineCustomElement() {
    defineCustomBuiltinElement(
      'text-input',
      TextInputElement,
      'input');
  }
}

class TextInputElement extends HTMLInputElement {
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

  validateForEmpty(error_messages) {
    if(this.value === "") {
      let pretty_name = this.getAttribute('pretty-name');
      let field_name = pretty_name ? pretty_name : this.name;
      error_messages.add(this,
        `${field_name} cannot be empty.`);
    }
  }
}
