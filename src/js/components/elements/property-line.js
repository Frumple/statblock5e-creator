import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import Component from '/src/js/components/base/component.js';

export default class PropertyLine extends Component {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'property-line',
      'src/html/elements/property-line.html');
  }
}
