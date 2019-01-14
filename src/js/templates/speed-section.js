import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import * as sectionModule from '/src/js/helpers/section.js';

class SpeedSection extends sectionModule.Section {
  constructor(shadowRoot) {
    super(shadowRoot,
          new SpeedShowElements(shadowRoot),
          new SpeedEditElements(shadowRoot));

    this.editElements.use_custom.addEventListener('input', () => {
      if (this.editElements.use_custom.checked) {
        this.editElements.walk.setAttribute('disabled', '');
        this.editElements.burrow.setAttribute('disabled', '');
        this.editElements.climb.setAttribute('disabled', '');
        this.editElements.fly.setAttribute('disabled', '');
        this.editElements.hover.setAttribute('disabled', '');
        this.editElements.swim.setAttribute('disabled', '');
        this.editElements.custom_text.removeAttribute('disabled');
      } else {
        this.editElements.walk.removeAttribute('disabled');
        this.editElements.burrow.removeAttribute('disabled');
        this.editElements.climb.removeAttribute('disabled');
        this.editElements.fly.removeAttribute('disabled');
        this.editElements.hover.removeAttribute('disabled');
        this.editElements.swim.removeAttribute('disabled');
        this.editElements.custom_text.setAttribute('disabled', '');
      }
    });
  }

  save() {
    let walkSpeed = this.editElements.walk.value;
    let burrowSpeed = this.editElements.burrow.value;
    let climbSpeed = this.editElements.climb.value;
    let flySpeed = this.editElements.fly.value;
    let hover = this.editElements.hover.checked;
    let swimSpeed = this.editElements.swim.value;
    let useCustom = this.editElements.use_custom.checked;
    let customText = this.editElements.custom_text.value;

    let text = "";

    if (useCustom) {
      text = customText;
    } else {
      const comma = ', ';
      const unit = ' ft.';

      if (!walkSpeed) {
        walkSpeed = 0;
      }
      text += walkSpeed + unit;

      if (burrowSpeed) {
        text += comma + 'burrow ' + burrowSpeed + unit;
      }
      if (climbSpeed) {
        text += comma + 'climb ' + climbSpeed + unit;
      }
      if (flySpeed) {
        text += comma + 'fly ' + flySpeed + unit;
        if (hover) {
          text += ' (hover)';
        }
      }
      if (swimSpeed) {
        text += comma + 'swim ' + swimSpeed + unit;
      }
    }

    this.showElements.text.textContent = text;
    this.switchToShowMode();
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

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'speed-section',
    'src/templates/speed-section.html');
}

export function init(element) {
  new SpeedSection(element.shadowRoot);
}
