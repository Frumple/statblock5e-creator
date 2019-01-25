import * as sectionModule from '/src/js/base/section.js';

export default class SpeedSection extends sectionModule.Section {
  static get elementName() { return 'speed-section'; }
  static get templatePath() { return 'src/html/sections/speed-section.html'; }

  constructor() {
    super(SpeedSection.elementName,
          SpeedShowElements,
          SpeedEditElements);

    let useCustomCheckbox = this.editElements.useCustom;
    useCustomCheckbox.disableElementsWhenChecked(
      this.editElements.walk,
      this.editElements.burrow,
      this.editElements.climb,
      this.editElements.fly,
      this.editElements.hover,
      this.editElements.swim);
    useCustomCheckbox.enableElementsWhenChecked(
      this.editElements.customText);
  }

  get initialSelectedElement() {
    return this.editElements.walk;
  }

  checkForErrors() {

  }

  update() {
    let walkSpeed = this.editElements.walk.value;
    let burrowSpeed = this.editElements.burrow.value;
    let climbSpeed = this.editElements.climb.value;
    let flySpeed = this.editElements.fly.value;
    let hover = this.editElements.hover.checked;
    let swimSpeed = this.editElements.swim.value;
    let useCustom = this.editElements.useCustom.checked;
    let customText = this.editElements.customText.value;

    let text = '';

    if (useCustom) {
      text = customText;
    } else {
      const unit = 'ft.';

      if (!walkSpeed) {
        walkSpeed = 0;
      }
      text += `${walkSpeed} ${unit}`;

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
    }

    this.showElements.text.textContent = text;
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
}
