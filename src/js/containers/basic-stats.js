import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';

import Component from '/src/js/base/component.js';
import ArmorClassSection from '/src/js/sections/armor-class-section.js';
import HitPointsSection from '/src/js/sections/hit-points-section.js';
import SpeedSection from '/src/js/sections/speed-section.js';

export default class BasicStats extends Component {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'basic-stats',
      'src/html/containers/basic-stats.html');
  }

  constructor(element) {
    super(element);

    this.armorClassSection = new ArmorClassSection( document.querySelector('armor-class-section') );
    this.hitPointsSection = new HitPointsSection( document.querySelector('hit-points-section') );
    this.speedSection = new SpeedSection( document.querySelector('speed-section') );
  }
}
