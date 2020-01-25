import Model from './model.js';
import * as ExportHelpers from '../helpers/export-helpers.js';

export default class PropertyLineModel extends Model {
  constructor(headingName) {
    super();

    this.headingName = headingName;
  }

  get text() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the text() method.`);
  }

  get htmlText() {
    throw new Error(
      `The class '${this.constructor.name}' must implement the htmlText() method.`);
  }

  toHtml() {
    return ExportHelpers.createHtmlPropertyLine(this.headingName, this.htmlText);
  }

  toHomebrewery() {
    return ExportHelpers.createHomebreweryPropertyLine(this.headingName, this.text);
  }
}
