import { parseAll } from '../parsers/parser.js';

export default class Attack {
  constructor(jsObject = null) {
    this.reset();

    if (jsObject) {
      this.populateFromJsObject(jsObject);
    }
  }

  reset(isMeleeEnabled = true) {
    this.name = '';
    this.isFinesse = false;

    this._reach = 5;
    this._normalRange = 20;
    this._longRange = 60;

    this.damageCategories = {
      melee: new DamageCategory( {isEnabled: isMeleeEnabled} ),
      ranged: new DamageCategory(),
      versatile: new DamageCategory(),
      bonus: new DamageCategory()
    };
  }

  populateFromJsObject(jsObject) {
    if (jsObject.name) { this.name = jsObject.name; }
    if (jsObject.isFinesse) { this.isFinesse = jsObject.isFinesse; }

    if (jsObject.reach) { this.reach = jsObject.reach; }
    if (jsObject.normalRange) { this.normalRange = jsObject.normalRange; }
    if (jsObject.longRange) { this.longRange = jsObject.longRange; }

    for (const categoryKey in this.damageCategories) {
      const categoryJsObject = jsObject.damageCategories[categoryKey] ? jsObject.damageCategories[categoryKey] : null;
      if (categoryJsObject) {
        this.damageCategories[categoryKey].populateFromJsObject(categoryJsObject);
      }
    }
  }

  get damageCategoryKeys() {
    return Object.keys(this.damageCategories);
  }

  get damageCategoryEntries() {
    return Object.entries(this.damageCategories);
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
    const rangedDamageCategory = this.damageCategories['ranged'];
    const versatileDamageCategory = this.damageCategories['versatile'];
    const bonusDamageCategory = this.damageCategories['bonus'];

    if (meleeDamageCategory.isEnabled || rangedDamageCategory.isEnabled) {
      const parserAbilityModifier = this.generatedTextParserAbilityModifier(meleeDamageCategory.isEnabled, rangedDamageCategory.isEnabled);

      const attackType = this.generatedTextAttackType(meleeDamageCategory.isEnabled, rangedDamageCategory.isEnabled);
      const toHit = this.generatedTextToHit(parserAbilityModifier);
      const reachOrRange = this.generatedTextReachOrRange(meleeDamageCategory.isEnabled, rangedDamageCategory.isEnabled);
      const damage = this.generatedTextDamage(meleeDamageCategory, rangedDamageCategory, versatileDamageCategory, bonusDamageCategory, parserAbilityModifier);

      return `*${attackType}:* ${toHit}, ${reachOrRange}, one target. *Hit:* ${damage}.`;
    }

    return '';
  }

  generatedTextParserAbilityModifier(isMeleeEnabled, isRangedEnabled) {
    if (this.isFinesse) {
      return 'FIN';
    }

    if (isMeleeEnabled) {
      return 'STR';
    } else if (isRangedEnabled) {
      return 'DEX';
    }

    return '';
  }

  generatedTextAttackType(isMeleeEnabled, isRangedEnabled) {
    if (isMeleeEnabled && isRangedEnabled) {
      return 'Melee or Ranged Weapon Attack';
    } else if (isMeleeEnabled) {
      return 'Melee Weapon Attack';
    } else if (isRangedEnabled) {
      return 'Ranged Weapon Attack';
    }

    return '';
  }

  generatedTextToHit(parserAbilityModifier) {
    return `ATK[${parserAbilityModifier}] to hit`;
  }

  generatedTextReachOrRange(isMeleeEnabled, isRangedEnabled) {
    if (isMeleeEnabled && isRangedEnabled) {
      return `reach ${this.reach} ft. or range ${this.normalRange}/${this.longRange} ft.`;
    } else if (isMeleeEnabled) {
      return `reach ${this.reach} ft.`;
    } else if (isRangedEnabled) {
      return `range ${this.normalRange}/${this.longRange} ft.`;
    }

    return '';
  }

  generatedTextDamage(meleeDamageCategory, rangedDamageCategory, versatileDamageCategory, bonusDamageCategory, parserAbilityModifier) {
    const areMeleeAndRangedEnabled = meleeDamageCategory.isEnabled && rangedDamageCategory.isEnabled;
    const meleeMatchesRanged = meleeDamageCategory.hasSameValuesWith(rangedDamageCategory);

    const meleeRangedDamage = this.generatedTextMeleeRangedDamage(meleeDamageCategory, rangedDamageCategory, parserAbilityModifier);
    const versatileDamage = this.generatedTextVersatileDamage(versatileDamageCategory, parserAbilityModifier, areMeleeAndRangedEnabled);
    const bonusDamage = this.generatedTextBonusDamage(bonusDamageCategory, versatileDamageCategory.isEnabled, areMeleeAndRangedEnabled, meleeMatchesRanged);

    return `${meleeRangedDamage}${versatileDamage}${bonusDamage}`;
  }

  generatedTextMeleeRangedDamage(meleeDamageCategory, rangedDamageCategory, parserAbilityModifier) {
    if (meleeDamageCategory.isEnabled && rangedDamageCategory.isEnabled) {
      const meleeDamageText = meleeDamageCategory.generateDamageText(parserAbilityModifier);

      if (meleeDamageCategory.hasSameValuesWith(rangedDamageCategory)) {
        return meleeDamageText;
      }

      const rangedDamageText = rangedDamageCategory.generateDamageText(parserAbilityModifier);
      return `${meleeDamageText} in melee or ${rangedDamageText} at range`;
    } else if (meleeDamageCategory.isEnabled) {
      return meleeDamageCategory.generateDamageText(parserAbilityModifier);
    } else if (rangedDamageCategory.isEnabled) {
      return rangedDamageCategory.generateDamageText(parserAbilityModifier);
    }

    return '';
  }

  generatedTextVersatileDamage(versatileDamageCategory, parserAbilityModifier, areMeleeAndRangedEnabled) {
    if (versatileDamageCategory.isEnabled) {
      const versatileDamageText = versatileDamageCategory.generateDamageText(parserAbilityModifier);
      const toMakeAMeleeAttack = areMeleeAndRangedEnabled ? ' to make a melee attack' : '';

      return `, or ${versatileDamageText} if used with two hands${toMakeAMeleeAttack}`;
    }

    return '';
  }

  generatedTextBonusDamage(bonusDamageCategory, isVersatileEnabled, areMeleeAndRangedEnabled, meleeMatchesRanged) {
    if (bonusDamageCategory.isEnabled) {
      const bonusDamageComma = (isVersatileEnabled || (areMeleeAndRangedEnabled && ! meleeMatchesRanged)) ? ',' : '';
      const bonusDamageText = bonusDamageCategory.generateDamageText();
      return `${bonusDamageComma} plus ${bonusDamageText}`;
    }

    return '';
  }

  renderText(generatedText) {
    if (generatedText === '') {
      return '';
    }

    const parserResults = parseAll(generatedText, false);

    if (parserResults.mathParserResults.error) {
      return 'Error: Generated text has at least one invalid math expression.';
    } else if (parserResults.markdownParserResults.error) {
      return 'Error: Generated text has invalid markdown syntax.';
    }

    return parserResults.text;
  }
}

class DamageCategory {
  constructor(jsObject = null) {
    this.reset();

    if (jsObject) {
      this.populateFromJsObject(jsObject);
    }
  }

  reset() {
    this.isEnabled = false;
    this.damageType = '';
    this.damageDieQuantity = 1;
    this.damageDieSize = 8;
  }

  populateFromJsObject(jsObject) {
    if (jsObject.isEnabled) { this.isEnabled = jsObject.isEnabled; }
    if (jsObject.damageType) { this.damageType = jsObject.damageType; }
    if (jsObject.damageDieQuantity) { this.damageDieQuantity = jsObject.damageDieQuantity; }
    if (jsObject.damageDieSize) { this.damageDieSize = jsObject.damageDieSize; }
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

  generateDamageText(parserAbilityModifier) {
    const damageType = this.damageType ? ` ${this.damageType}` : '';

    if (this.damageDieSize === 1) {
      const damageAmount = this.damageDieQuantity * this.damageDieSize;
      return `${damageAmount}${damageType} damage`;
    }

    if (parserAbilityModifier) {
      return `DMG[${this.damageDieQuantity}d${this.damageDieSize} + ${parserAbilityModifier}]${damageType} damage`;
    }
    return `DMG[${this.damageDieQuantity}d${this.damageDieSize}]${damageType} damage`;
  }

  hasSameValuesWith(otherDamageCategory) {
    return this.damageType === otherDamageCategory.damageType &&
           this.damageDieQuantity === otherDamageCategory.damageDieQuantity &&
           this.damageDieSize === otherDamageCategory.damageDieSize;
  }
}