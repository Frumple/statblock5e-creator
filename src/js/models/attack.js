import Abilities from './abilities.js';
import * as Parser from '../parsers/parser.js';

export default class Attack {
  constructor() {
    this.reset();
  }

  reset() {
    this.weaponName = '';
    this.isFinesse = false;

    this.damageCategories = {
      melee: new DamageCategory(true),
      ranged: new DamageCategory(),
      versatile: new DamageCategory(),
      bonus: new DamageCategory()
    };

    this._reach = 5;
    this._normalRange = 0;
    this._longRange = 0;
  }

  get damageCategoryKeys() {
    return Object.keys(this.damageCategories);
  }

  set reach(value) {
    this._reach = value;
  }

  get reach() {
    return this._reach ? this._reach : 0;
  }

  set normalRange(value) {
    this._normalRange = value;
  }

  get normalRange() {
    return this._normalRange ? this._normalRange : 0;
  }

  set longRange(value) {
    this._longRange = value;
  }

  get longRange() {
    return this._longRange ? this._longRange : 0;
  }

  get generatedText() {
    const meleeDamageCategory = this.damageCategories['melee'];
    // const rangedDamageCategory = this.damageCategories['ranged'];
    const versatileDamageCategory = this.damageCategories['versatile'];
    const bonusDamageCategory = this.damageCategories['bonus'];

    if (meleeDamageCategory) {
      const strModifier = Abilities.abilities['strength'].modifier;
      const dexModifier = Abilities.abilities['dexterity'].modifier;

      const modifierVariable = (this.isFinesse && dexModifier > strModifier) ? 'dexmod' : 'strmod';

      const toHit = `mod{${modifierVariable} + prof} to hit`;
      const reach = `reach ${this.reach} ft.`;
      const damage = `${meleeDamageCategory.generateDamageText(modifierVariable)}`;
      const versatileDamage = versatileDamageCategory.isEnabled ? `, or ${versatileDamageCategory.generateDamageText(modifierVariable)} if used with two hands` : '';

      const bonusDamageComma = versatileDamageCategory.isEnabled ? ',' : '';
      const bonusDamage = bonusDamageCategory.isEnabled ? `${bonusDamageComma} plus ${bonusDamageCategory.generateDamageText()}` : '';

      return `*Melee Weapon Attack:* ${toHit}, ${reach}, one target. *Hit:* ${damage}${versatileDamage}${bonusDamage}.`;
    }

    return '';
  }

  renderText(generatedText) {
    const mathParserResults = Parser.parseMath(generatedText);

    if (mathParserResults.error) {
      return 'Error: Generated text has at least one invalid math expression.';
    }

    const markdownParserResults = Parser.parseMarkdown(mathParserResults.outputText);

    if (markdownParserResults.error) {
      return 'Error: Generated text has invalid markdown syntax.';
    }

    return markdownParserResults.outputText;
  }
}

class DamageCategory {
  constructor(isEnabled = false, damageType = '', damageDieQuantity = 1, damageDieSize = 8) {
    this.isEnabled = isEnabled;
    this.damageType = damageType;
    this._damageDieQuantity = damageDieQuantity;
    this._damageDieSize = damageDieSize;
  }

  set damageDieQuantity(value) {
    this._damageDieQuantity = value;
  }

  get damageDieQuantity() {
    return this._damageDieQuantity ? this._damageDieQuantity : 1;
  }

  set damageDieSize(value) {
    this._damageDieSize = value;
  }

  get damageDieSize() {
    return this._damageDieSize ? this. _damageDieSize : 0;
  }

  generateDamageText(abilityModifierVariable) {
    const damageType = this.damageType ? ` ${this.damageType}` : '';
    if (abilityModifierVariable) {
      return `dmg{${this.damageDieQuantity}d${this.damageDieSize} + ${abilityModifierVariable}}${damageType} damage`;
    }
    return `dmg{${this.damageDieQuantity}d${this.damageDieSize}}${damageType} damage`;
  }
}