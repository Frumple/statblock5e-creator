import CustomBuiltinInputElement from '/src/js/base/custom-builtin-input-element.js';

export default class TextInput extends CustomBuiltinInputElement {
  static get elementName() { return 'text-input'; }

  constructor() {
    super();

    this.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key === 'Enter') {
        keyEvent.preventDefault();

        let fieldEnterKeyDownEvent = new Event('fieldEnterKeyDown', { bubbles: true });
        this.dispatchEvent(fieldEnterKeyDownEvent);
      }
    });
  }

  trimWhitespace() {
    this.value = this.value.trim();
  }

  validate(errorMessages) {
    if (this.required) {
      this.validateForBlank(errorMessages);
    }
  }

  validateForBlank(errorMessages) {
    if(this.value === '') {
      let prettyName = this.getAttribute('pretty-name');
      let field_name = prettyName ? prettyName : this.name;
      errorMessages.add(this,
        `${field_name} cannot be blank.`);
    }
  }
}
