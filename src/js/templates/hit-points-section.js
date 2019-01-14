import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import * as sectionModule from '/src/js/helpers/section.js';

class HitPointsSection extends sectionModule.Section {
  constructor(shadowRoot) {
    super(shadowRoot,
          new HitPointsShowElements(shadowRoot),
          new HitPointsEditElements(shadowRoot));

    this.editElements.use_hit_die.addEventListener('input', () => {
      if (this.editElements.use_hit_die.checked) {
        this.editElements.hit_points.setAttribute('disabled', '');
        this.editElements.hit_die_quantity.removeAttribute('disabled');
        this.editElements.hit_die_size.removeAttribute('disabled');
        this.calculateHitPointsFromHitDie();
      } else {
        this.editElements.hit_points.removeAttribute('disabled');
        this.editElements.hit_die_quantity.setAttribute('disabled', '');
        this.editElements.hit_die_size.setAttribute('disabled', '');
      }
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
    let hitDieQuantity = this.editElements.hit_die_quantity.value;
    let hitDieSize = this.editElements.hit_die_size.value;
    let constitutionHitPointsModifier = parseInt(this.editElements.constitution_hit_points_modifier.textContent);

    let hitDieAverage = (hitDieSize / 2) + 0.5;
    let hitPoints = Math.floor(hitDieQuantity * hitDieAverage) + constitutionHitPointsModifier;

    this.editElements.hit_points.value = hitPoints;
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

    let operatorElement = this.editElements.constitution_hit_points_operator;
    let valueElement = this.editElements.constitution_hit_points_value;

    if (constitutionHitPointsModifier >= 0) {
      operatorElement.textContent = '+';
      valueElement.textContent = constitutionHitPointsModifier;
    } else {
      operatorElement.textContent = '-';
      valueElement.textContent = Math.abs(constitutionHitPointsModifier);
    }
  }

  save() {
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
    this.constitution_hit_points_modifier = shadowRoot.getElementById('constitution-hit-points-modifier');
    this.constitution_hit_points_operator = shadowRoot.getElementById('constitution-hit-points-operator');
    this.constitution_hit_points_value = shadowRoot.getElementById('constitution-hit-points-value');
  }
}

export async function defineCustomElement() {
  await defineCustomElementFromTemplate(
    'hit-points-section',
    'src/templates/hit-points-section.html');
}

export function init(element) {
  new HitPointsSection(element.shadowRoot);
}
