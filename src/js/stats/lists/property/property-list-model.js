import { createPropertyLine } from '../../../helpers/export-helpers.js';

export default class PropertyListModel {
  constructor(headingName, singleName) {
    this.headingName = headingName;
    this.singleName = singleName;

    this.reset();
  }

  reset() {
    this.items = [];
  }

  get text() {
    return this.items.join(', ');
  }

  toHtml() {
    return createPropertyLine(this.headingName, this.text);
  }
}