import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class TopStats extends CustomAutonomousElement {
  static get elementName() { return 'top-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'top-stats',
      'src/html/elements/autonomous/containers/top-stats.html');
  }

  constructor() {
    super(TopStats.templatePaths);

    this.basicStats = document.querySelector('basic-stats');
    this.abilityScoresSection = document.querySelector('ability-scores-section');
    this.advancedStats = document.querySelector('advanced-stats');
  }

  editAllSections() {
    this.basicStats.editAllSections();
    this.abilityScoresSection.edit();
    this.advancedStats.editAllSections();
  }

  saveAllSections() {
    this.basicStats.saveAllSections();
    this.abilityScoresSection.save();
    this.advancedStats.saveAllSections();
  }
}
