import * as sectionModule from '/src/js/base/section.js';

export default class AttributeListSection extends sectionModule.Section {
  static get templatePaths() {
    return super.templatePaths.set(
      'attribute-list-section',
      'src/html/sections/attribute-list-section.html');
  }

  constructor(templatePaths, headerText) {
    super(templatePaths,
          AttributeListShowElements,
          AttributeListEditElements);

    this.showElements.header.textContent = headerText;
    this.editElements.label.textContent = `${headerText}:`;    
  }

  connectedCallback() {
    this.editElements.input.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key === 'Enter') {
        keyEvent.preventDefault();

        this.addItemFromInput();
      }
    });

    this.editElements.addButton.addEventListener('click', () => {
      this.addItemFromInput();
    });

    this.addEventListener('attributeListItemRemoved', (event) => {
      let itemText = event.detail.itemText;
      this.editElements.datalist.setOptionEnabled(itemText, true);
    });
  }

  addItemFromInput() {
    let text = this.editElements.input.value.trim();
    this.editElements.input.value = text;

    this.errorMessages.clear();
    if (text === '') {
      this.errorMessages.add(this.editElements.input, 'Cannot add a blank item.');
    } else if(this.editElements.list.contains(text)) {
      this.errorMessages.add(this.editElements.input, 'Cannot add a duplicate item.');
    }
    if (this.errorMessages.any()) {
      return;
    }

    this.addItem(text);

    this.editElements.input.value = '';
    this.editElements.input.select();
  }

  addItem(text) {
    this.editElements.list.addItem(text);
    this.editElements.datalist.setOptionEnabled(text, false);
  }

  checkForErrors() {
    const input = this.editElements.input;
    if (input.value !== '') {
      const message = 'Cannot save while the item text field is not blank. Clear the field or add the item, then try again.';
      this.errorMessages.add(input, message);
    }
  }

  updateShowSection() {
    this.editElements.input.value = '';

    let text = '';
    for (const itemText of this.editElements.list.itemsAsText) {
      if (text === '') {
        text += itemText;
      } else {
        text += `, ${itemText}`;
      }
    }

    text = this.postProcessText(text);

    this.showElements.text.textContent = text;
  }

  postProcessText(text) {
    if (text === '') {
      this.empty = true;
    } else {
      this.empty = false;
    }
    return text;
  }
}

class AttributeListShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.header = shadowRoot.getElementById('attribute-list-header');
    this.text = shadowRoot.getElementById('attribute-list-text');
  }
}

class AttributeListEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.label = shadowRoot.getElementById('attribute-list-label');
    this.input = shadowRoot.getElementById('attribute-list-input');
    this.addButton = shadowRoot.getElementById('attribute-list-add-button');
    this.list = shadowRoot.getElementById('attribute-list');
    this.datalist = shadowRoot.getElementById('attribute-list-datalist');
  }
  
  get initiallySelectedElement() {
    return this.input;
  }
}
