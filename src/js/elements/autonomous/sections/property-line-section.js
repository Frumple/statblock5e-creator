import * as sectionModule from './section.js';

export class PropertyLineSection extends sectionModule.Section {
  constructor(templatePaths, modelPropertyName, showElements, editElements) {
    super(templatePaths, modelPropertyName, showElements, editElements);
  }
}

export class PropertyLineShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.heading = shadowRoot.getElementById('show-section-heading');
    this.text = shadowRoot.getElementById('show-section-text');
  }
}

export class PropertyLineEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}