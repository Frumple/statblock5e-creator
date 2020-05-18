import SpellcasterTypes from '../data/spellcaster-types.js';

import CurrentContext from '../models/current-context.js';

import { capitalizeFirstLetter, formatIntegerWithOrdinalIndicator, formatSpellSlotQuantity } from '../helpers/string-formatter.js';

import { parse } from '../parsers/parser.js';

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

  get blockName() {
    return (this.spellcasterType === 'innate') ? 'Innate Spellcasting' : 'Spellcasting';
  }

  get spellSlotQuantities() {
    return (this.spellcasterType === 'innate') ? [0,0,0] :SpellcasterTypes[this.spellcasterType].levels[this.spellcasterLevel].spellSlots;
  }

  get generatedText() {
    const type = this.spellcasterType;
    const ability = capitalizeFirstLetter(this.spellcasterAbility);
    const abilityAbbreviation = CurrentContext.creature.abilities.abilities[this.spellcasterAbility].abbreviation;
    const level = formatIntegerWithOrdinalIndicator(this.spellcasterLevel);

    const spells = this.spellCategories.map(category => category.generatedText).filter(text => text !== '').join('\n');

    return `[name] is a ${level}-level spellcaster. Its spellcasting ability is ${ability} (spell save DC sdc[${abilityAbbreviation}], atk[${abilityAbbreviation}] to hit with spell attacks). [name] has the following ${type} spells prepared:\n\n${spells}`;
  }

  renderText(generatedText) {
    if (generatedText === '') {
      return '';
    }

    const parserResults = parse(generatedText);

    if (parserResults.nameParserResults.error) {
      return 'Error: Generated text has at least one invalid name expression.';
    } else if (parserResults.mathParserResults.error) {
      return 'Error: Generated text has at least one invalid math expression.';
    } else if (parserResults.markdownParserResults.error) {
      return 'Error: Generated text has invalid markdown syntax.';
    }

    return parserResults.text;
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

  get title() {
    if (! this.isEnabled) {
      return '';
    }

    if (this.spellcastingModel.spellcasterType === 'innate') {
      switch(this.level) {
      case 0: return 'At will';
      case 1: return '3/day each';
      case 2: return '2/day each';
      case 3: return '1/day each';
      default: return '';
      }
    }

    if (this.level === 0) {
      return 'Cantrips (at will)';
    }

    const spellLevelWithOrdinal = formatIntegerWithOrdinalIndicator(this.level);
    const formattedSlotQuantity = formatSpellSlotQuantity(this.spellSlotQuantity);
    return `${spellLevelWithOrdinal} level (${formattedSlotQuantity})`;
  }

  get spellSlotQuantity() {
    return this.spellcastingModel.spellSlotQuantities[this.level - 1];
  }

  get generatedText() {
    if (! this.isEnabled || this.spells.length === 0) {
      return '';
    }

    const spellsAsText = this.spells.map(spell => `*${spell}*`).join(', ');
    return `${this.title}: ${spellsAsText}`;
  }
}