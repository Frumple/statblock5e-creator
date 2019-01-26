import DivisibleContainer from '/src/js/base/divisible-container.js';
import GlobalOptions from '/src/js/helpers/global-options.js';

export default class BasicStats extends DivisibleContainer {
  static get elementName() { return 'basic-stats'; }
  static get templatePath() { return 'src/html/containers/basic-stats.html'; }

  constructor() {
    super(BasicStats.elementName);

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
