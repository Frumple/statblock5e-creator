import CustomDialog from './custom-dialog.js';
import Attack from '../../../models/attack.js';

export default class GenerateAttackDialog extends CustomDialog {
  static get elementName() { return 'generate-attack-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'generate-attack-dialog',
      'src/html/elements/autonomous/dialogs/generate-attack-dialog.html');
  }

  constructor(parent = null) {
    super(GenerateAttackDialog.templatePaths, parent);

    this.attackModel = new Attack();

    this.weaponNameInput = this.shadowRoot.getElementById('weapon-name-input');
    this.finesseInput = this.shadowRoot.getElementById('finesse-input');

    this.damageCategoryInputs = {};

    for (const key of this.attackModel.damageCategoryKeys) {
      this.damageCategoryInputs[key] = {
        enabled: this.shadowRoot.getElementById(`${key}-enabled-input`),
        damageType: this.shadowRoot.getElementById(`${key}-damage-type-input`),
        damageDieQuantity: this.shadowRoot.getElementById(`${key}-damage-die-quantity-input`),
        damageDieSize: this.shadowRoot.getElementById(`${key}-damage-die-size-input`)
      };
    }

    this.reachInput = this.shadowRoot.getElementById('reach-input');
    this.normalRangeInput = this.shadowRoot.getElementById('normal-range-input');
    this.longRangeInput = this.shadowRoot.getElementById('long-range-input');

    this.generatedTextElement = this.shadowRoot.getElementById('generated-text');
    this.renderedTextElement = this.shadowRoot.getElementById('rendered-text');

    this.cancelButton = this.shadowRoot.getElementById('cancel-button');
    this.resetButton = this.shadowRoot.getElementById('reset-button');
    this.generateAttackButton = this.shadowRoot.getElementById('generate-attack-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      for (const key of this.attackModel.damageCategoryKeys) {
        const category = this.damageCategoryInputs[key];

        const enabledElements = [
          category.damageType,
          category.damageDieQuantity,
          category.damageDieSize
        ];

        if (key === 'melee') {
          enabledElements.push(this.reachInput);
        } else if(key === 'ranged') {
          enabledElements.push(this.normalRangeInput);
          enabledElements.push(this.longRangeInput);
        }

        category.enabled.enableElementsWhenChecked(...enabledElements);

        category.enabled.addEventListener('input', this.onInputDamageCategoryEnabled.bind(this, key));
        category.damageType.addEventListener('input', this.onInputDamageCategoryDamageType.bind(this, key));
        category.damageDieQuantity.addEventListener('input', this.onInputDamageCategoryDamageDieQuantity.bind(this, key));
        category.damageDieSize.addEventListener('input', this.onInputDamageCategoryDamageDieSize.bind(this, key));
      }

      this.weaponNameInput.addEventListener('input', this.onInputWeaponName.bind(this));
      this.finesseInput.addEventListener('input', this.onInputFinesse.bind(this));

      this.reachInput.addEventListener('input', this.onInputReach.bind(this));
      this.normalRangeInput.addEventListener('input', this.onInputNormalRange.bind(this));
      this.longRangeInput.addEventListener('input', this.onInputLongRange.bind(this));

      this.cancelButton.addEventListener('click', this.onClickCloseButton.bind(this));
      this.resetButton.addEventListener('click', this.onClickResetButton.bind(this));
      this.generateAttackButton.addEventListener('click', this.onClickGenerateAttackButton.bind(this));

      this.isInitialized = true;

      this.update();
    }
  }

  onInputWeaponName() {
    this.attackModel.weaponName = this.weaponNameInput.value;
    this.update();
  }

  onInputDamageCategoryEnabled(key) {
    this.attackModel.damageCategories[key].isEnabled = this.damageCategoryInputs[key].enabled.checked;
    this.update();
  }

  onInputDamageCategoryDamageType(key) {
    this.attackModel.damageCategories[key].damageType = this.damageCategoryInputs[key].damageType.value;
    this.update();
  }

  onInputDamageCategoryDamageDieQuantity(key) {
    this.attackModel.damageCategories[key].damageDieQuantity = this.damageCategoryInputs[key].damageDieQuantity.value;
    this.update();
  }

  onInputDamageCategoryDamageDieSize(key) {
    this.attackModel.damageCategories[key].damageDieSize = this.damageCategoryInputs[key].damageDieSize.value;
    this.update();
  }

  onInputReach() {
    this.attackModel.reach = this.reachInput.value;
    this.update();
  }

  onInputFinesse() {
    this.attackModel.isFinesse = this.finesseInput.checked;
    this.update();
  }

  onInputNormalRange() {
    this.attackModel.normalRange = this.normalRangeInput.value;
    this.update();
  }

  onInputLongRange() {
    this.attackModel.longRange = this.longRangeInput.value;
    this.update();
  }

  onClickResetButton() {
    this.reset();
  }

  onClickGenerateAttackButton() {
    const generateAttackEvent = new CustomEvent('generateAttack', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.attackModel.weaponName,
        text: this.attackModel.generatedText
      }
    });
    this.dispatchEvent(generateAttackEvent);

    this.closeModal();
    this.reset();
  }

  get generatedText() {
    return this.generatedTextElement.textContent;
  }

  get renderedText() {
    return this.renderedTextElement.innerHTMLSanitized;
  }

  launch() {
    this.showModal();
  }

  reset() {
    this.attackModel.reset();
    this.populateFieldsFromModel(this.attackModel);
    this.update();
  }

  populateFieldsFromModel(model) {
    this.weaponNameInput.value = model.weaponName;
    this.finesseInput.checked = model.isFinesse;

    for (const key of model.damageCategoryKeys) {
      const categoryModel = model.damageCategories[key];
      const categoryInputs = this.damageCategoryInputs[key];

      categoryInputs.enabled.checked = categoryModel.isEnabled;
      categoryInputs.enabled.dispatchEvent(new Event('input'));

      categoryInputs.damageType.value = categoryModel.damageType;
      categoryInputs.damageDieQuantity.value = categoryModel.damageDieQuantity;
      categoryInputs.damageDieSize.value = categoryModel.damageDieSize;
    }

    this.reachInput.value = model.reach;
    this.normalRangeInput.value = model.normalRange;
    this.longRangeInput.value = model.longRange;
  }

  update() {
    const generatedText = this.attackModel.generatedText;

    this.generatedTextElement.textContent = generatedText;
    this.renderedTextElement.innerHTMLSanitized = this.attackModel.renderText(generatedText);
  }
}