import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import Component from '/src/js/components/base/component.js';

import HeadingSection from '/src/js/components/sections/heading-section.js';
import ArmorClassSection from '/src/js/components/sections/armor-class-section.js';
import HitPointsSection from '/src/js/components/sections/hit-points-section.js';
import SpeedSection from '/src/js/components/sections/speed-section.js';
import AbilityScoresSection from '/src/js/components/sections/ability-scores-section.js';

export default class TopStats extends Component {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'top-stats',
      'src/html/top-stats.html');
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
