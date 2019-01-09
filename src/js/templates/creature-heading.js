import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import { Errors } from '/src/js/templates/error-messages.js';

class ShowElements {
  constructor(shadowRoot) {
    this.container = shadowRoot.getElementById('show-container');
    this.title = shadowRoot.getElementById('title-text');
    this.subtitle = shadowRoot.getElementById('subtitle-text');
    this.edit = shadowRoot.getElementById('edit-action');
  }
}

class EditElements {
  constructor(shadowRoot) {
    this.container = shadowRoot.getElementById('edit-container');
    this.title = shadowRoot.getElementById('title-input');
    this.size = shadowRoot.getElementById('size-input');
    this.type = shadowRoot.getElementById('type-input');
    this.alignment = shadowRoot.getElementById('alignment-input');
    this.save = shadowRoot.getElementById('save-action');
  }
}

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'creature-heading',
    'src/templates/creature-heading.html');
}

export function init(element) {
  const shadowRoot = element.shadowRoot;
  const errors = new Errors(shadowRoot.querySelector('error-messages'));
  const showElements = new ShowElements(shadowRoot);
  const editElements = new EditElements(shadowRoot);

  showElements.container.addEventListener('mouseenter', () => {
    showElements.edit.classList.remove('container__action_hidden');
  });

  showElements.container.addEventListener('mouseleave', () => {
    showElements.edit.classList.add('container__action_hidden');
  });

  showElements.container.addEventListener('click', () => {
    switchMode(showElements, editElements, true);
  });

  editElements.title.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      save(errors, showElements, editElements);
    }
  });

  editElements.save.addEventListener('click', () => {
    save(errors, showElements, editElements);
  });
}

function switchMode(showElements, editElements, editMode) {
  const hiddenClass = 'container_hidden';

  if (editMode) {
    showElements.container.classList.add(hiddenClass);
    editElements.container.classList.remove(hiddenClass);
    editElements.title.select();
  } else {
    editElements.container.classList.add(hiddenClass);
    showElements.container.classList.remove(hiddenClass);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function save(errors, showElements, editElements) {
  let title = editElements.title.value;
  let size = editElements.size.value;
  let type = editElements.type.value;
  let alignment = editElements.alignment.value;

  errors.clear();

  if (title === "") {
    errors.add(editElements.title, 'Creature name cannot be blank.');
  }

  if (type === "") {
    errors.add(editElements.type, 'Creature type cannot be blank.');
  }

  if (errors.any()) {
    return;
  }

  title = capitalizeFirstLetter(title);
  editElements.title.value = title;
  showElements.title.textContent = title;

  let subtitle = size + " " + type + ", " + alignment;
  showElements.subtitle.textContent = subtitle;

  switchMode(showElements, editElements, false);
}
