import SpellcasterTypes from '../data/spellcaster-types.js';
import Spells from '../data/spells.js';

import CurrentContext from '../models/current-context.js';

import { capitalizeFirstLetter, formatIntegerWithOrdinalIndicator, formatSpellSlotQuantity } from '../helpers/string-formatter.js';

import { parseAll } from '../parsers/parser.js';

export default class Spellcasting {
  constructor() {
    this.spellCategories = [];
    for (let spellLevel = 0; spellLevel <= 9; spellLevel++) {
      this.spellCategories[spellLevel] = new SpellCategory(this, spellLevel);
    }

    this.reset();
  }

  reset() {
    this.spellcasterType = 'generic';
    this.spellcasterAbility = 'charisma';
    this.spellcasterLevel = 1;

    this.requiresVerbalComponents = true;
    this.requiresSomaticComponents = true;
    this.requiresMaterialComponents = true;

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
    if (this.spellcasterType === 'innate') {
      return [0,0,0];
    }

    if (this.spellcasterType === 'generic') {
      return [0,0,0,0,0,0,0,0,0];
    }

    return SpellcasterTypes[this.spellcasterType].levels[this.spellcasterLevel].spellSlots;
  }

  get currentCantripCount() {
    if (this.spellcasterType === 'innate') {
      return 0;
    }

    return this.spellCategories[0].spells.length;
  }

  get knownCantripCount() {
    const spellcaster = SpellcasterTypes[this.spellcasterType];

    if (this.spellcasterType === 'innate' ||
        this.spellcasterType === 'generic' ||
        ! spellcaster.hasCantrips) {
      return 0;
    }
    return spellcaster.levels[this.spellcasterLevel].knownCantripCount;
  }

  get currentSpellCount() {
    const minimumSpellLevel = (this.spellcasterType === 'innate') ? 0 : 1;
    let spellCategories = this.spellCategories
      .filter(category => (category.level >= minimumSpellLevel) && category.isEnabled);

    // Do not include Warlock Mystic Arcanum spells that are levels 6 to 9 in the spell count
    if (this.spellcasterType === 'warlock') {
      spellCategories = spellCategories.filter(category => (category.level <= 5));
    }

    return spellCategories
      .map(category => category.spells.length)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  get preparedSpellCount() {
    if (this.spellcasterType === 'innate' || this.spellcasterType === 'generic') {
      return 0;
    }

    const spellcaster = SpellcasterTypes[this.spellcasterType];

    switch(spellcaster.spellCountMethod) {
    case 'fixed':
      return spellcaster.levels[this.spellcasterLevel].fixedSpellCount;
    case 'abilityModPlusLevel':
      return CurrentContext.creature.abilities.abilities[this.spellcasterAbility].modifier + this.spellcasterLevel;
    case 'abilityModPlusHalfLevel':
      return Math.floor(CurrentContext.creature.abilities.abilities[this.spellcasterAbility].modifier + (this.spellcasterLevel / 2));
    default:
      return 0;
    }
  }

  get generatedText() {
    const type = (this.spellcasterType === 'generic') ? '' : ` ${this.spellcasterType}`;
    const ability = capitalizeFirstLetter(this.spellcasterAbility);
    const abilityAbbreviation = CurrentContext.creature.abilities.abilities[this.spellcasterAbility].abbreviation.toUpperCase();
    const level = formatIntegerWithOrdinalIndicator(this.spellcasterLevel);

    const spells = this.spellCategories.map(category => category.generatedText).filter(text => text !== '').join('\n');

    const components = this.componentsText;

    if (this.spellcasterType === 'innate') {
      const requirements = components ? `, requiring ${components}` : '';
      return `[name]'s innate spellcasting ability is ${ability} (spell save DC SDC[${abilityAbbreviation}], ATK[${abilityAbbreviation}] to hit with spell attacks). It can innately cast the following spells${requirements}:\n\n${spells}`;
    }

    const requirements = components ? ` It requires ${components} to cast its spells.` : '';
    return `[name] is a ${level}-level spellcaster. Its spellcasting ability is ${ability} (spell save DC SDC[${abilityAbbreviation}], ATK[${abilityAbbreviation}] to hit with spell attacks).${requirements} [name] has the following${type} spells prepared:\n\n${spells}`;
  }

  get componentsText() {
    const numberOfComponentsRequired = this.requiresVerbalComponents + this.requiresSomaticComponents + this.requiresMaterialComponents;

    switch (numberOfComponentsRequired) {
    case 0:
      return 'no components';
    case 1:
      if (this.requiresVerbalComponents) {
        return 'only verbal components';
      } else if(this.requiresSomaticComponents) {
        return 'only somatic components';
      } else if(this.requiresMaterialComponents) {
        return 'only material components';
      }
      return '';
    case 2:
      if (! this.requiresVerbalComponents) {
        return 'no verbal components';
      } else if(! this.requiresSomaticComponents) {
        return 'no somatic components';
      } else if(! this.requiresMaterialComponents) {
        return 'no material components';
      }
      return '';
    default:
      return '';
    }
  }

  renderText(generatedText) {
    if (generatedText === '') {
      return '';
    }

    const parserResults = parseAll(generatedText);

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
    if (this.level === 0) {
      return SpellcasterTypes[this.spellcastingModel.spellcasterType].hasCantrips;
    }
    return (this.level <= this.spellcastingModel.spellSlotQuantities.length);
  }

  get title() {
    if (! this.isEnabled) {
      return '';
    }

    // Innate Spellcaster
    if (this.spellcastingModel.spellcasterType === 'innate') {
      switch(this.level) {
      case 0: return 'At will';
      case 1: return '3/day each';
      case 2: return '2/day each';
      case 3: return '1/day each';
      default: return '';
      }
    }

    // Cantrips
    if (this.level === 0) {
      return 'Cantrips (at will)';
    }

    const formattedSpellLevel = formatIntegerWithOrdinalIndicator(this.level);

    // Generic Levelled Spells without Slots
    if (this.spellcastingModel.spellcasterType === 'generic') {
      return `${formattedSpellLevel} level`;
    }

    // Warlock Mystic Arcanum Feature: Lavel 6 to 9 spells are available once per long rest
    if (this.spellcastingModel.spellcasterType === 'warlock' && this.level >= 6) {
      return `${formattedSpellLevel} level (1/long rest)`;
    }

    // Class-specific Levelled Spells with Slots
    const formattedSlotQuantity = formatSpellSlotQuantity(this.spellSlotQuantity);
    return `${formattedSpellLevel} level (${formattedSlotQuantity})`;
  }

  get spellSlotQuantity() {
    return this.spellcastingModel.spellSlotQuantities[this.level - 1];
  }

  get availableSpells() {
    const spellcasterType = this.spellcastingModel.spellcasterType;
    let spells = Spells;

    if (spellcasterType !== 'innate') {
      spells = spells.filter(spell => spell.level === this.level);

      if (spellcasterType !== 'generic') {
        spells = spells.filter(spell => spell.classes.includes(spellcasterType));
      }
    }

    return spells;
  }

  get generatedText() {
    if (! this.isEnabled || this.spells.length === 0) {
      return '';
    }

    const spellsAsText = this.spells.map(spell => `*${spell.toLowerCase()}*`).join(', ');
    return `${this.title}: ${spellsAsText}`;
  }
}