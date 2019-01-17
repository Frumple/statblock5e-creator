import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class TopStats {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'top-stats',
      'src/html/top-stats.html');
  }
}
