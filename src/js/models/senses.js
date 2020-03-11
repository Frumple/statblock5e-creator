import PropertyLineModel from './property-line-model.js';
import { convertToInteger } from '../helpers/number-helpers.js';

export default class Senses extends PropertyLineModel {
  constructor(skills) {
    super('Senses');

    this.skills = skills;

    this.reset();
  }

  reset() {
    this.blindsight = null;
    this.blindBeyondThisRadius = false;
    this.darkvision = null;
    this.tremorsense = null;
    this.truesight = null;

    this.useCustomText = false;
    this.customText = '';
    this.htmlCustomText = '';
  }

  get jsonPropertyNames() {
    return [
      'blindsight',
      'blindBeyondThisRadius',
      'darkvision',
      'tremorsense',
      'truesight',
      'useCustomText',
      'customText'
    ];
  }

  get passivePerception() {
    return this.skills.skills['perception'].passiveScore;
  }

  get text() {
    if (this.useCustomText) {
      return this.customText;
    }

    return this.normalText;
  }

  get htmlText() {
    if (this.useCustomText) {
      return this.htmlCustomText;
    }

    return this.normalText;
  }

  get normalText() {
    const unit = 'ft.';
    const list = [];

    if (this.blindsight != null) {
      const blindBeyondThisRadius = (this.blindBeyondThisRadius ? ' (blind beyond this radius)' : '');
      list.push(`blindsight ${this.blindsight} ${unit}${blindBeyondThisRadius}`);
    }
    if (this.darkvision != null) {
      list.push(`darkvision ${this.darkvision} ${unit}`);
    }
    if (this.tremorsense != null) {
      list.push(`tremorsense ${this.tremorsense} ${unit}`);
    }
    if (this.truesight != null) {
      list.push(`truesight ${this.truesight} ${unit}`);
    }

    list.push(`passive Perception ${this.passivePerception}`);

    return list.join(', ');
  }

  fromOpen5e(json) {
    this.reset();

    const text = json.senses;
    const values = {};
    let fallbackToCustomText = false;

    // If the senses text includes markdown emphasis characters, use custom text
    if (text.includes('*') || text.includes('_')) {
      fallbackToCustomText = true;

    // Otherwise, loop through and parse each comma-delimited token
    } else {
      const tokenRegex = /^(?<category>blindsight|darkvision|tremorsense|truesight)\s(?<range>\d+)\sft\.(?<blindBeyondThisRadius>\s\(blind beyond this radius\))*$/;
      const tokens = text.split(',');

      for (const token of tokens.map(token => token.trim())) {
        if (token.includes('passive Perception')) {
          continue;
        }

        const matches = token.match(tokenRegex);

        // If the token has valid syntax, parse the category, range, and if "blind beyond this radius" is present
        if (matches !== null) {
          const category = matches.groups.category;
          const range = matches.groups.range;
          const blindBeyondThisRadius = matches.groups.blindBeyondThisRadius === ' (blind beyond this radius)';

          values[category] = convertToInteger(range);
          if (blindBeyondThisRadius) {
            values.blindBeyondThisRadius = true;
          }

        // Otherwise, stop looping through tokens and use custom text
        } else {
          fallbackToCustomText = true;
          break;
        }
      }
    }

    if (fallbackToCustomText) {
      this.useCustomText = true;
      this.customText = text;
    } else {
      Object.assign(this, values);
    }
  }
}