import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';
import Component from '/src/js/components/base/component.js';

export default class PropertyBlock extends Component {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'property-block',
      'src/html/elements/property-block.html');
  }
}
