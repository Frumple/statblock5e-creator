import { createHtmlPropertyLine, createHomebreweryPropertyLine } from '../../../helpers/export-helpers.js';

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

  toJson() {
    return {
      items: this.items
    };
  }

  toHtml() {
    return createHtmlPropertyLine(this.headingName, this.text);
  }

  toHomebrewery() {
    return createHomebreweryPropertyLine(this.headingName, this.text);
  }
}