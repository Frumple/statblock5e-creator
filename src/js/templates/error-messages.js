import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

class Elements {
  constructor(shadowRoot) {
    this.container = shadowRoot.getElementById('error-messages');
    this.list = shadowRoot.getElementById('error-messages-list');
  }
}

export class Errors {
  constructor(errorMessagesElement) {
    this.errors = [];
    this.elements = new Elements(errorMessagesElement.shadowRoot);
  }

  add(fieldElement, message) {
    let error = {
      fieldElement: fieldElement,
      message: message
    };

    this.errors.push(error);
    fieldElement.classList.add('error-highlight');

    let messageElement = createErrorMessageElement(message);
    this.elements.container.classList.remove('error-messages_hidden');
    this.elements.list.appendChild(messageElement);
  }

  clear() {
    this.elements.container.classList.add('error-messages_hidden');

    while (this.errors.length > 0) {
      let error = this.errors.pop();
      error.fieldElement.classList.remove('error-highlight');
    }

    let messageList = this.elements.list;

    while (messageList.hasChildNodes()) {
      messageList.removeChild(messageList.lastChild);
    }
  }

  any() {
    return this.errors.length > 0;
  }
}

function createErrorMessageElement(message) {
  let listItemElement = document.createElement('li');
  let textNode = document.createTextNode(message);
  listItemElement.appendChild(textNode);
  return listItemElement;
}

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'error-messages',
    'src/templates/error-messages.html');
}
