import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import EnableDisableElementsCheckbox from '/src/js/helpers/enable-disable-elements-checkbox.js';
import * as sectionModule from '/src/js/helpers/section.js';
import { getModifierOperator } from '/src/js/helpers/string-format.js';
import { getModifierValue } from '/src/js/helpers/string-format.js';

export default class HitPointsSection extends sectionModule.Section {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'hit-points-section',
      'src/html/sections/hit-points-section.html');
  }

  constructor(element) {
    super(element,
          new HitPointsShowElements(element.shadowRoot),
          new HitPointsEditElements(element.shadowRoot));

    let checkbox = new EnableDisableElementsCheckbox(this.editElements.use_hit_die);
    checkbox.disableElementWhenChecked(this.editElements.hit_points);
    checkbox.enableElementWhenChecked(this.editElements.hit_die_quantity);
    checkbox.enableElementWhenChecked(this.editElements.hit_die_size);

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

  setConstitutionHitPointsModifier(modifier) {
    this.editElements.constitution_hit_points_modifier.textContent = modifier;
    this.calculateHitPointsFromHitDie();
    this.update();
  }

  calculateHitPointsFromHitDie() {
    let useHitDie = this.editElements.use_hit_die.checked;

    if(useHitDie) {
      let hitDieQuantity = this.editElements.hit_die_quantity.value;
      let hitDieSize = this.editElements.hit_die_size.value;
      let constitutionHitPointsModifier = parseInt(this.editElements.constitution_hit_points_modifier.textContent, 10);

      let hitDieAverage = (hitDieSize / 2) + 0.5;
      let hitPoints = Math.floor(hitDieQuantity * hitDieAverage) + constitutionHitPointsModifier;
      hitPoints = Math.max(0, hitPoints);

      this.editElements.hit_points.value = hitPoints;
    }
  }

  checkForErrors() {
    this.editElements.hit_points.validate(this.error_messages);
    this.editElements.hit_die_quantity.validate(this.error_messages);
  }

  update() {
    let constitutionHitPointsModifier = parseInt(this.editElements.constitution_hit_points_modifier.textContent, 10);

    this.updateShowSection(constitutionHitPointsModifier);
    this.updateEditSection(constitutionHitPointsModifier);
  }

  updateShowSection(constitutionHitPointsModifier) {
    let hitPoints = this.editElements.hit_points.value;
    let useHitDie = this.editElements.use_hit_die.checked;
    let hitDieQuantity = this.editElements.hit_die_quantity.value;
    let hitDieSize = this.editElements.hit_die_size.value;

    let text = '';
    if (useHitDie) {
      if (constitutionHitPointsModifier != 0) {
        let modifier_operator = getModifierOperator(constitutionHitPointsModifier);
        let modifier_value = getModifierValue(constitutionHitPointsModifier);
        text = `${hitPoints} (${hitDieQuantity}d${hitDieSize} ${modifier_operator} ${modifier_value})`;
      } else {
        text = `${hitPoints} (${hitDieQuantity}d${hitDieSize})`;
      }
    } else {
      text = hitPoints;
    }

    this.showElements.text.textContent = text;
  }

  updateEditSection(constitutionHitPointsModifier) {
    let constitutionHitPointsOperatorElement = this.editElements.constitution_hit_points_operator;
    let constitutionHitPointsValueElement = this.editElements.constitution_hit_points_value;

    constitutionHitPointsOperatorElement.textContent = getModifierOperator(constitutionHitPointsModifier);
    constitutionHitPointsValueElement.textContent = getModifierValue(constitutionHitPointsModifier);
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
    this.constitution_hit_points_operator = shadowRoot.getElementById('constitution-hit-points-operator');
    this.constitution_hit_points_value = shadowRoot.getElementById('constitution-hit-points-value');
    this.constitution_hit_points_modifier = shadowRoot.getElementById('constitution-hit-points-modifier');
  }
}
