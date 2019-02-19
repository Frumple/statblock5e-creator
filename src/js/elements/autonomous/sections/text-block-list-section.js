import * as sectionModule from '/src/js/elements/autonomous/sections/section.js';

export default class TextBlockListSection extends sectionModule.Section {
  static get templatePaths() {
    return super.templatePaths.set(
      'text-block-list-section',
      'src/html/elements/autonomous/sections/text-block-list-section.html');
  }

  constructor(templatePaths) {
    super(templatePaths,
          TextBlockListShowElements,
          TextBlockListEditElements); 
  }
}

class TextBlockListShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class TextBlockListEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.addButton = shadowRoot.getElementById('add-button');
  }
  
  get initiallySelectedElement() {
    return this.addButton;
  }
}