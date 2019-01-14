import { Errors } from '/src/js/templates/error-messages.js';

export class Section {
  constructor(shadowRoot, showElements, editElements) {
    this.errors = new Errors( shadowRoot.querySelector('error-messages') );
    this.showElements = showElements;
    this.editElements = editElements;

    this.showElements.section.addEventListener('mouseenter', () => {
      this.showElements.edit_action.classList.remove('section__action_hidden');
    });

    this.showElements.section.addEventListener('mouseleave', () => {
      this.showElements.edit_action.classList.add('section__action_hidden');
    });

    this.showElements.section.addEventListener('click', () => {
      this.switchToEditMode();
    });

    this.editElements.save_action.addEventListener('click', () => {
      this.save();
    });
  }

  switchToShowMode() {
    const hiddenClass = 'section_hidden';
    this.editElements.section.classList.add(hiddenClass);
    this.showElements.section.classList.remove(hiddenClass);
  }

  switchToEditMode() {
    const hiddenClass = 'section_hidden';
    this.showElements.section.classList.add(hiddenClass);
    this.editElements.section.classList.remove(hiddenClass);
  }

  save() {
    const className = this.constructor.name;
    throw new Error(
      'The class "' + className + '" does not implement the save() method.');
  }
}

export class ShowElements {
  constructor(shadowRoot) {
    this.section = shadowRoot.getElementById('show-section');
    this.edit_action = shadowRoot.getElementById('edit-action');
  }
}

export class EditElements {
  constructor(shadowRoot) {
    this.section = shadowRoot.getElementById('edit-section');
    this.save_action = shadowRoot.getElementById('save-action');
  }
}
