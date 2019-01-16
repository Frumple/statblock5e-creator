import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class SectionDivider {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'section-divider',
      'src/templates/elements/section-divider.html');
  }
}
