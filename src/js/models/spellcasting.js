import SpellcasterTypes from '../data/spellcaster-types.js';
import { formatIntegerWithOrdinalIndicator, formatSpellSlotQuantity } from '../helpers/string-formatter.js';

export default class Spellcasting {
  constructor() {
    this.reset();
  }

  reset() {
    this.spellcasterType = 'innate';
    this.spellcasterAbility = 'charisma';
    this.spellcasterLevel = 1;

    this.spellCategories = [];
    for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
      this.spellCategories[spellLevel] = new SpellCategory(this, spellLevel);
    }
  }
}

class SpellCategory {
  constructor(spellcastingModel, spellLevel) {
    this.reset();

    this.spellcastingModel = spellcastingModel;
    this.level = spellLevel;
  }

  reset() {
    this.isEnabled = false;
    this.spells = [];
  }

  get name() {
    if (this.spellcastingModel.spellcasterType === 'innate') {
      switch(this.level) {
      case 0: return 'At will';
      case 1: return '3/day';
      case 2: return '2/day';
      case 3: return '1/day';
      default: return '';
      }
    } else {
      if (this.level === 0) {
        return 'Cantrips';
      }

      const spellLevelWithOrdinal = formatIntegerWithOrdinalIndicator(this.level);
      return `${spellLevelWithOrdinal} level`;
    }
  }

  get spellSlotQuantity() {
    const spellSlotQuantities = SpellcasterTypes[this.spellcastingModel.spellcasterType].levels[this.spellcastingModel.spellcasterLevel].spellSlots;
    return spellSlotQuantities[this.level - 1];
  }

  get title() {
    if (this.isEnabled) {
      if (this.spellcastingModel.spellcasterType !== 'innate' && this.level !== 0) {
        const formattedSlotQuantity = formatSpellSlotQuantity(this.spellSlotQuantity);
        return `${this.name} (${formattedSlotQuantity})`;
      }

      return this.name;
    }

    return '';
  }
}