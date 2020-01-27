import * as propertyLineSectionModule from './property-line-section.js';
import CurrentContext from '../../../models/current-context.js';

export default class HitPointsSection extends propertyLineSectionModule.PropertyLineSection {
  static get elementName() { return 'hit-points-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'hit-points-section',
      'src/html/elements/autonomous/sections/hit-points-section.html');
  }

  constructor() {
    super(HitPointsSection.templatePaths,
          'hitPoints',
          HitPointsShowElements,
          HitPointsEditElements);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

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
    this.updateModelHitPoints();
    this.updateView();
  }

  onInputUseHitDie() {
    this.updateModelUseHitDie();
    this.updateView();
  }

  onInputHitDieQuantity() {
    this.updateModelHitDieQuantity();
    this.updateView();
  }

  onInputHitDieSize() {
    this.updateModelHitDieSize();
    this.updateView();
  }

  checkForErrors() {
    if (CurrentContext.creature.hitPoints.useHitDie) {
      this.editElements.hitDieQuantity.validate(this.errorMessages);
    } else {
      this.editElements.hitPoints.validate(this.errorMessages);
    }
  }

  updateModel() {
    this.updateModelHitPoints();
    this.updateModelUseHitDie();
    this.updateModelHitDieQuantity();
    this.updateModelHitDieSize();
  }

  updateModelHitPoints() {
    const hitPoints = this.editElements.hitPoints.valueAsInt;

    if (hitPoints !== null) {
      CurrentContext.creature.hitPoints.hitPoints = hitPoints;
    }
  }

  updateModelUseHitDie() {
    CurrentContext.creature.hitPoints.useHitDie = this.editElements.useHitDie.checked;
  }

  updateModelHitDieQuantity() {
    const hitDieQuantity = this.editElements.hitDieQuantity.valueAsInt;

    if (hitDieQuantity !== null) {
      CurrentContext.creature.hitPoints.hitDieQuantity = hitDieQuantity;
    }
  }

  updateModelHitDieSize() {
    const hitDieSize = this.editElements.hitDieSize.valueAsInt;

    if (hitDieSize !== null) {
      CurrentContext.creature.hitPoints.hitDieSize = hitDieSize;
    }
  }

  updateEditModeView() {
    const hitPointsModel = CurrentContext.creature.hitPoints;
    this.editElements.hitPoints.value = hitPointsModel.hitPoints;
    this.editElements.useHitDie.checked = hitPointsModel.useHitDie;
    this.editElements.hitDieQuantity.value = hitPointsModel.hitDieQuantity;
    this.editElements.hitDieSize.value = hitPointsModel.hitDieSize;
    this.editElements.constitutionHitPoints.textContent = hitPointsModel.constitutionHitPointsText;
  }

  updateShowModeView() {
    this.showElements.text.textContent = CurrentContext.creature.hitPoints.text;
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
    this.constitutionHitPoints = shadowRoot.getElementById('constitution-hit-points-value-label');
  }

  get initiallySelectedElement() {
    if (this.useHitDie.checked) {
      return this.hitDieQuantity;
    }
    return this.hitPoints;
  }
}
