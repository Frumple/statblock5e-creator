import DivisibleContainer from '/src/js/base/divisible-container.js';

export default class BasicStats extends DivisibleContainer {
  static get elementName() { return 'basic-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'basic-stats',
      'src/html/containers/basic-stats.html');
  }

  constructor() {
    super(BasicStats.templatePaths);

    this.armorClassSection = document.querySelector('armor-class-section');
    this.hitPointsSection = document.querySelector('hit-points-section');
    this.speedSection = document.querySelector('speed-section');

    this.allSections = [
      this.armorClassSection,
      this.hitPointsSection,
      this.speedSection
    ];
  }
}
