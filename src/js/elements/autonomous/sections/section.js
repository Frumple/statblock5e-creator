import CustomAutonomousElement from '../custom-autonomous-element.js';
import CurrentContext from '../../../models/current-context.js';
import { focusAndSelectElement } from '../../../helpers/element-helpers.js';

export class Section extends CustomAutonomousElement {
  static get templatePaths() {
    return super.templatePaths.set(
      'section',
      'src/html/elements/autonomous/sections/section.html');
  }

  constructor(templatePaths, modelPropertyName, showElementsClass, editElementsClass) {
    super(templatePaths);

    this.modelPropertyName = modelPropertyName;
    this.dataset.mode = 'show';

    this.showElements = new showElementsClass(this.shadowRoot);
    this.editElements = new editElementsClass(this.shadowRoot);
    this.errorMessages = this.shadowRoot.querySelector('error-messages');
  }

  connectedCallback() {
    this.updateView();

    this.showElements.section.addEventListener('click', () => {
      this.edit();
    });

    this.showElements.section.addEventListener('animationend', () => {
      if (this.mode === 'edit') {
        this.focusOnInitialEditSectionElement();
      }
    });

    this.editElements.section.addEventListener('submit', (event) => {
      event.preventDefault();
      this.save();
    });
  }

  get mode() {
    return this.dataset.mode;
  }

  set mode(mode) {
    const hiddenClass = 'section_hidden';

    switch (mode) {
    case 'hidden':
      this.dataset.mode = 'hidden';
      this.showElements.section.classList.add(hiddenClass);
      this.editElements.section.classList.add(hiddenClass);
      break;
    case 'show':
      this.dataset.mode = 'show';
      this.showElements.section.classList.remove(hiddenClass);
      this.editElements.section.classList.add(hiddenClass);
      break;
    case 'edit':
      this.dataset.mode = 'edit';
      this.showElements.section.classList.add(hiddenClass);
      this.editElements.section.classList.remove(hiddenClass);
      break;
    default:
      throw new Error(`'${mode}' is not a valid section mode.`);
    }
  }

  get empty() {
    return ('empty' in this.dataset);
  }

  set empty(isEmpty) {
    const emptyClass = 'section_empty';

    if (isEmpty) {
      this.dataset.empty = '';
      this.showElements.section.classList.add(emptyClass);
    } else {
      delete this.dataset.empty;
      this.showElements.section.classList.remove(emptyClass);
    }
  }

  setEmptyVisibility(visibility) {
    if (this.empty) {
      if (visibility) {
        if (this.mode === 'hidden') {
          this.mode = 'show';
          this.dispatchModeChangedEvent();
        }
      } else {
        if (this.mode === 'show') {
          this.mode = 'hidden';
          this.dispatchModeChangedEvent();
        }
      }
    } else {
      if (this.mode === 'hidden') {
        this.mode = 'show';
        this.dispatchModeChangedEvent();
      }
    }
  }

  focusOnInitialEditSectionElement() {
    focusAndSelectElement(this.editElements.initiallySelectedElement);
  }

  edit() {
    this.mode = 'edit';
    this.dispatchModeChangedEvent();
    this.focusOnInitialEditSectionElement();
  }

  save() {
    this.errorMessages.clear();
    this.checkForErrors();
    if (this.errorMessages.any) {
      this.errorMessages.focusOnFirstErrorField();
      return;
    }

    this.updateModel();
    this.updateShowModeView();

    if (this.empty && ! CurrentContext.layoutSettings.emptySectionsVisibility) {
      this.mode = 'hidden';
    } else {
      this.mode = 'show';
    }

    this.dispatchModeChangedEvent();
  }

  checkForErrors() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the checkForErrors() method.`);
  }

  updateModel() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the updateModel() method.`);
  }

  updateEditModeView() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the updateEditModeView() method.`);
  }

  updateShowModeView() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the updateShowModeView() method.`);
  }

  updateView() {
    this.updateEditModeView();
    this.updateShowModeView();
  }

  dispatchModeChangedEvent() {
    const changeEvent = new CustomEvent('sectionModeChanged', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  }

  importFromOpen5e(json) {
    CurrentContext.creature[this.modelPropertyName].fromOpen5e(json);
    this.updateView();
    this.setEmptyVisibility(CurrentContext.layoutSettings.emptySectionsVisibility);
  }

  importFromJson(json) {
    CurrentContext.creature[this.modelPropertyName].fromJson(json);
    this.updateView();
    this.setEmptyVisibility(CurrentContext.layoutSettings.emptySectionsVisibility);
  }

  exportToJson() {
    return CurrentContext.creature[this.modelPropertyName].toJson();
  }

  exportToHtml() {
    return CurrentContext.creature[this.modelPropertyName].toHtml();
  }

  exportToMarkdown() {
    return CurrentContext.creature[this.modelPropertyName].toMarkdown();
  }
}

export class ShowElements {
  constructor(shadowRoot) {
    this.section = shadowRoot.getElementById('show-section');
  }
}

export class EditElements {
  constructor(shadowRoot) {
    this.section = shadowRoot.getElementById('edit-section');
    this.saveButton = shadowRoot.getElementById('save-button');
  }

  get initiallySelectedElement() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the initiallySelectedElement() getter.`);
  }

  submitForm() {
    this.section.dispatchEvent(new Event('submit'));
  }
}
