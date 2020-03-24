import { Section, ShowElements, EditElements } from './section.js';

export class PropertyLineSection extends Section {
  constructor(templatePaths, modelPropertyName, showElements, editElements) {
    super(templatePaths, modelPropertyName, showElements, editElements);
  }
}

export class PropertyLineShowElements extends ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.heading = shadowRoot.getElementById('show-section-heading');
    this.text = shadowRoot.getElementById('show-section-text');
  }
}

export class PropertyLineEditElements extends EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}