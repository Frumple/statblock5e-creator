import CustomBuiltinInputElement from '/src/js/elements/builtin/custom-builtin-input-element.js';

export default class TextInput extends CustomBuiltinInputElement {
  static get elementName() { return 'text-input'; }
  static get mixin() { return TextInputMixin; }

  constructor() {
    super();
  }
}

export let TextInputMixin = {
  initializeMixin() {

  },

  validate(errorMessages) {
    if (this.required && this.value === '') {
      let prettyName = this.getAttribute('pretty-name');
      let fieldName = prettyName ? prettyName : this.name;
      errorMessages.add(this, `${fieldName} cannot be blank.`);
    }
  }
};
