import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class StatBlock {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'stat-block',
      'src/templates/stat-block.html');
  }
}
