import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class ErrorMessages extends CustomAutonomousElement {
  static get elementName() { return 'error-messages'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'error-messages',
      'src/html/elements/error-messages.html');
  }

  constructor() {
    super(ErrorMessages.templatePaths);

    this.containerElement = this.shadowRoot.getElementById('error-messages');
    this.listElement = this.shadowRoot.getElementById('error-messages-list');

    this.errors = [];
  }

  add(fieldElement, message) {
    let error = {
      fieldElement: fieldElement,
      message: message
    };

    this.errors.push(error);
    fieldElement.classList.add('section__error-highlight');

    let messageElement = ErrorMessages.createErrorMessageElement(message);
    this.containerElement.classList.remove('error-messages_hidden');
    this.listElement.appendChild(messageElement);
  }

  clear() {
    this.containerElement.classList.add('error-messages_hidden');

    while (this.errors.length > 0) {
      let error = this.errors.pop();
      error.fieldElement.classList.remove('section__error-highlight');
    }

    let messageList = this.listElement;

    while (messageList.hasChildNodes()) {
      messageList.removeChild(messageList.lastChild);
    }
  }

  any() {
    return this.errors.length > 0;
  }

  static createErrorMessageElement(message) {
    let listItemElement = document.createElement('li');
    let textNode = document.createTextNode(message);
    listItemElement.appendChild(textNode);
    return listItemElement;
  }
}
