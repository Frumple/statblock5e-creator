import * as sectionModule from '/src/js/base/section.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierNumber } from '/src/js/helpers/string-format.js';

export default class HitPointsSection extends sectionModule.Section {
  static get elementName() { return 'hit-points-section'; }
  static get templatePath() { return 'src/html/sections/hit-points-section.html'; }

  constructor() {
    super(HitPointsSection.elementName,
          HitPointsShowElements,
          HitPointsEditElements);

    let useHitDieCheckbox = this.editElements.use_hit_die;
    useHitDieCheckbox.disableElementWhenChecked(this.editElements.hit_points);
    useHitDieCheckbox.enableElementWhenChecked(this.editElements.hit_die_quantity);
    useHitDieCheckbox.enableElementWhenChecked(this.editElements.hit_die_size);

    this.editElements.use_hit_die.addEventListener('input', () => {
      this.calculateHitPointsFromHitDie();
    });

    this.editElements.hit_die_quantity.addEventListener('input', () => {
      this.calculateHitPointsFromHitDie();
    });

    this.editElements.hit_die_size.addEventListener('input', () => {
      this.calculateHitPointsFromHitDie();
    });
  }

  setConstitutionModifier(constitutionModifier) {
    this.editElements.constitution_modifier.textContent = constitutionModifier;
    this.calculateHitPointsFromHitDie();
    this.update();
  }

  calculateHitPointsFromHitDie() {
    let useHitDie = this.editElements.use_hit_die.checked;
    let hitDieQuantity = parseInt(this.editElements.hit_die_quantity.value, 10);
    let hitDieSize = parseInt(this.editElements.hit_die_size.value, 10);
    let constitutionModifier = parseInt(this.editElements.constitution_modifier.textContent, 10);

    if (isNaN(hitDieQuantity)) {
      hitDieQuantity = 0;
    }

    let constitutionHitPoints = hitDieQuantity * constitutionModifier;
    this.editElements.constitution_hit_points.textContent = constitutionHitPoints;
    this.editElements.constitution_hit_points_operator.textContent = getModifierOperator(constitutionHitPoints);
    this.editElements.constitution_hit_points_number.textContent = getModifierNumber(constitutionHitPoints);

    if(useHitDie) {
      let hitDieAverage = (hitDieSize / 2) + 0.5;
      let hitPoints = Math.floor(hitDieQuantity * hitDieAverage) + constitutionHitPoints;
      hitPoints = Math.max(0, hitPoints);

      this.editElements.hit_points.value = hitPoints;
    }
  }

  checkForErrors() {
    this.editElements.hit_points.validate(this.error_messages);
    this.editElements.hit_die_quantity.validate(this.error_messages);
  }

  update() {
    let hitPoints = parseInt(this.editElements.hit_points.value, 10);
    let useHitDie = this.editElements.use_hit_die.checked;
    let hitDieQuantity = parseInt(this.editElements.hit_die_quantity.value, 10);
    let hitDieSize = parseInt(this.editElements.hit_die_size.value, 10);
    let constitutionHitPoints = parseInt(this.editElements.constitution_hit_points.textContent, 10);

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
    this.hit_points = shadowRoot.getElementById('hit-points-input');
    this.use_hit_die = shadowRoot.getElementById('use-hit-die-input');
    this.hit_die_quantity = shadowRoot.getElementById('hit-die-quantity-input');
    this.hit_die_size = shadowRoot.getElementById('hit-die-size-input');
    this.constitution_modifier = shadowRoot.getElementById('constitution-modifier');
    this.constitution_hit_points = shadowRoot.getElementById('constitution-hit-points');
    this.constitution_hit_points_operator = shadowRoot.getElementById('constitution-hit-points-operator');
    this.constitution_hit_points_number = shadowRoot.getElementById('constitution-hit-points-number');
  }
}
