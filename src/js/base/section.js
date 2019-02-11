import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';
import GlobalOptions from '/src/js/helpers/global-options.js';
import isRunningInNode from '/src/js/helpers/is-running-in-node.js';
import { focusAndSelectElement, traverseElements } from '/src/js/helpers/element-helpers.js';
import CustomElementMixins from '/src/js/helpers/test/custom-element-mixins.js';

export class Section extends CustomAutonomousElement {
  static get templatePaths() {
    return super.templatePaths.set(
      'section',
      'src/html/base/section.html');
  }

  constructor(templatePaths, showElementsClass, editElementsClass) {
    super(templatePaths);

    this.isInitialized = false;
    this.dataset.mode = 'show';

    this.showElements = new showElementsClass(this.shadowRoot);
    this.editElements = new editElementsClass(this.shadowRoot);
    this.errorMessages = this.shadowRoot.querySelector('error-messages');

    this.showElements.section.addEventListener('mouseenter', () => {
      this.showElements.editAction.classList.remove('section__action_hidden');
    });

    this.showElements.section.addEventListener('mouseleave', () => {
      this.showElements.editAction.classList.add('section__action_hidden');
    });

    this.showElements.section.addEventListener('click', () => {
      this.mode = 'edit';
      this.dispatchModeChangedEvent();
      this.focusOnInitialEditSectionElement();
    });

    this.showElements.section.addEventListener('transitionend', () => {
      if (this.mode === 'edit') {
        this.focusOnInitialEditSectionElement();
      }
    });

    this.editElements.saveAction.addEventListener('click', () => {
      this.save();
    });

    this.editElements.section.addEventListener('submit', (event) => {
      event.preventDefault();
      this.save();
    });

    if (isRunningInNode) {
      Object.assign(this, InitializeCustomEditElementsMixin);
    }
  }

  connectedCallback() {
    return;
  }

  forceConnect() {
    this.isConnected = true;
    this.connectedCallback();
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

  focusOnInitialEditSectionElement() {
    focusAndSelectElement(this.editElements.initiallySelectedElement);    
  }

  checkForErrors() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the checkForErrors() method.`);
  }

  updateShowSection() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the updateShowSection() method.`);
  }

  save() {
    this.errorMessages.clear();
    this.checkForErrors();
    if (this.errorMessages.any()) {
      return;
    }
    this.updateShowSection();

    if (this.empty && ! GlobalOptions.showEmptyAttributes) {
      this.mode = 'hidden';
    } else {
      this.mode = 'show';
    }

    this.dispatchModeChangedEvent();
  }

  dispatchModeChangedEvent() {
    let changeEvent = new CustomEvent('sectionModeChanged', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(changeEvent);
  }
}

export class ShowElements {
  constructor(shadowRoot) {
    this.section = shadowRoot.getElementById('show-section');
    this.editAction = shadowRoot.getElementById('edit-action');
  }
}

export class EditElements {
  constructor(shadowRoot) {
    this.section = shadowRoot.getElementById('edit-section');
    this.saveAction = shadowRoot.getElementById('save-action');
  }

  get initiallySelectedElement() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the initiallySelectedElement() getter.`);
  }
}

// For tests, JSDOM does not currently support builtin custom elements.
// These will appear as normal elements in JSDOM, but we can add the
// custom element behaviour by assigning mixins.

// initializeCustomEditElements() is only enabled in test environments.
// It finds all custom elements in the edit section that have an
// appropriate mixin and assigns the mixin to the element.
let InitializeCustomEditElementsMixin = {
  initializeCustomEditElements() {
    traverseElements(this.editElements, 3, (element) => {
      CustomElementMixins.applyToElement(element);
    });
  }
};
