import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class TextInput {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'text-input',
      'src/html/elements/text-input.html',
      TextInput.elementClass,
      { extends: 'input' });
  }

  static elementClass(contentNode) {
    return TextInputElement;
  }
}

class TextInputElement extends HTMLInputElement {
  constructor() {
    super();

    this.addEventListener('keydown', (keyEvent) => {
     if (keyEvent.key === "Enter") {
       keyEvent.preventDefault();

       let saveEvent = new Event('saveSection', { bubbles: true });
       this.dispatchEvent(saveEvent);
     }
    });
  }
}
