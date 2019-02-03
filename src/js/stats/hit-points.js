import Abilities from '/src/js/stats/abilities.js';

class HitPoints {
  constructor() {
    this._hitPoints = 4;
    this.useHitDie = true;
    this.hitDieQuantity = 1;
    this.hitDieSize = 8;
  }

  get hitDieAverage() {
    return (this.hitDieSize / 2) + 0.5;
  }

  get constitutionHitPoints() {
    let constitutionModifier = Abilities.abilities['constitution'].modifier;
    return this.hitDieQuantity * constitutionModifier;
  }

  set hitPoints(hitPoints) {
    this._hitPoints = hitPoints;
  }

  get hitPoints() {
    if (this.useHitDie) {      
      let hp = Math.floor(this.hitDieQuantity * this.hitDieAverage) + this.constitutionHitPoints;
      this._hitPoints = Math.max(0, hp);
    }

    return this._hitPoints;
  }
}

export default new HitPoints();