import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';

import Component from '/src/js/base/component.js';

export default class AdvancedStats extends Component {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'advanced-stats',
      'src/html/containers/advanced-stats.html');
  }

  constructor(element) {
    super(element);
  }
}
