import DivisibleContainer from './divisible-container.js';

export default class BasicStats extends DivisibleContainer {
  static get elementName() { return 'basic-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'basic-stats',
      'src/html/elements/autonomous/containers/basic-stats.html');
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

  editAllSections() {
    for (const section of this.allSections) {
      section.edit();
    }
  }

  saveAllSections() {
    for (const section of this.allSections) {
      section.save();
    }
  }

  exportToJson() {
    const jsObject = {};

    jsObject.armorClass = this.armorClassSection.exportToJson();
    // jsObject.hitPoints = this.hitPointsSection.exportToJson();
    // jsObject.speed = this.speedSection.exportToJson();

    return jsObject;
  }

  exportToHtml() {
    const fragment = document.createDocumentFragment();
    for (const section of this.allSections) {
      fragment.appendChild(section.exportToHtml());
    }

    return fragment;
  }

  exportToHomebrewery() {
    const exports = this.allSections.map(section => section.exportToHomebrewery());
    return exports.join('\n');
  }
}
