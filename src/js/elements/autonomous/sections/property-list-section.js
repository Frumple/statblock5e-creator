import * as sectionModule from '/src/js/elements/autonomous/sections/section.js';

export default class PropertyListSection extends sectionModule.Section {
  static get templatePaths() {
    return super.templatePaths.set(
      'property-list-section',
      'src/html/elements/autonomous/sections/property-list-section.html');
  }

  constructor(templatePaths, headerText) {
    super(templatePaths,
          PropertyListShowElements,
          PropertyListEditElements);

    this.showElements.header.textContent = headerText;
    this.editElements.label.textContent = `${headerText}:`;    
  }

  connectedCallback() {
    this.editElements.input.addEventListener('keydown', this.onEnterKeyDownOnInputField.bind(this));
    this.editElements.addButton.addEventListener('click', this.onClickAddButton.bind(this));
    this.addEventListener('propertyListItemRemoved', this.onPropertyListItemRemoved.bind(this));
  }

  onEnterKeyDownOnInputField(keyEvent) {
    if (keyEvent.key === 'Enter') {
      keyEvent.preventDefault();

      this.addItemFromInput();
    }
  }

  onClickAddButton() {
    this.addItemFromInput();
  }

  onPropertyListItemRemoved(event) {
    let itemText = event.detail.itemText;
    this.editElements.datalist.setOptionEnabled(itemText, true);
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
    if (this.errorMessages.any) {
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

class PropertyListShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.header = shadowRoot.getElementById('property-list-header');
    this.text = shadowRoot.getElementById('property-list-text');
  }
}

class PropertyListEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.label = shadowRoot.getElementById('property-list-label');
    this.input = shadowRoot.getElementById('property-list-input');
    this.addButton = shadowRoot.getElementById('property-list-add-button');
    this.list = shadowRoot.getElementById('property-list');
    this.datalist = shadowRoot.getElementById('property-list-datalist');
  }
  
  get initiallySelectedElement() {
    return this.input;
  }
}
