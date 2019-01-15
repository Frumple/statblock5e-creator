import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import EnableDisableElementsCheckbox from '/src/js/helpers/enable-disable-elements-checkbox.js';
import * as sectionModule from '/src/js/helpers/section.js';

export default class HitPointsSection extends sectionModule.Section {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'hit-points-section',
      'src/templates/hit-points-section.html');
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
      let constitutionHitPointsModifier = parseInt(this.editElements.constitution_hit_points_modifier.textContent);

      let hitDieAverage = (hitDieSize / 2) + 0.5;
      let hitPoints = Math.floor(hitDieQuantity * hitDieAverage) + constitutionHitPointsModifier;
      hitPoints = Math.max(0, hitPoints);

      this.editElements.hit_points.value = hitPoints;
    }
  }

  update() {
    let hitPoints = this.editElements.hit_points.value;
    let useHitDie = this.editElements.use_hit_die.checked;
    let hitDieQuantity = this.editElements.hit_die_quantity.value;
    let hitDieSize = this.editElements.hit_die_size.value;
    let constitutionHitPointsModifier = parseInt(this.editElements.constitution_hit_points_modifier.textContent);

    let text = hitPoints;
    if (useHitDie) {
      text += ' (' + hitDieQuantity + 'd' + hitDieSize;
      if (constitutionHitPointsModifier > 0) {
        text += ' + ' + constitutionHitPointsModifier;
      } else if (constitutionHitPointsModifier < 0) {
        text += ' - ' + Math.abs(constitutionHitPointsModifier);
      }
      text += ')';
    }
    this.showElements.text.textContent = text;

    let trailingText = this.editElements.hit_die_trailing_text;

    if (constitutionHitPointsModifier >= 0) {
      trailingText.textContent = '+ ' + constitutionHitPointsModifier + ' )';
    } else {
      trailingText.textContent = '- ' + Math.abs(constitutionHitPointsModifier) + ' )';
    }
  }

  save() {
    this.calculateHitPointsFromHitDie();
    this.update();
    this.switchToShowMode();
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
    this.hit_die_trailing_text = shadowRoot.getElementById('hit-die-trailing-text');
    this.constitution_hit_points_modifier = shadowRoot.getElementById('constitution-hit-points-modifier');
  }
}
