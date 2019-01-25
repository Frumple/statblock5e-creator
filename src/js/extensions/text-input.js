import CustomBuiltinInputElement from '/src/js/base/custom-builtin-input-element.js';

export default class TextInput extends CustomBuiltinInputElement {
  static get elementName() { return 'text-input'; }

  constructor() {
    super();

    this.addEventListener('keydown', (keyEvent) => {
     if (keyEvent.key === "Enter") {
       keyEvent.preventDefault();

       let fieldEnterKeyDownEvent = new Event('fieldEnterKeyDown', { bubbles: true });
       this.dispatchEvent(fieldEnterKeyDownEvent);
     }
    });
  }

  validate(errorMessages) {
    if (this.required) {
      this.validateForEmpty(errorMessages);
    }
  }

  validateForEmpty(errorMessages) {
    if(this.value === "") {
      let pretty_name = this.getAttribute('pretty-name');
      let field_name = pretty_name ? pretty_name : this.name;
      errorMessages.add(this,
        `${field_name} cannot be empty.`);
    }
  }
}
