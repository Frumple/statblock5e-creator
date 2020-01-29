import * as ExportHelpers from '../../../helpers/export-helpers.js';

export default class BlockModel {
  constructor(name, text, homebreweryText = '', htmlText = '') {
    this.name = name;
    this.text = text;
    this.homebreweryText = homebreweryText;
    this.htmlText = htmlText;
  }

  toJson() {
    return {
      name: this.name,
      text: this.text
    };
  }

  toHtml() {
    return ExportHelpers.createHtmlPropertyBlock(this.name, this.htmlText);
  }

  toHomebrewery() {
    return ExportHelpers.createHomebreweryPropertyBlock(this.name, this.homebreweryText);
  }
}