import PropertyListModel from './property-list-model.js';
import { convertToInteger } from '../../../helpers/number-helpers.js';

export default class Languages extends PropertyListModel {
  constructor() {
    super('Languages',
          'Language',
          'languages');
  }

  reset() {
    this.clear();
    this.items = ['any one language (usually Common)'];
  }

  clear() {
    super.clear();
    this.telepathy = null;
  }

  get text() {
    let text = super.text;

    if (this.telepathy !== null) {
      if (text !== '') {
        text += ', ';
      }

      text += `telepathy ${this.telepathy} ft.`;
    }

    if (text === '') {
      // This is an EM dash (U+2014).
      // This appears significantly wider than a normal dash.
      text = '—';
    }

    return text;
  }

  fromOpen5e(json) {
    super.fromOpen5e(json);

    const regex = /(?<=^telepathy )\d+(?= ft\.$)/;
    const telepathyItemIndex = this.items.findIndex(item => regex.test(item));

    if (telepathyItemIndex >= 0) {
      const removedItems = this.items.splice(telepathyItemIndex, 1);
      const telepathyMatches = removedItems[0].match(regex);
      const telepathyValue = telepathyMatches[0];
      this.telepathy = convertToInteger(telepathyValue);
    }
  }

  fromJson(json) {
    super.fromJson(json);

    this.telepathy = json.telepathy;
  }

  toJson() {
    const json = super.toJson();
    json.telepathy = this.telepathy;
    return json;
  }
}