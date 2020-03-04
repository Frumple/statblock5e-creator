import Model from './model.js';

import creatureSizes from '../data/creature-sizes.js';
import creatureTypes from '../data/creature-types.js';
import creatureAlignments from '../data/creature-alignments.js';

export default class Subtitle extends Model{
  constructor() {
    super();

    this.reset();
  }

  reset() {
    this.size = 'Medium';
    this.type = 'humanoid';
    this.tags = '';
    this.alignment = 'unaligned';

    this.useCustomText = false;
    this.customText = '';
  }

  get jsonPropertyNames() {
    return [
      'size',
      'type',
      'tags',
      'alignment',
      'useCustomText',
      'customText'
    ];
  }

  get text() {
    if (this.useCustomText) {
      return this.customText;
    }

    if (this.tags === '') {
      return `${this.size} ${this.type}, ${this.alignment}`;
    }

    return `${this.size} ${this.type} (${this.tags}), ${this.alignment}`;
  }

  fromOpen5e(json) {
    this.reset();

    // If the size, type, or alignment does not match the dropdown options, fallback to using custom text
    if (! (creatureSizes.includes(json.size) &&
           creatureTypes.includes(json.type) &&
           creatureAlignments.includes(json.alignment))) {
      this.useCustomText = true;
      if (json.subtype === '') {
        this.customText = `${json.size} ${json.type}, ${json.alignment}`;
      } else {
        this.customText = `${json.size} ${json.type} (${json.subtype.trim()}), ${json.alignment}`;
      }
    // Otherwise, set the size, type, tags, and alignment as normal
    } else {
      this.size = json.size;
      this.type = json.type;
      this.tags = json.subtype.trim();
      this.alignment = json.alignment;
    }
  }

  toHtml() {
    const subtitleElement = document.createElement('h2');
    subtitleElement.textContent = this.text;
    return subtitleElement;
  }

  toMarkdown() {
    return `>*${this.text}*`;
  }
}