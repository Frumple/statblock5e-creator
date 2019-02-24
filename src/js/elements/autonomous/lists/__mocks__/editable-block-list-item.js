import { TextInputMixin } from '/src/js/elements/builtin/text-input.js';
import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';

export default class EditableBlockListItem {
  constructor(parent) {
    this.parent = parent;
    this.nameElement = document.createElement('input');
    this.textElement = document.createElement('input');

    this.nameElement.setAttribute('required', '');
    this.textElement.setAttribute('required', '');

    copyObjectProperties(this.nameElement, TextInputMixin);
    copyObjectProperties(this.textElement, TextInputMixin);

    this.nameElement.initializeMixin();
    this.textElement.initializeMixin();
  }

  setItemType(itemType) {
    this.nameElement.setAttribute('pretty-name', `${itemType} Name`);
    this.textElement.setAttribute('pretty-name', `${itemType} Text`);
  }

  get name() {
    return this.nameElement.value;
  }

  set name(name) {
    this.nameElement.value = name;
  }

  get text() {
    return this.textElement.value;
  }

  set text(text) {
    this.textElement.value = text;
  }

  validate(errorMessages) {
    this.nameElement.validate(errorMessages);
    this.textElement.validate(errorMessages);
  }

  remove() {
    let index = this.parent._list.indexOf(this);
    if (index >= 0) {
      this.parent._list.splice(index, 1);
    }
  }
}