import Skills from './skills.js';
import { createPropertyLine } from '../helpers/export-helpers.js';

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
    this.parsedCustomText = '';
  }

  get passivePerception() {
    return Skills.skills['perception'].passiveScore;
  }

  get normalText() {
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

  get htmlText() {
    if (this.useCustomText) {
      return this.parsedCustomText;
    }

    return this.normalText;
  }

  toHtml() {
    return createPropertyLine(this.headingName, this.htmlText);
  }
}

export default new Senses();