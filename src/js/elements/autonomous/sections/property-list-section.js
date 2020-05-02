import { PropertyLineSection, PropertyLineShowElements, PropertyLineEditElements } from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';

export class PropertyListSection extends PropertyLineSection {
  static get templatePaths() {
    return super.templatePaths.set(
      'property-list-section',
      'src/html/elements/autonomous/sections/property-list-section.html');
  }

  constructor(templatePaths,
    modelPropertyName,
    showElements = PropertyListShowElements,
    editElements = PropertyListEditElements) {
    super(templatePaths,
          modelPropertyName,
          showElements,
          editElements);

    const model = CurrentContext.creature[this.modelPropertyName];

    this.showElements.heading.textContent = model.headingName;
    this.editElements.label.textContent = `${model.headingName}:`;
  }

  connectedCallback() {
    super.connectedCallback();

    const model = CurrentContext.creature[this.modelPropertyName];

    this.editElements.propertyList.errorMessages = this.errorMessages;
    this.editElements.propertyList.singleItemName = model.singleName;
  }

  checkForErrors() {
    const input = this.editElements.propertyList.input;
    if (input.value !== '') {
      const message = `Cannot save while the ${CurrentContext.creature[this.modelPropertyName].singleName} field contains text.\nClear or add the field, then try again.`;
      this.errorMessages.add(input, message);
    }
  }

  updateModel() {
    CurrentContext.creature[this.modelPropertyName].items = this.editElements.propertyList.itemsAsText;
  }

  updateEditModeView() {
    const items = CurrentContext.creature[this.modelPropertyName].items;
    this.editElements.propertyList.setItems(items);
  }

  updateShowModeView() {
    const text = CurrentContext.creature[this.modelPropertyName].text;
    this.empty = (text === '');
    this.showElements.text.textContent = text;
  }
}

export class PropertyListShowElements extends PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

export class PropertyListEditElements extends PropertyLineEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.label = shadowRoot.getElementById('property-list-label');
    this.propertyList = shadowRoot.getElementById('property-list');
  }

  get initiallySelectedElement() {
    return this.propertyList.input;
  }
}
