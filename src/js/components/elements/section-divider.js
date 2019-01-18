import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import Component from '/src/js/components/base/component.js';

export default class SectionDivider extends Component {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'section-divider',
      'src/html/elements/section-divider.html');
  }
}
