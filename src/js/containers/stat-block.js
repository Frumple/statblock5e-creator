import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';

export default class StatBlock extends CustomAutonomousElement {
  static get elementName() { return 'stat-block'; }
  static get templatePath() { return 'src/html/containers/stat-block.html'; }

  constructor() {
    super(StatBlock.elementName);

    this.headingSection = document.querySelector('heading-section');
    this.topStats = document.querySelector('top-stats');

    this.addEventListener('abilityScoreChanged', (event) => {
      let abilityScoreName = event.detail.abilityScoreName;
      let abilityModifier = event.detail.abilityModifier;

      if (abilityScoreName === 'constitution') {
        this.topStats.basicStats.hitPointsSection.setConstitutionModifier(abilityModifier);
      }

      this.topStats.advancedStats.savingThrowsSection.setAbilityModifier(abilityScoreName, abilityModifier);
    });

    this.addEventListener('proficiencyBonusChanged', (event) => {
      let proficiencyBonus = event.detail.proficiencyBonus;

      this.topStats.advancedStats.savingThrowsSection.setProficiencyBonus(proficiencyBonus);
    });
  }
}
