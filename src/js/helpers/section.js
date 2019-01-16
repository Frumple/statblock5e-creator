import ErrorMessages from '/src/js/templates/elements/error-messages.js';

export class Section {
  static async defineCustomElement() {
    throw new Error(
      'The class "' + this.name + '" must implement the defineCustomElement() static method.');
  }

  constructor(element, showElements, editElements) {
    this.element = element;
    this.shadowRoot = element.shadowRoot;

    this.error_messages = new ErrorMessages( this.shadowRoot.querySelector('error-messages') );
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

    this.toggleAdjacentSectionDividers(false);
  }

  switchToEditMode() {
    const hiddenClass = 'section_hidden';
    this.showElements.section.classList.add(hiddenClass);
    this.editElements.section.classList.remove(hiddenClass);

    this.toggleAdjacentSectionDividers(true);
  }

  toggleAdjacentSectionDividers(isVisible) {
    Section.toggleSectionDivider(this.element.previousElementSibling, true, isVisible);
    Section.toggleSectionDivider(this.element.nextElementSibling, false, isVisible);
  }

  static toggleSectionDivider(sibling, isNext, isVisible) {
    if (sibling) {
      if (sibling.tagName === 'SECTION-DIVIDER') {
        let className = isNext ?
          'section-divider_visible-for-next' :
          'section-divider_visible-for-previous';

        if (isVisible) {
          sibling.classList.add(className);
        } else {
          sibling.classList.remove(className);
        }
      }
    }
  }

  save() {
    throw new Error(
      'The class "' + this.name + '" must implement the save() method.');
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
