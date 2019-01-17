import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';

export default class PropertyBlock {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'property-block',
      'src/html/elements/property-block.html');
  }
}
