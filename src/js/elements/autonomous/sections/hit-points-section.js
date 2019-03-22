import * as propertyLineSectionModule from './property-line-section.js';
import HitPoints from '../../../stats/hit-points.js';
import { formatModifierOperator, formatModifierNumber } from '../../../helpers/string-formatter.js';

export default class HitPointsSection extends propertyLineSectionModule.PropertyLineSection {
  static get elementName() { return 'hit-points-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'hit-points-section',
      'src/html/elements/autonomous/sections/hit-points-section.html');
  }

  constructor() {
    super(HitPointsSection.templatePaths,
          HitPointsShowElements,
          HitPointsEditElements,
          'Hit Points');  
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.editElements.useHitDie.disableElementsWhenChecked(
        this.editElements.hitPoints);

      this.editElements.useHitDie.enableElementsWhenChecked(
        this.editElements.hitDieQuantity,
        this.editElements.hitDieSize);

      this.editElements.hitPoints.addEventListener('input', this.onInputHitPoints.bind(this));
      this.editElements.useHitDie.addEventListener('input', this.onInputUseHitDie.bind(this));
      this.editElements.hitDieQuantity.addEventListener('input', this.onInputHitDieQuantity.bind(this));
      this.editElements.hitDieSize.addEventListener('input', this.onInputHitDieSize.bind(this));
    
      this.isInitialized = true;
    }
  }

  onInputHitPoints() {
    if (! HitPoints.useHitDie) {
      const hitPoints = this.editElements.hitPoints.valueAsInt;

      if (! isNaN(hitPoints)) {
        HitPoints.hitPoints = hitPoints;
        this.updateHitPoints();
      }
    }
  }

  onInputUseHitDie() {
    HitPoints.useHitDie = this.editElements.useHitDie.checked;
    this.updateHitPoints();
  }

  onInputHitDieQuantity() {
    const hitDieQuantity = this.editElements.hitDieQuantity.valueAsInt;

    if (! isNaN(hitDieQuantity)) {
      HitPoints.hitDieQuantity = hitDieQuantity;
      this.updateHitPoints();
    }
  }

  onInputHitDieSize() {
    const hitDieSize = parseInt(this.editElements.hitDieSize.value, 10);

    if (! isNaN(hitDieSize)) {
      HitPoints.hitDieSize = hitDieSize;
      this.updateHitPoints();
    }
  }

  updateHitPoints() {
    const constitutionHitPoints = HitPoints.constitutionHitPoints;
    const constitutionHitPointsOperator = formatModifierOperator(constitutionHitPoints);
    const constitutionHitPointsNumber = formatModifierNumber(constitutionHitPoints);

    this.editElements.trailingText.textContent = `${constitutionHitPointsOperator} ${constitutionHitPointsNumber} )`;
    this.editElements.hitPoints.value = HitPoints.hitPoints;

    this.updateShowSection();
  }

  checkForErrors() {
    if (HitPoints.useHitDie) {
      this.editElements.hitDieQuantity.validate(this.errorMessages);
    } else {
      this.editElements.hitPoints.validate(this.errorMessages);
    }    
  }

  updateShowSection() {
    let text;

    if (HitPoints.useHitDie) {
      text = this.hitDieShowSectionText;
    } else {
      text = HitPoints.hitPoints;
    }

    this.showElements.text.textContent = text;
  }

  get hitDieShowSectionText() {
    const hitPoints = HitPoints.hitPoints;
    const hitDieQuantity = HitPoints.hitDieQuantity;
    const hitDieSize = HitPoints.hitDieSize;
    const constitutionHitPoints = HitPoints.constitutionHitPoints;      

    if (constitutionHitPoints != 0) {
      const modifierOperator = formatModifierOperator(constitutionHitPoints);
      const modifierNumber = formatModifierNumber(constitutionHitPoints);
      return `${hitPoints} (${hitDieQuantity}d${hitDieSize} ${modifierOperator} ${modifierNumber})`;
    } else {
      return `${hitPoints} (${hitDieQuantity}d${hitDieSize})`;
    }
  }
}

class HitPointsShowElements extends propertyLineSectionModule.PropertyLineShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
  }
}

class HitPointsEditElements extends propertyLineSectionModule.PropertyLineEditElements {
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
