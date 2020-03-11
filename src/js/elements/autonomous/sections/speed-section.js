import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class SpeedSection extends propertyLineSectionModule.PropertyLineSection {
  static get elementName() { return 'speed-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'speed-section',
      'src/html/elements/autonomous/sections/speed-section.html');
  }

  constructor() {
    super(SpeedSection.templatePaths,
          'speed',
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
        this.editElements.swim);

      this.editElements.useCustomText.enableElementsWhenChecked(
        this.editElements.customText);

      this.editElements.fly.addEventListener('input', this.onInputFlySpeed.bind(this));
      this.editElements.useCustomText.addEventListener('input', this.onInputFlySpeed.bind(this));

      this.isInitialized = true;
    }
  }

  onInputFlySpeed() {
    if (this.editElements.fly.valueAsInt !== null &&
      ! this.editElements.useCustomText.checked) {
      this.editElements.hover.removeAttribute('disabled');
    } else {
      this.editElements.hover.setAttribute('disabled', '');
    }

    // console.log(`${this.editElements.hover.getAttribute('disabled')}`);
  }

  checkForErrors() {
    this.editElements.customText.value = this.editElements.customText.value.trim();

    if (this.editElements.useCustomText.checked) {
      this.editElements.customText.validate(this.errorMessages);
    }
  }

  updateModel() {
    const speedModel = CurrentContext.creature.speed;

    speedModel.walk = this.editElements.walk.valueAsInt;
    speedModel.burrow = this.editElements.burrow.valueAsInt;
    speedModel.climb = this.editElements.climb.valueAsInt;
    speedModel.fly = this.editElements.fly.valueAsInt;
    speedModel.hover = this.editElements.hover.checked;
    speedModel.swim = this.editElements.swim.valueAsInt;

    speedModel.useCustomText = this.editElements.useCustomText.checked;
    speedModel.customText = this.editElements.customText.value;
    speedModel.htmlCustomText = this.editElements.customText.htmlText;
  }

  updateEditModeView() {
    const speedModel = CurrentContext.creature.speed;

    this.editElements.walk.value = speedModel.walk;
    this.editElements.burrow.value = speedModel.burrow;
    this.editElements.climb.value = speedModel.climb;
    this.editElements.fly.value = speedModel.fly;
    this.editElements.hover.checked = speedModel.hover;
    this.editElements.swim.value = speedModel.swim;

    this.editElements.useCustomText.checked = speedModel.useCustomText;
    this.editElements.customText.value = speedModel.customText;
    if (speedModel.useCustomText) {
      this.editElements.customText.parse();
      speedModel.htmlCustomText = this.editElements.customText.htmlText;
    }

    this.editElements.useCustomText.onInputCheckbox();
    this.onInputFlySpeed();
  }

  updateShowModeView() {
    const speedModel = CurrentContext.creature.speed;

    if (speedModel.useCustomText) {
      this.showElements.text.innerHTMLSanitized = speedModel.htmlCustomText;
    } else {
      this.showElements.text.textContent = speedModel.normalText;
    }
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
