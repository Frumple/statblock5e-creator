import Skills from './skills.js';
import { createHtmlPropertyLine, createHomebreweryPropertyLine } from '../helpers/export-helpers.js';

class Senses {
  constructor() {
    this.headingName = 'Senses';

    this.reset();
  }

  reset() {
    this.blindsight = null;
    this.darkvision = null;
    this.tremorsense = null;
    this.truesight = null;

    this.useCustomText = false;
    this.originalCustomText = '';
    this.htmlCustomText = '';
  }

  get passivePerception() {
    return Skills.skills['perception'].passiveScore;
  }

  get originalText() {
    if (this.useCustomText) {
      return this.originalCustomText;
    }

    return this.nonCustomText;
  }

  get htmlText() {
    if (this.useCustomText) {
      return this.htmlCustomText;
    }

    return this.nonCustomText;
  }

  get nonCustomText() {
    const unit = 'ft.';
    const list = [];

    if (this.blindsight != null) {
      list.push(`blindsight ${this.blindsight} ${unit}`);
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

  toJson() {
    if (this.useCustomText) {
      return {
        blindsight: null,
        darkvision: null,
        tremorsense: null,
        truesight: null,
        customText: this.originalCustomText
      };
    }

    return {
      blindsight: this.blindsight,
      darkvision: this.darkvision,
      tremorsense: this.tremorsense,
      truesight: this.truesight,
      customText: null
    };
  }

  toHtml() {
    return createHtmlPropertyLine(this.headingName, this.htmlText);
  }

  toHomebrewery() {
    return createHomebreweryPropertyLine(this.headingName, this.originalText);
  }
}

export default new Senses();