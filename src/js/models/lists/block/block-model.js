import * as ExportHelpers from '../../../helpers/export-helpers.js';

export default class BlockModel {
  constructor(name, originalText, parsedText) {
    this.name = name;
    this.originalText = originalText;
    this.parsedText = parsedText;
  }

  toHtml() {
    return ExportHelpers.createHtmlPropertyBlock(this.name, this.parsedText);
  }

  toHomebrewery() {
    return ExportHelpers.createHomebreweryPropertyBlock(this.name, this.originalText);
  }
}