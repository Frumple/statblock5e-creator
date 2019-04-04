import * as propertyLineSectionModule from './property-line-section.js';
import Speed from '../../../models/speed.js';

export default class SpeedSection extends propertyLineSectionModule.PropertyLineSection {
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
      this.editElements.useCustomText.disableElementsWhenChecked(
        this.editElements.walk,
        this.editElements.burrow,
        this.editElements.climb,
        this.editElements.fly,
        this.editElements.hover,
        this.editElements.swim);

      this.editElements.useCustomText.enableElementsWhenChecked(
        this.editElements.customText);

      this.isInitialized = true;
    }
  }

  checkForErrors() {
    this.editElements.customText.value = this.editElements.customText.value.trim();

    if (this.editElements.useCustomText.checked) {
      this.editElements.customText.validate(this.errorMessages);
    }
  }

  updateModel() {
    Speed.walk = this.editElements.walk.valueAsInt;
    Speed.burrow = this.editElements.burrow.valueAsInt;
    Speed.climb = this.editElements.climb.valueAsInt;
    Speed.fly = this.editElements.fly.valueAsInt;
    Speed.hover = this.editElements.hover.checked;
    Speed.swim = this.editElements.swim.valueAsInt;

    Speed.useCustomText = this.editElements.useCustomText.checked;
    Speed.originalCustomText = this.editElements.customText.value;
    Speed.parsedCustomText = this.editElements.customText.parsedText;
  }

  updateView() {    
    if (Speed.useCustomText) {
      this.showElements.text.innerHTMLSanitized = Speed.parsedCustomText;
    } else {
      this.showElements.text.textContent = Speed.nonCustomText;
    }
  }

  exportToHtml() {
    return Speed.toHtml();
  }

  exportToHomebrewery() {
    return Speed.toHomebrewery();
  }
}

class SpeedShowElements extends propertyLineSectionModule.PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class SpeedEditElements extends propertyLineSectionModule.PropertyLineEditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.walk = shadowRoot.getElementById('walk-input');
    this.burrow = shadowRoot.getElementById('burrow-input');
    this.climb = shadowRoot.getElementById('climb-input');
    this.fly = shadowRoot.getElementById('fly-input');
    this.hover = shadowRoot.getElementById('hover-input');
    this.swim = shadowRoot.getElementById('swim-input');
    this.useCustomText = shadowRoot.getElementById('use-custom-text-input');
    this.customText = shadowRoot.getElementById('custom-text-input');
  }

  get initiallySelectedElement() {
    if (this.useCustomText.checked) {
      return this.customText;
    }
    return this.walk;
  }
}
