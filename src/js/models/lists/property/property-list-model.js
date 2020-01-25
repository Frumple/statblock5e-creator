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
    return this.items.join(', ');
  }

  get htmlText() {
    return this.text;
  }
}