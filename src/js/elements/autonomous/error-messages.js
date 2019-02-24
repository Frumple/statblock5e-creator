import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';
import { focusAndSelectElement } from '/src/js/helpers/element-helpers.js';

export default class ErrorMessages extends CustomAutonomousElement {
  static get elementName() { return 'error-messages'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'error-messages',
      'src/html/elements/autonomous/error-messages.html');
  }

  constructor() {
    super(ErrorMessages.templatePaths);

    this.container = this.shadowRoot.getElementById('error-messages');
    this.list = this.shadowRoot.getElementById('error-messages-list');

    this.errors = [];
  }

  add(fieldElement, message) {
    let error = {
      fieldElement: fieldElement,
      message: message
    };

    this.errors.push(error);
    fieldElement.classList.add('section__error-highlight');
    this.container.classList.remove('error-messages_hidden');

    let messageElement = ErrorMessages.createErrorMessageElement(message);
    this.list.appendChild(messageElement);
  }

  clear() {
    this.container.classList.add('error-messages_hidden');

    while (this.errors.length > 0) {
      let error = this.errors.pop();
      error.fieldElement.classList.remove('section__error-highlight');
    }

    let list = this.list;

    while (list.hasChildNodes()) {
      list.removeChild(list.lastChild);
    }
  }

  focusOnFirstErrorField() {
    focusAndSelectElement(this.errors[0].fieldElement);
  }

  get any() {
    return this.errors.length > 0;
  }

  static createErrorMessageElement(message) {
    let listItemElement = document.createElement('li');

    let textNode = document.createTextNode(message);
    listItemElement.appendChild(textNode);
    
    return listItemElement;
  }
}
