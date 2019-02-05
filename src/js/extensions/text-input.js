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
}
