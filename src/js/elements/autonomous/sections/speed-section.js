import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';

const speed = CurrentContext.creature.speed;

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
      super.connectedCallback();

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
    speed.walk = this.editElements.walk.valueAsInt;
    speed.burrow = this.editElements.burrow.valueAsInt;
    speed.climb = this.editElements.climb.valueAsInt;
    speed.fly = this.editElements.fly.valueAsInt;
    speed.hover = this.editElements.hover.checked;
    speed.swim = this.editElements.swim.valueAsInt;

    speed.useCustomText = this.editElements.useCustomText.checked;
    speed.originalCustomText = this.editElements.customText.value;
    speed.htmlCustomText = this.editElements.customText.htmlText;
  }

  updateEditModeView() {
    this.editElements.walk.value = speed.walk;
    this.editElements.burrow.value = speed.burrow;
    this.editElements.climb.value = speed.climb;
    this.editElements.fly.value = speed.fly;
    this.editElements.hover.checked = speed.hover;
    this.editElements.swim.value = speed.swim;

    this.editElements.useCustomText.checked = speed.useCustomText;
    this.editElements.customText.value = speed.originalCustomText;
    this.editElements.customText.htmlText = speed.htmlCustomText;
  }

  updateShowModeView() {
    if (speed.useCustomText) {
      this.showElements.text.innerHTMLSanitized = speed.htmlCustomText;
    } else {
      this.showElements.text.textContent = speed.nonCustomText;
    }
  }

  exportToJson() {
    return speed.toJson();
  }

  exportToHtml() {
    return speed.toHtml();
  }

  exportToHomebrewery() {
    return speed.toHomebrewery();
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
