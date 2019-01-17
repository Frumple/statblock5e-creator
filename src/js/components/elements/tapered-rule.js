import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class TaperedRule {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'tapered-rule',
      'src/html/elements/tapered-rule.html');
  }
}
