import Skills from './skills.js';
import { createHtmlPropertyLine, createHomebreweryPropertyLine } from '../helpers/export-helpers.js';

class Senses {
  constructor() {
    this.headingName = 'Senses';

    this.reset();
  }
  
  reset() {
    this.blindsight = NaN;
    this.darkvision = NaN;
    this.tremorsense = NaN;
    this.truesight = NaN;

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

    if (! isNaN(this.blindsight)) {
      list.push(`blindsight ${this.blindsight} ${unit}`);
    }
    if (! isNaN(this.darkvision)) {
      list.push(`darkvision ${this.darkvision} ${unit}`);
    }
    if (! isNaN(this.tremorsense)) {
      list.push(`tremorsense ${this.tremorsense} ${unit}`);
    }
    if (! isNaN(this.truesight)) {
      list.push(`truesight ${this.truesight} ${unit}`);
    }

    list.push(`passive Perception ${this.passivePerception}`);

    return list.join(', ');
  }

  toHtml() {
    return createHtmlPropertyLine(this.headingName, this.htmlText);
  }

  toHomebrewery() {
    return createHomebreweryPropertyLine(this.headingName, this.originalText);
  }
}

export default new Senses();