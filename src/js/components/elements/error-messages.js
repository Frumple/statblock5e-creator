import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import Component from '/src/js/components/base/component.js';

export default class ErrorMessages extends Component {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'error-messages',
      'src/html/elements/error-messages.html');
  }

  constructor(element) {
    super(element);

    this.containerElement = element.shadowRoot.getElementById('error-messages');
    this.listElement = element.shadowRoot.getElementById('error-messages-list');

    this.errors = [];
  }

  add(fieldElement, message) {
    let error = {
      fieldElement: fieldElement,
      message: message
    };

    this.errors.push(error);
    fieldElement.classList.add('error-highlight');

    let messageElement = ErrorMessages.createErrorMessageElement(message);
    this.containerElement.classList.remove('error-messages_hidden');
    this.listElement.appendChild(messageElement);
  }

  clear() {
    this.containerElement.classList.add('error-messages_hidden');

    while (this.errors.length > 0) {
      let error = this.errors.pop();
      error.fieldElement.classList.remove('error-highlight');
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
