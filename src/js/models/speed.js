import { createPropertyLine } from '../helpers/export-helpers.js';

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

  get normalText() {
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

export default new Speed();