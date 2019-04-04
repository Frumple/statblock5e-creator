import * as ExportHelpers from '../helpers/export-helpers.js';

class Speed {
  constructor() {
    this.headingName = 'Speed';

    this.reset();
  }

  reset() {
    this.walk = 30;
    this.burrow = NaN;
    this.climb = NaN;
    this.fly = NaN;
    this.hover = false;
    this.swim = NaN;

    this.useCustomText = false;
    this.originalCustomText = '';
    this.parsedCustomText = '';
  }

  get originalText() {
    if (this.useCustomText) {
      return this.originalCustomText;
    }

    return this.nonCustomText;
  }

  get parsedText() {
    if (this.useCustomText) {
      return this.parsedCustomText;
    }

    return this.nonCustomText;
  }

  get nonCustomText() {
    const unit = 'ft.';
    const list = [];
    const walk = (this.walk ? this.walk : 0);

    list.push(`${walk} ${unit}`);

    if (! isNaN(this.burrow)) {
      list.push(`burrow ${this.burrow} ${unit}`);
    }
    if (! isNaN(this.climb)) {
      list.push(`climb ${this.climb} ${unit}`);
    }
    if (! isNaN(this.fly)) {
      const hover = (this.hover ? ' (hover)' : '');
      list.push(`fly ${this.fly} ${unit}${hover}`);      
    }
    if (! isNaN(this.swim)) {
      list.push(`swim ${this.swim} ${unit}`);
    }

    return list.join(', ');
  }

  toHtml() {
    return ExportHelpers.createHtmlPropertyLine(this.headingName, this.parsedText);
  }

  toHomebrewery() {
    return ExportHelpers.createHomebreweryPropertyLine(this.headingName, this.originalText);
  }
}

export default new Speed();