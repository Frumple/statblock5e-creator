import CustomDialog from './custom-dialog.js';

export default class GenerateAttackDialog extends CustomDialog {
  static get elementName() { return 'generate-attack-dialog'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'generate-attack-dialog',
      'src/html/elements/autonomous/dialogs/generate-attack-dialog.html');
  }

  constructor() {
    super(GenerateAttackDialog.templatePaths);

    this.weaponName = this.shadowRoot.getElementById('weapon-name-input');
    this.finesse = this.shadowRoot.getElementById('finesse-input');

    this.reach = this.shadowRoot.getElementById('reach-input');
    this.normalRange = this.shadowRoot.getElementById('normal-range-input');
    this.longRange = this.shadowRoot.getElementById('long-range-input');

    this.meleeEnabled = this.shadowRoot.getElementById('melee-enabled-input');
    this.meleeDamageType = this.shadowRoot.getElementById('melee-damage-type-input');
    this.meleeDamageDieQuantity = this.shadowRoot.getElementById('melee-damage-die-quantity-input');
    this.meleeDamageDieSize = this.shadowRoot.getElementById('melee-damage-die-size-input');

    this.rangedEnabled = this.shadowRoot.getElementById('ranged-enabled-input');
    this.rangedDamageType = this.shadowRoot.getElementById('ranged-damage-type-input');
    this.rangedDamageDieQuantity = this.shadowRoot.getElementById('ranged-damage-die-quantity-input');
    this.rangedDamageDieSize = this.shadowRoot.getElementById('ranged-damage-die-size-input');

    this.versatileEnabled = this.shadowRoot.getElementById('versatile-enabled-input');
    this.versatileDamageType = this.shadowRoot.getElementById('versatile-damage-type-input');
    this.versatileDamageDieQuantity = this.shadowRoot.getElementById('versatile-damage-die-quantity-input');
    this.versatileDamageDieSize = this.shadowRoot.getElementById('versatile-damage-die-size-input');

    this.bonusEnabled = this.shadowRoot.getElementById('bonus-enabled-input');
    this.bonusDamageType = this.shadowRoot.getElementById('bonus-damage-type-input');
    this.bonusDamageDieQuantity = this.shadowRoot.getElementById('bonus-damage-die-quantity-input');
    this.bonusDamageDieSize = this.shadowRoot.getElementById('bonus-damage-die-size-input');

    this.generatedText = this.shadowRoot.getElementById('generated-text');
    this.displayedText = this.shadowRoot.getElementById('displayed-text');

    this.cancelButton = this.shadowRoot.getElementById('cancel-button');
    this.generateAttackButton = this.shadowRoot.getElementById('generate-attack-button');
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      this.meleeEnabled.enableElementsWhenChecked(
        this.reach,
        this.meleeDamageType,
        this.meleeDamageDieQuantity,
        this.meleeDamageDieSize
      );

      this.rangedEnabled.enableElementsWhenChecked(
        this.normalRange,
        this.longRange,
        this.rangedDamageType,
        this.rangedDamageDieQuantity,
        this.rangedDamageDieSize
      );

      this.versatileEnabled.enableElementsWhenChecked(
        this.versatileDamageType,
        this.versatileDamageDieQuantity,
        this.versatileDamageDieSize
      );

      this.bonusEnabled.enableElementsWhenChecked(
        this.bonusDamageType,
        this.bonusDamageDieQuantity,
        this.bonusDamageDieSize
      );

      this.cancelButton.addEventListener('click', this.onClickCloseButton.bind(this));

      this.isInitialized = true;
    }
  }
}