import * as sectionModule from './section.js';
import { createPropertyLine } from '../../../helpers/export-helpers.js';

export default class SpeedSection extends sectionModule.Section {
  static get elementName() { return 'speed-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'speed-section',
      'src/html/elements/autonomous/sections/speed-section.html');
  }

  constructor() {
    super(SpeedSection.templatePaths,
          SpeedShowElements,
          SpeedEditElements);
  }

  connectedCallback() {
    if(this.isConnected && ! this.isInitialized) {
      this.editElements.useCustom.disableElementsWhenChecked(
        this.editElements.walk,
        this.editElements.burrow,
        this.editElements.climb,
        this.editElements.fly,
        this.editElements.hover,
        this.editElements.swim);

      this.editElements.useCustom.enableElementsWhenChecked(
        this.editElements.customText);

      this.isInitialized = true;
    }
  }

  checkForErrors() {
    this.editElements.customText.value = this.editElements.customText.value.trim();

    if (this.editElements.useCustom.checked) {
      this.editElements.customText.validate(this.errorMessages);
    }
  }

  updateShowSection() {    
    const useCustom = this.editElements.useCustom.checked;
    const customText = this.editElements.customText.parsedText;

    if (useCustom) {
      this.showElements.text.innerHTMLSanitized = customText;
    } else {
      this.showElements.text.textContent = this.normalShowSectionText;
    }
  }

  get normalShowSectionText() {
    let walkSpeed = this.editElements.walk.value;
    const burrowSpeed = this.editElements.burrow.value;
    const climbSpeed = this.editElements.climb.value;
    const flySpeed = this.editElements.fly.value;
    const hover = this.editElements.hover.checked;
    const swimSpeed = this.editElements.swim.value;

    const unit = 'ft.';

    if (! walkSpeed) {
      walkSpeed = 0;
    }
    let text = `${walkSpeed} ${unit}`;

    if (burrowSpeed) {
      text += `, burrow ${burrowSpeed} ${unit}`;
    }
    if (climbSpeed) {
      text += `, climb ${climbSpeed} ${unit}`;
    }
    if (flySpeed) {
      text += `, fly ${flySpeed} ${unit}`;
      if (hover) {
        text += ' (hover)';
      }
    }
    if (swimSpeed) {
      text += `, swim ${swimSpeed} ${unit}`;
    }

    return text;
  }

  exportToHtml() {
    const heading = 'Speed';
    const text = this.showElements.text.innerHTMLSanitized;
    const propertyLine = createPropertyLine(heading, text);

    return propertyLine;
  }
}

class SpeedShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('speed-text');
  }
}

class SpeedEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.walk = shadowRoot.getElementById('walk-input');
    this.burrow = shadowRoot.getElementById('burrow-input');
    this.climb = shadowRoot.getElementById('climb-input');
    this.fly = shadowRoot.getElementById('fly-input');
    this.hover = shadowRoot.getElementById('hover-input');
    this.swim = shadowRoot.getElementById('swim-input');
    this.useCustom = shadowRoot.getElementById('use-custom-input');
    this.customText = shadowRoot.getElementById('custom-input');
  }

  get initiallySelectedElement() {
    if (this.useCustom.checked) {
      return this.customText;
    }
    return this.walk;
  }
}
