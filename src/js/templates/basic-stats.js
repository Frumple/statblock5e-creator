import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import { Errors } from '/src/js/templates/error-messages.js';

class ShowElements {
  constructor(shadowRoot) {
    this.section = shadowRoot.getElementById('show-section');
    this.armor_class = shadowRoot.getElementById('armor-class-text');
    this.hit_points = shadowRoot.getElementById('hit-points-text');
    this.speed = shadowRoot.getElementById('speed-text');
    this.edit = shadowRoot.getElementById('edit-action');
  }
}

class EditElements {
  constructor(shadowRoot) {
    this.section = shadowRoot.getElementById('edit-section');
  }
}

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'basic-stats',
    'src/templates/basic-stats.html');
}

export function init(element) {
  const shadowRoot = element.shadowRoot;
  const errors = new Errors(shadowRoot.querySelector('error-messages'));
  const showElements = new ShowElements(shadowRoot);
  const editElements = new EditElements(shadowRoot);

  showElements.section.addEventListener('mouseenter', () => {
    showElements.edit.classList.remove('section__action_hidden');
  });

  showElements.section.addEventListener('mouseleave', () => {
    showElements.edit.classList.add('section__action_hidden');
  });

  showElements.section.addEventListener('click', () => {
    switchMode(showElements, editElements, true);
  });
}

function switchMode(showElements, editElements, editMode) {
  const hiddenClass = 'section_hidden';

  if (editMode) {
    showElements.section.classList.add(hiddenClass);
    editElements.section.classList.remove(hiddenClass);
  } else {
    editElements.section.classList.add(hiddenClass);
    showElements.section.classList.remove(hiddenClass);
  }
}
