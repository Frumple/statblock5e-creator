import * as sectionModule from '/src/js/base/section.js';
import { capitalizeFirstLetter } from '/src/js/helpers/string-format.js';

export default class HeadingSection extends sectionModule.Section {
  static get elementName() { return 'heading-section'; }
  static get templatePath() { return 'src/html/sections/heading-section.html'; }

  constructor() {
    super(HeadingSection.elementName,
          HeadingShowElements,
          HeadingEditElements);
  }

  get initialSelectedEditElement() {
    return this.editElements.title;
  }

  checkForErrors() {
    this.editElements.title.trimWhitespace();
    this.editElements.type.trimWhitespace();
    
    this.editElements.title.validate(this.errorMessages);
    this.editElements.type.validate(this.errorMessages);
  }

  update() {
    let title = this.editElements.title.value;
    let size = this.editElements.size.value;
    let type = this.editElements.type.value;
    let alignment = this.editElements.alignment.value;

    title = capitalizeFirstLetter(title);
    this.editElements.title.value = title;
    this.showElements.title.textContent = title;

    let subtitle = `${size} ${type}, ${alignment}`;
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
}
