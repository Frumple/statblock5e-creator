import PropertyLineModel from './property-line-model.js';
import { formatModifierOperator, formatModifierNumber } from '../helpers/string-formatter.js';
import { convertToInteger } from '../helpers/number-helpers.js';

export default class HitPoints extends PropertyLineModel {
  constructor(abilities) {
    super('Hit Points');

    this.abilities = abilities;

    this.reset();
  }

  reset() {
    this._hitPoints = 4;
    this.useHitDie = true;
    this.hitDieQuantity = 1;
    this.hitDieSize = 8;
  }

  get jsonPropertyNames() {
    return [
      'hitPoints',
      'useHitDie',
      'hitDieQuantity',
      'hitDieSize'
    ];
  }

  get hitDieAverage() {
    return (this.hitDieSize / 2) + 0.5;
  }

  get constitutionHitPoints() {
    const constitutionModifier = this.abilities.abilities['constitution'].modifier;
    return this.hitDieQuantity * constitutionModifier;
  }

  set hitPoints(hitPoints) {
    this._hitPoints = hitPoints;
  }

  get hitPoints() {
    if (this.useHitDie) {
      const hp = Math.floor(this.hitDieQuantity * this.hitDieAverage) + this.constitutionHitPoints;
      this._hitPoints = Math.max(0, hp);
    }

    return this._hitPoints;
  }

  get text() {
    if (this.useHitDie) {
      return this.textWithHitDie;
    }

    return this.hitPoints;
  }

  get htmlText() {
    return this.text;
  }

  get textWithHitDie() {
    if (this.constitutionHitPoints != 0) {
      return `${this.hitPoints} (${this.hitDieQuantity}d${this.hitDieSize} ${this.constitutionHitPointsText})`;
    } else {
      return `${this.hitPoints} (${this.hitDieQuantity}d${this.hitDieSize})`;
    }
  }

  get constitutionHitPointsText() {
    const constitutionHitPoints = this.constitutionHitPoints;
    const modifierOperator = formatModifierOperator(constitutionHitPoints);
    const modifierNumber = formatModifierNumber(constitutionHitPoints);

    return `${modifierOperator} ${modifierNumber}`;
  }

  fromOpen5e(json) {
    this.reset();

    const hitDice = json['hit_dice'];
    const hitDiceTokens = hitDice.split(/[+d]/);

    this.useHitDie = true;
    this.hitDieQuantity = convertToInteger(hitDiceTokens[0]);
    this.hitDieSize = convertToInteger(hitDiceTokens[1]);
  }
}