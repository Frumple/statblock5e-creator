import SpellcasterTypes from '../data/spellcaster-types.js';
import { formatIntegerWithOrdinalIndicator, formatSpellSlotQuantity } from '../helpers/string-formatter.js';

export default class Spellcasting {
  constructor() {
    this.spellCategories = [];
    for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
      this.spellCategories[spellLevel] = new SpellCategory(this, spellLevel);
    }

    this.reset();
  }

  reset() {
    this.spellcasterType = 'innate';
    this.spellcasterAbility = 'charisma';
    this.spellcasterLevel = 1;

    this.clearAllSpells();
  }

  clearAllSpells() {
    for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
      this.spellCategories[spellLevel].reset();
    }
  }

  get spellSlotQuantities() {
    if (this.spellcasterType === 'innate') {
      return [0,0,0];
    }

    return SpellcasterTypes[this.spellcasterType].levels[this.spellcasterLevel].spellSlots;
  }
}

class SpellCategory {
  constructor(spellcastingModel, spellLevel) {
    this.spellcastingModel = spellcastingModel;
    this.level = spellLevel;
    this.spells = [];

    this.reset();
  }

  reset() {
    this.spells.splice(0);
  }

  get isEnabled() {
    return (this.level <= this.spellcastingModel.spellSlotQuantities.length);
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
    return this.spellcastingModel.spellSlotQuantities[this.level - 1];
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