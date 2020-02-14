import * as ExportHelpers from '../../../helpers/export-helpers.js';

export default class BlockModel {
  constructor(name, text, markdownText = '', htmlText = '') {
    this.name = name;
    this.text = text;
    this.markdownText = markdownText;
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

  toMarkdown() {
    return ExportHelpers.createMarkdownPropertyBlock(this.name, this.markdownText);
  }
}