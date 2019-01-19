import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';
import Component from '/src/js/components/base/component.js';

export default class TaperedRule extends Component {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'tapered-rule',
      'src/html/elements/tapered-rule.html');
  }
}
