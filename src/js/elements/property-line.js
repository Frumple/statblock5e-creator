import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';
import Component from '/src/js/base/component.js';

export default class PropertyLine extends Component {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'property-line',
      'src/html/elements/property-line.html');
  }
}
