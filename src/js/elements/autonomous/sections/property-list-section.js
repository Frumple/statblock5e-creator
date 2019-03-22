import * as propertyLineSectionModule from './property-line-section.js';

export default class PropertyListSection extends propertyLineSectionModule.PropertyLineSection {
  static get templatePaths() {
    return super.templatePaths.set(
      'property-list-section',
      'src/html/elements/autonomous/sections/property-list-section.html');
  }

  constructor(templatePaths, headingName, itemType) {
    super(templatePaths,
          PropertyListShowElements,
          PropertyListEditElements,
          headingName);

    this.showElements.heading.textContent = headingName;
    this.editElements.label.textContent = `${headingName}:`;

    this.itemType = itemType;
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
    this.editElements.dataList.setOptionEnabled(itemText, true);
  }

  addItemFromInput() {
    let text = this.editElements.input.value.trim();
    this.editElements.input.value = text;

    this.errorMessages.clear();
    if (text === '') {
      this.errorMessages.add(this.editElements.input, `Cannot add a blank ${this.itemType}.`);
    } else if(this.editElements.propertyList.contains(text)) {
      this.errorMessages.add(this.editElements.input, `Cannot add a duplicate ${this.itemType}.`);
    }
    if (this.errorMessages.any) {
      this.errorMessages.focusOnFirstErrorField();
      return;
    }

    this.addItem(text);

    this.editElements.input.value = '';
    this.editElements.input.select();
  }

  addItem(text) {
    this.editElements.propertyList.addItem(text);
    this.editElements.dataList.setOptionEnabled(text, false);
  }

  checkForErrors() {
    const input = this.editElements.input;
    if (input.value !== '') {
      const message = `Cannot save while the ${this.itemType} field contains text.\nClear or add the field, then try again.`;
      this.errorMessages.add(input, message);
    }
  }

  updateShowSection() {
    this.editElements.input.value = '';

    const text = this.showSectionText;

    if (text === '') {
      this.empty = true;
    } else {
      this.empty = false;
    }

    this.showElements.text.textContent = text;
  }

  get showSectionText() {
    let text = '';
    for (const itemText of this.editElements.propertyList.itemsAsText) {
      if (text === '') {
        text += itemText;
      } else {
        text += `, ${itemText}`;
      }
    }

    return text;
  }
}

class PropertyListShowElements extends propertyLineSectionModule.PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class PropertyListEditElements extends propertyLineSectionModule.PropertyLineEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.label = shadowRoot.getElementById('property-list-label');
    this.input = shadowRoot.getElementById('property-list-input');
    this.addButton = shadowRoot.getElementById('property-list-add-button');
    this.propertyList = shadowRoot.getElementById('property-list');
    this.dataList = shadowRoot.getElementById('property-list-datalist');
  }
  
  get initiallySelectedElement() {
    return this.input;
  }
}
