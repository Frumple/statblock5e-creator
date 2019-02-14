import * as sectionModule from '/src/js/elements/autonomous/sections/section.js';
import { capitalizeFirstLetter } from '/src/js/helpers/string-formatter.js';

export default class HeadingSection extends sectionModule.Section {
  static get elementName() { return 'heading-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'heading-section',
      'src/html/elements/autonomous/sections/heading-section.html');
  }

  constructor() {
    super(HeadingSection.templatePaths,
          HeadingShowElements,
          HeadingEditElements);
  }

  checkForErrors() {
    this.editElements.title.value = this.editElements.title.value.trim();
    this.editElements.type.value = this.editElements.type.value.trim();

    this.editElements.title.validate(this.errorMessages);
    this.editElements.type.validate(this.errorMessages);
  }

  updateShowSection() {
    let title = this.editElements.title.value;
    let size = this.editElements.size.value;
    let type = this.editElements.type.value;
    let alignment = this.editElements.alignment.value;

    title = capitalizeFirstLetter(title);
    let subtitle = `${size} ${type}, ${alignment}`;

    this.editElements.title.value = title;
    this.showElements.title.textContent = title;
    this.showElements.subtitle.textContent = subtitle;
  }
}

class HeadingShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.title = shadowRoot.getElementById('title-text');
    this.subtitle = shadowRoot.getElementById('subtitle-text');
  }
}

class HeadingEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.title = shadowRoot.getElementById('title-input');
    this.size = shadowRoot.getElementById('size-input');
    this.type = shadowRoot.getElementById('type-input');
    this.alignment = shadowRoot.getElementById('alignment-input');
  }

  get initiallySelectedElement() {
    return this.title;
  }
}
