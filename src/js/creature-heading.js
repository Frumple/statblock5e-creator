import {createCustomElement} from '/src/js/helpers/create-custom-element.js';

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

function switchMode(showElements, editElements, editMode) {
  if (editMode) {
    showElements.container.classList.add('container_hidden');
    editElements.container.classList.remove('container_hidden');
    editElements.title.select();
  } else {
    editElements.container.classList.add('container_hidden');
    showElements.container.classList.remove('container_hidden');
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function save(showElements, editElements) {
  let title = editElements.title.value;
  if(title === "") {
    showElements.title.textContent = "[Creature Name]";
  } else {
    title = capitalizeFirstLetter(title);
    editElements.title.value = title;
    showElements.title.textContent = title;
  }

  let size = editElements.size.value;
  let type = editElements.type.value;
  let alignment = editElements.alignment.value;

  if (type === "") {
    type = "[creature type]";
  }

  let subtitle = size + " " + type + ", " + alignment;
  showElements.subtitle.textContent = subtitle;

  switchMode(showElements, editElements, false);
}

async function fetchTemplate() {
  await fetch('src/templates/creature-heading.html')
    .then(stream => stream.text())
    .then(htmlContent => {
      let contentNode =
        document.createRange().createContextualFragment(htmlContent);
      createCustomElement('creature-heading', contentNode);
    });
}

async function init() {
  await fetchTemplate();

  const shadowRoot = document.getElementById('creature-heading').shadowRoot;
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
      save(showElements, editElements);
    }
  });

  editElements.save.addEventListener('click', () => {
    save(showElements, editElements);
  });
}

init();
