import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js';

import Component from '/src/js/base/component.js';
import BasicStats from '/src/js/containers/basic-stats.js';
import AdvancedStats from '/src/js/containers/advanced-stats.js';
import AbilityScoresSection from '/src/js/sections/ability-scores-section.js';

export default class TopStats extends Component {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'top-stats',
      'src/html/containers/top-stats.html');
  }

  constructor(element) {
    super(element);

    this.basicStats = new BasicStats( document.querySelector('basic-stats') );
    this.abilityScoresSection = new AbilityScoresSection( document.querySelector('ability-scores-section') );
    this.advanced = new AdvancedStats( document.querySelector('advanced-stats') );
  }
}
