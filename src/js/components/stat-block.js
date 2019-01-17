import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class StatBlock {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'stat-block',
      'src/html/stat-block.html');
  }
}
