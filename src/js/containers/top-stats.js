import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';
import Component from '/src/js/base/component.js';

import HeadingSection from '/src/js/sections/heading-section.js';
import ArmorClassSection from '/src/js/sections/armor-class-section.js';
import HitPointsSection from '/src/js/sections/hit-points-section.js';
import SpeedSection from '/src/js/sections/speed-section.js';
import AbilityScoresSection from '/src/js/sections/ability-scores-section.js';

export default class TopStats extends Component {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'top-stats',
      'src/html/containers/top-stats.html');
  }

  constructor(element) {
    super(element);

    this.headingSection = new HeadingSection( document.querySelector('heading-section') );
    this.armorClassSection = new ArmorClassSection( document.querySelector('armor-class-section') );
    this.hitPointsSection = new HitPointsSection( document.querySelector('hit-points-section') );
    this.speedSection = new SpeedSection( document.querySelector('speed-section') );
    this.abilityScoresSection = new AbilityScoresSection( document.querySelector('ability-scores-section') );
  }
}
