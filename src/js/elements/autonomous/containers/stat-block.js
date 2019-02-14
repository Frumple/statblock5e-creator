import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class StatBlock extends CustomAutonomousElement {
  static get elementName() { return 'stat-block'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'stat-block',
      'src/html/elements/autonomous/containers/stat-block.html');
  }

  constructor() {
    super(StatBlock.templatePaths);

    this.headingSection = document.querySelector('heading-section');
    this.topStats = document.querySelector('top-stats');

    this.addEventListener('abilityScoreChanged', (event) => {
      let abilityName = event.detail.abilityName;

      if (abilityName === 'constitution') {
        this.topStats.basicStats.hitPointsSection.updateHitPoints();
      } else if (abilityName === 'wisdom') {
        this.topStats.advancedStats.sensesSection.updatePassivePerception();
      }

      this.topStats.advancedStats.savingThrowsSection.updateModifiers(abilityName);
      this.topStats.advancedStats.skillsSection.updateModifiers(abilityName);
    });

    this.addEventListener('proficiencyBonusChanged', () => {
      this.topStats.advancedStats.savingThrowsSection.updateModifiers();
      this.topStats.advancedStats.skillsSection.updateModifiers();
      this.topStats.advancedStats.sensesSection.updatePassivePerception();
    });

    this.addEventListener('skillChanged', (event) => {
      let skillName = event.detail.skillName;

      if (skillName === 'perception') {
        this.topStats.advancedStats.sensesSection.updatePassivePerception();
      }
    });
  }
}
