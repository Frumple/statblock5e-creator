import Abilities from './abilities.js';
import { formatModifierOperator, formatModifierNumber } from '../helpers/string-formatter.js';
import { createPropertyLine } from '../helpers/export-helpers.js';

class HitPoints {
  constructor() {
    this.headingName = 'Hit Points';

    this.reset();
  }

  reset() {
    this._hitPoints = 4;
    this.useHitDie = true;
    this.hitDieQuantity = 1;
    this.hitDieSize = 8;
  }

  get hitDieAverage() {
    return (this.hitDieSize / 2) + 0.5;
  }

  get constitutionHitPoints() {
    const constitutionModifier = Abilities.abilities['constitution'].modifier;
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

  toHtml() {
    return createPropertyLine(this.headingName, this.text);
  }
}

export default new HitPoints();