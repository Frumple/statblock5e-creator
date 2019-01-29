import * as sectionModule from '/src/js/base/section.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

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

    this.editElements.useHitDie.addEventListener('input', () => {
      this.calculateHitPointsFromHitDie();
    });

    this.editElements.hitDieQuantity.addEventListener('input', () => {
      this.calculateHitPointsFromHitDie();
    });

    this.editElements.hitDieSize.addEventListener('input', () => {
      this.calculateHitPointsFromHitDie();
    });
  }

  setConstitutionModifier(constitutionModifier) {
    this.editElements.constitutionModifier.textContent = constitutionModifier;
    this.calculateHitPointsFromHitDie();
    this.update();
  }

  calculateHitPointsFromHitDie() {
    let useHitDie = this.editElements.useHitDie.checked;
    let hitDieQuantity = parseInt(this.editElements.hitDieQuantity.value, 10);
    let hitDieSize = parseInt(this.editElements.hitDieSize.value, 10);
    let constitutionModifier = parseInt(this.editElements.constitutionModifier.textContent, 10);

    if (isNaN(hitDieQuantity)) {
      hitDieQuantity = 0;
    }

    let constitutionHitPoints = hitDieQuantity * constitutionModifier;
    this.editElements.constitutionHitPoints.textContent = constitutionHitPoints;
    this.editElements.constitutionHitPointsOperator.textContent = getModifierOperator(constitutionHitPoints);
    this.editElements.constitutionHitPointsNumber.textContent = getModifierNumber(constitutionHitPoints);

    if(useHitDie) {
      let hitDieAverage = (hitDieSize / 2) + 0.5;
      let hitPoints = Math.floor(hitDieQuantity * hitDieAverage) + constitutionHitPoints;
      hitPoints = Math.max(0, hitPoints);

      this.editElements.hitPoints.value = hitPoints;
    }
  }

  get initialSelectedEditElement() {
    if (this.editElements.useHitDie.checked) {
      return this.editElements.hitDieQuantity;
    }
    return this.editElements.hitPoints;
  }

  checkForErrors() {
    this.editElements.hitPoints.validate(this.errorMessages);
    this.editElements.hitDieQuantity.validate(this.errorMessages);
  }

  update() {
    let hitPoints = parseInt(this.editElements.hitPoints.value, 10);
    let useHitDie = this.editElements.useHitDie.checked;
    let hitDieQuantity = parseInt(this.editElements.hitDieQuantity.value, 10);
    let hitDieSize = parseInt(this.editElements.hitDieSize.value, 10);
    let constitutionHitPoints = parseInt(this.editElements.constitutionHitPoints.textContent, 10);

    let text = '';
    if (useHitDie) {
      if (constitutionHitPoints != 0) {
        let modifier_operator = getModifierOperator(constitutionHitPoints);
        let modifier_number = getModifierNumber(constitutionHitPoints);
        text = `${hitPoints} (${hitDieQuantity}d${hitDieSize} ${modifier_operator} ${modifier_number})`;
      } else {
        text = `${hitPoints} (${hitDieQuantity}d${hitDieSize})`;
      }
    } else {
      text = hitPoints;
    }

    this.showElements.text.textContent = text;
  }

  save() {
    this.calculateHitPointsFromHitDie();
    super.save();
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
    this.constitutionModifier = shadowRoot.getElementById('constitution-modifier');
    this.constitutionHitPoints = shadowRoot.getElementById('constitution-hit-points');
    this.constitutionHitPointsOperator = shadowRoot.getElementById('constitution-hit-points-operator');
    this.constitutionHitPointsNumber = shadowRoot.getElementById('constitution-hit-points-number');
  }
}
