import { createHtmlPropertyLine, createHomebreweryPropertyLine } from '../helpers/export-helpers.js';

export default class Senses {
  constructor(skills) {
    this.skills = skills;

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
    return this.skills.skills['perception'].passiveScore;
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
    return {
      blindsight: this.blindsight,
      darkvision: this.darkvision,
      tremorsense: this.tremorsense,
      truesight: this.truesight,
      useCustomText: this.useCustomText,
      customText: this.originalCustomText
    };
  }

  toHtml() {
    return createHtmlPropertyLine(this.headingName, this.htmlText);
  }

  toHomebrewery() {
    return createHomebreweryPropertyLine(this.headingName, this.originalText);
  }
}