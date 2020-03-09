import PropertyLineModel from '../../property-line-model.js';

export default class PropertyListModel extends PropertyLineModel {
  constructor(headingName, singleName) {
    super(headingName);

    this.singleName = singleName;

    this.reset();
  }

  reset() {
    this.items = [];
  }

  get jsonPropertyNames() {
    return ['items'];
  }

  get text() {
    let text = '';
    let isFirstItem = true;
    let previousItemHasCommas = false;

    for (const item of this.items) {
      const currentItemHasCommas = item.includes(',');

      if (isFirstItem) {
        text = item;
        isFirstItem = false;
      } else if (previousItemHasCommas || currentItemHasCommas) {
        text += `; ${item}`;
      } else {
        text += `, ${item}`;
      }

      previousItemHasCommas = currentItemHasCommas;
    }

    return text;
  }

  get htmlText() {
    return this.text;
  }
}