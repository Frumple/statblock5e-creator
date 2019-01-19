import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';
import EnableDisableElementsCheckbox from '/src/js/elements/enable-disable-elements-checkbox.js';
import * as sectionModule from '/src/js/base/section.js';

export default class SpeedSection extends sectionModule.Section {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'speed-section',
      'src/html/sections/speed-section.html');
  }

  constructor(element) {
    super(element,
          new SpeedShowElements(element.shadowRoot),
          new SpeedEditElements(element.shadowRoot));

    let checkbox = new EnableDisableElementsCheckbox(this.editElements.use_custom);
    checkbox.disableElementWhenChecked(this.editElements.walk);
    checkbox.disableElementWhenChecked(this.editElements.burrow);
    checkbox.disableElementWhenChecked(this.editElements.climb);
    checkbox.disableElementWhenChecked(this.editElements.fly);
    checkbox.disableElementWhenChecked(this.editElements.hover);
    checkbox.disableElementWhenChecked(this.editElements.swim);
    checkbox.enableElementWhenChecked(this.editElements.custom_text);
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
    let useCustom = this.editElements.use_custom.checked;
    let customText = this.editElements.custom_text.value;

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
    this.walk = shadowRoot.getElementById('speed-walk-input');
    this.burrow = shadowRoot.getElementById('speed-burrow-input');
    this.climb = shadowRoot.getElementById('speed-climb-input');
    this.fly = shadowRoot.getElementById('speed-fly-input');
    this.hover = shadowRoot.getElementById('speed-hover-input');
    this.swim = shadowRoot.getElementById('speed-swim-input');
    this.use_custom = shadowRoot.getElementById('speed-use-custom-input');
    this.custom_text = shadowRoot.getElementById('speed-custom-input');
  }
}
