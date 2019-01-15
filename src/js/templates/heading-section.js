import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import * as sectionModule from '/src/js/helpers/section.js';

export default class HeadingSection extends sectionModule.Section {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'heading-section',
      'src/templates/heading-section.html');
  }

  constructor(element) {
    super(element,
          new HeadingShowElements(element.shadowRoot),
          new HeadingEditElements(element.shadowRoot));

    this.showElements.section.addEventListener('click', () => {
      this.editElements.title.select();
    });

    this.editElements.title.addEventListener('keydown', (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.save();
      }
    });
  }

  save() {
    let title = this.editElements.title.value;
    let size = this.editElements.size.value;
    let type = this.editElements.type.value;
    let alignment = this.editElements.alignment.value;

    this.error_messages.clear();

    if (title === "") {
      this.error_messages.add(this.editElements.title, 'Creature name cannot be blank.');
    }

    if (type === "") {
      this.error_messages.add(this.editElements.type, 'Creature type cannot be blank.');
    }

    if (this.error_messages.any()) {
      return;
    }

    title = HeadingSection.capitalizeFirstLetter(title);
    this.editElements.title.value = title;
    this.showElements.title.textContent = title;

    let subtitle = size + " " + type + ", " + alignment;
    this.showElements.subtitle.textContent = subtitle;

    this.switchToShowMode();
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
