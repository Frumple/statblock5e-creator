import Model from './model.js';

import creatureSizesToHitDieSizes from '../data/creature-sizes-to-hit-die-sizes.js';
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
    this.tags = 'any race';
    this.alignment = 'any alignment';

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

    return Subtitle.constructText(this.size, this.type, this.tags, this.alignment);
  }

  static constructText(size, type, tags, alignment) {
    if (tags === '') {
      return `${size} ${type}, ${alignment}`;
    }

    return `${size} ${type} (${tags}), ${alignment}`;
  }

  fromOpen5e(json) {
    this.reset();

    const size = json.size;
    const type = json.type;
    const subtype = json.subtype.trim();
    const alignment = json.alignment;

    // If the size, type, or alignment does not match the dropdown options, fallback to using custom text
    if (! (Object.keys(creatureSizesToHitDieSizes).includes(size) &&
           creatureTypes.includes(type) &&
           creatureAlignments.includes(alignment))) {
      this.useCustomText = true;
      this.customText = Subtitle.constructText(size, type, subtype, alignment);

    // Otherwise, set the size, type, tags, and alignment as normal
    } else {
      this.size = size;
      this.type = type;
      this.tags = subtype;
      this.alignment = alignment;
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