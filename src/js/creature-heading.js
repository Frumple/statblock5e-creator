import {createCustomElement} from '/src/js/helpers/create-custom-element.js';

class TitleElements {
  constructor(shadowRoot) {
    this.show = shadowRoot.getElementById('title-show');
    this.text = shadowRoot.getElementById('title-text');
    this.hover = shadowRoot.getElementById('title-hover');
    this.edit = shadowRoot.getElementById('title-edit');
    this.input = shadowRoot.getElementById('title-input');
    this.save = shadowRoot.getElementById('title-save');
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function saveTitle(titleElements) {
  let newTitle = titleElements.input.value;
  if (newTitle === "") {
    newTitle = "Creature Name";
    titleElements.input.value = newTitle;
  }

  titleElements.text.textContent = capitalizeFirstLetter(newTitle)
  titleElements.show.classList.remove('container_hidden');
  titleElements.edit.classList.add('container_hidden');
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
  const titleElements = new TitleElements(shadowRoot);

  titleElements.show.addEventListener('mouseenter', () => {
    titleElements.hover.classList.remove('container__action_hidden');
  });

  titleElements.show.addEventListener('mouseleave', () => {
    titleElements.hover.classList.add('container__action_hidden');
  });

  titleElements.show.addEventListener('click', () => {
    titleElements.show.classList.add('container_hidden');
    titleElements.edit.classList.remove('container_hidden');
    titleElements.input.select();
  });

  titleElements.input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveTitle(titleElements);
    }
  });

  titleElements.save.addEventListener('click', () => {
    saveTitle(titleElements);
  });
}

init();
