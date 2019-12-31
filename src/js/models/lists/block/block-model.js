import * as ExportHelpers from '../../../helpers/export-helpers.js';

export default class BlockModel {
  constructor(name, originalText, homebreweryText, htmlText) {
    this.name = name;
    this.originalText = originalText;
    this.homebreweryText = homebreweryText;
    this.htmlText = htmlText;
  }

  toJson() {
    return {
      name: this.name,
      text: this.originalText
    };
  }

  toHtml() {
    return ExportHelpers.createHtmlPropertyBlock(this.name, this.htmlText);
  }

  toHomebrewery() {
    return ExportHelpers.createHomebreweryPropertyBlock(this.name, this.homebreweryText);
  }
}