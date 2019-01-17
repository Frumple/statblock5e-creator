import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class PropertyLine {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'property-line',
      'src/html/elements/property-line.html');
  }
}