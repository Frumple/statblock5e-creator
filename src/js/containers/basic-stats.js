import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class BasicStats extends CustomAutonomousElement {
  static get elementName() { return 'basic-stats'; }
  static get templatePath() { return 'src/html/containers/basic-stats.html'; }

  constructor() {
    super(BasicStats.elementName);

    this.armorClassSection = document.querySelector('armor-class-section');
    this.hitPointsSection = document.querySelector('hit-points-section');
    this.speedSection = document.querySelector('speed-section');
  }
}
