import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class TopStats extends CustomAutonomousElement {
  static get elementName() { return 'top-stats'; }
  static get templatePath() { return 'src/html/containers/top-stats.html'; }

  constructor() {
    super(TopStats.elementName);

    this.basicStats = document.querySelector('basic-stats');
    this.abilityScoresSection = document.querySelector('ability-scores-section');
    this.advancedStats = document.querySelector('advanced-stats');
  }
}
