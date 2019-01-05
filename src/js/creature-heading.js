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

class SubtitleElements {
  constructor(shadowRoot) {
    this.show = shadowRoot.getElementById('subtitle-show');
    this.text = shadowRoot.getElementById('subtitle-text');
    this.hover = shadowRoot.getElementById('subtitle-hover');
    this.edit = shadowRoot.getElementById('subtitle-edit');
    this.sizeInput = shadowRoot.getElementById('size-input');
    this.typeInput = shadowRoot.getElementById('type-input');
    this.alignmentInput = shadowRoot.getElementById('alignment-input');
    this.save = shadowRoot.getElementById('subtitle-save');
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function saveTitle(titleElements) {
  let title = titleElements.input.value;
  if (title === "") {
    titleElements.text.textContent = "[Creature Name]";
  } else {
    title = capitalizeFirstLetter(title);
    titleElements.input.value = title;
    titleElements.text.textContent = title;
  }

  titleElements.show.classList.remove('container_hidden');
  titleElements.edit.classList.add('container_hidden');
}

function saveSubtitle(subtitleElements) {
  let size = subtitleElements.sizeInput.value;
  let type = subtitleElements.typeInput.value;
  let alignment = subtitleElements.alignmentInput.value;

  if (type === "") {
    type = "[creature type]";
  }

  let subtitle = size + " " + type + ", " + alignment;

  subtitleElements.text.textContent = subtitle;

  subtitleElements.show.classList.remove('container_hidden');
  subtitleElements.edit.classList.add('container_hidden');
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
  const subtitleElements = new SubtitleElements(shadowRoot);

  // TODO: Refactor and combine event methods

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

  subtitleElements.show.addEventListener('mouseenter', () => {
    subtitleElements.hover.classList.remove('container__action_hidden');
  });

  subtitleElements.show.addEventListener('mouseleave', () => {
    subtitleElements.hover.classList.add('container__action_hidden');
  });

  subtitleElements.show.addEventListener('click', () => {
    subtitleElements.show.classList.add('container_hidden');
    subtitleElements.edit.classList.remove('container_hidden');
  })

  subtitleElements.save.addEventListener('click', () => {
    saveSubtitle(subtitleElements);
  })
}

init();
