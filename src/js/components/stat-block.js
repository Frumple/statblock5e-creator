import defineCustomElementFromTemplate from '/src/js/helpers/define-custom-element.js';
import Component from '/src/js/components/base/component.js';
import TopStats from '/src/js/components/top-stats.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';

export default class StatBlock extends Component {
  static async defineCustomElement() {
    await defineCustomElementFromTemplate(
      'stat-block',
      'src/html/stat-block.html');
  }

  constructor(element) {
    super(element);

    this.topStats = new TopStats( document.querySelector('top-stats') );

    this.element.addEventListener('abilityScoreChanged', (event) => {
      let abilityScoreName = event.detail.abilityScoreName;
      let abilityModifier = event.detail.abilityModifier;

      if (abilityScoreName === AbilityScoreNames.CONSTITUTION) {
        this.topStats.hitPointsSection.setConstitutionModifier(abilityModifier);
      }
    });
  }
}
