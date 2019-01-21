import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';
import ErrorMessages from '/src/js/elements/error-messages.js';

export class Section extends CustomAutonomousElement {
  constructor(elementName, showElementsClass, editElementsClass) {
    super(elementName);

    this.showElements = new showElementsClass(this.shadowRoot);
    this.editElements = new editElementsClass(this.shadowRoot);
    this.error_messages = this.shadowRoot.querySelector('error-messages');

    this.showElements.section.addEventListener('mouseenter', () => {
      this.showElements.edit_action.classList.remove('section__action_hidden');
    });

    this.showElements.section.addEventListener('mouseleave', () => {
      this.showElements.edit_action.classList.add('section__action_hidden');
    });

    this.showElements.section.addEventListener('click', () => {
      this.switchToEditMode();
    });

    this.showElements.edit_action.addEventListener('click', () => {
      this.switchToEditMode();
    });

    this.editElements.save_action.addEventListener('click', () => {
      this.save();
    });

    this.editElements.section.addEventListener('fieldEnterKeyDown', () => {
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
    Section.toggleSectionDivider(this.previousElementSibling, true, isVisible);
    Section.toggleSectionDivider(this.nextElementSibling, false, isVisible);
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

  checkForErrors() {
    throw new Error(
      `The class '${this.name}' must implement the checkForErrors() method.`);
  }

  update() {
    throw new Error(
      `The class '${this.name}' must implement the update() method.`);
  }

  save() {
    this.error_messages.clear();
    this.checkForErrors();
    if (this.error_messages.any()) {
      return;
    }
    this.update();
    this.switchToShowMode();
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
