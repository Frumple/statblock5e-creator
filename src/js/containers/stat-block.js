import { defineCustomAutonomousElement } from '/src/js/helpers/define-custom-element.js'
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';;

import Component from '/src/js/base/component.js';
import HeadingSection from '/src/js/sections/heading-section.js';
import TopStats from '/src/js/containers/top-stats.js';

export default class StatBlock extends Component {
  static async defineCustomElement() {
    await defineCustomAutonomousElement(
      'stat-block',
      'src/html/containers/stat-block.html');
  }

  constructor(element) {
    super(element);

    this.headingSection = new HeadingSection( document.querySelector('heading-section') );
    this.topStats = new TopStats( document.querySelector('top-stats') );

    this.element.addEventListener('abilityScoreChanged', (event) => {
      let abilityScoreName = event.detail.abilityScoreName;
      let abilityModifier = event.detail.abilityModifier;

      if (abilityScoreName === AbilityScoreNames.CONSTITUTION) {
        this.topStats.basicStats.hitPointsSection.setConstitutionModifier(abilityModifier);
      }
    });
  }
}
