import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';
import Component from '/src/js/base/component.js';

export default class SectionDivider extends Component {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'section-divider',
      'src/html/elements/section-divider.html');
  }
}
