import * as sectionModule from '/src/js/base/section.js';
import HitPoints from '/src/js/stats/hit-points.js';
import { formatModifierOperator } from '/src/js/helpers/string-formatter.js';
import { formatModifierNumber } from '/src/js/helpers/string-formatter.js';
import validateIntegerInput from '/src/js/helpers/integer-input-validator.js';

export default class HitPointsSection extends sectionModule.Section {
  static get elementName() { return 'hit-points-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'hit-points-section',
      'src/html/sections/hit-points-section.html');
  }

  constructor() {
    super(HitPointsSection.templatePaths,
          HitPointsShowElements,
          HitPointsEditElements);

    let useHitDieCheckbox = this.editElements.useHitDie;
    useHitDieCheckbox.disableElementsWhenChecked(
      this.editElements.hitPoints);
    useHitDieCheckbox.enableElementsWhenChecked(
      this.editElements.hitDieQuantity,
      this.editElements.hitDieSize);

    this.editElements.hitPoints.addEventListener('input', () => {
      if (! this.editElements.useHitDie.checked) {
        let hitPoints = parseInt(this.editElements.hitPoints.value, 10);

        if (! isNaN(hitPoints)) {
          HitPoints.hitPoints = hitPoints;
        }

        this.updateHitPoints();
      }
    });

    this.editElements.useHitDie.addEventListener('input', () => {
      HitPoints.useHitDie = this.editElements.useHitDie.checked;
      this.updateHitPoints();
    });

    this.editElements.hitDieQuantity.addEventListener('input', () => {
      let hitDieQuantity = parseInt(this.editElements.hitDieQuantity.value, 10);

      if (! isNaN(hitDieQuantity)) {
        HitPoints.hitDieQuantity = hitDieQuantity;
        this.updateHitPoints();
      }
    });

    this.editElements.hitDieSize.addEventListener('input', () => {
      let hitDieSize = parseInt(this.editElements.hitDieSize.value, 10);

      if (! isNaN(hitDieSize)) {
        HitPoints.hitDieSize = hitDieSize;
        this.updateHitPoints();
      }
    });
  }

  updateHitPoints() {
    let constitutionHitPoints = HitPoints.constitutionHitPoints;
    let constitutionHitPointsOperator = formatModifierOperator(constitutionHitPoints);
    let constitutionHitPointsNumber = formatModifierNumber(constitutionHitPoints);

    this.editElements.trailingText.textContent = `${constitutionHitPointsOperator} ${constitutionHitPointsNumber} )`;
    this.editElements.hitPoints.value = HitPoints.hitPoints;

    this.updateShowSection();
  }

  checkForErrors() {
    validateIntegerInput(this.editElements.hitPoints, this.errorMessages);
    validateIntegerInput(this.editElements.hitDieQuantity, this.errorMessages);
  }

  updateShowSection() {
    let text = '';
    let hitPoints = HitPoints.hitPoints;

    if (HitPoints.useHitDie) {
      let hitDieQuantity = HitPoints.hitDieQuantity;
      let hitDieSize = HitPoints.hitDieSize;
      let constitutionHitPoints = HitPoints.constitutionHitPoints;      

      if (constitutionHitPoints != 0) {
        let modifierOperator = formatModifierOperator(constitutionHitPoints);
        let modifierNumber = formatModifierNumber(constitutionHitPoints);
        text = `${hitPoints} (${hitDieQuantity}d${hitDieSize} ${modifierOperator} ${modifierNumber})`;
      } else {
        text = `${hitPoints} (${hitDieQuantity}d${hitDieSize})`;
      }
    } else {
      text = hitPoints;
    }

    this.showElements.text.textContent = text;
  }
}

class HitPointsShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('hit-points-text');
  }
}

class HitPointsEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.hitPoints = shadowRoot.getElementById('hit-points-input');
    this.useHitDie = shadowRoot.getElementById('use-hit-die-input');
    this.hitDieQuantity = shadowRoot.getElementById('hit-die-quantity-input');
    this.hitDieSize = shadowRoot.getElementById('hit-die-size-input');
    this.trailingText = shadowRoot.getElementById('hit-die-trailing-text');
  }

  get initiallySelectedElement() {
    if (this.useHitDie.checked) {
      return this.hitDieQuantity;
    }
    return this.hitPoints;
  }
}
