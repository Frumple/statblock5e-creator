import BlockModel from './block-model.js';
import * as ExportHelpers from '../../../helpers/export-helpers.js';

export default class LegendaryBlockModel extends BlockModel {
  constructor(name, text, markdownText, htmlText) {
    super(name, text, markdownText, htmlText);
  }

  toHtml() {
    return ExportHelpers.createHtmlLegendaryPropertyBlock(this.name, this.htmlText);
  }
}