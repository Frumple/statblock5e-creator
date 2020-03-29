import PropertyLineModel from './property-line-model.js';

export default class Speed extends PropertyLineModel {
  constructor() {
    super('Speed');

    this.reset();
  }

  reset() {
    this.walk = 30;
    this.burrow = null;
    this.climb = null;
    this.fly = null;
    this.hover = false;
    this.swim = null;

    this.useCustomText = false;
    this.customText = '';
    this.htmlCustomText = '';
  }

  get jsonPropertyNames() {
    return [
      'walk',
      'burrow',
      'climb',
      'fly',
      'hover',
      'swim',
      'useCustomText',
      'customText'
    ];
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
    const walk = (this.walk ? this.walk : 0);

    list.push(`${walk} ${unit}`);

    if (this.burrow != null) {
      list.push(`burrow ${this.burrow} ${unit}`);
    }
    if (this.climb != null) {
      list.push(`climb ${this.climb} ${unit}`);
    }
    if (this.fly != null) {
      const hover = (this.hover ? ' (hover)' : '');
      list.push(`fly ${this.fly} ${unit}${hover}`);
    }
    if (this.swim != null) {
      list.push(`swim ${this.swim} ${unit}`);
    }

    return list.join(', ');
  }

  fromOpen5e(json) {
    this.reset();

    if ('walk' in json.speed) {
      this.walk = json.speed.walk;
    } else {
      this.walk = null;
    }

    if ('burrow' in json.speed) this.burrow = json.speed.burrow;
    if ('climb' in json.speed) this.climb = json.speed.climb;
    if ('fly' in json.speed) this.fly = json.speed.fly;
    if ('hover' in json.speed) this.hover = json.speed.hover;
    if ('swim' in json.speed) this.swim = json.speed.swim;

    if ('notes' in json.speed) {
      this.useCustomText = true;
      this.customText = `${this.normalText} (${json.speed.notes})`;
    }
  }
}