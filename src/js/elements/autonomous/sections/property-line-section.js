import * as sectionModule from './section.js';
import { createPropertyLine } from '../../../helpers/export-helpers.js';

export class PropertyLineSection extends sectionModule.Section {
  constructor(templatePaths, showElements, editElements, headingName) {
    super(templatePaths, showElements, editElements);

    this.headingName = headingName;
  }

  exportToHtml() {
    const isSanitizedParagraph = (this.showElements.text.getAttribute('is') === 'sanitized-paragraph');
    const text = 
      isSanitizedParagraph ?
        this.showElements.text.innerHTMLSanitized :
        this.showElements.text.textContent;

    return createPropertyLine(this.headingName, text);
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