import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class BottomStats extends CustomAutonomousElement {
  static get elementName() { return 'bottom-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'bottom-stats',
      'src/html/elements/autonomous/containers/bottom-stats.html');
  }

  constructor() {
    super(BottomStats.templatePaths);

    this.specialTraitsSection = document.querySelector('special-traits-section');
  }

  setEmptySectionsVisibility(visibility) {
    this.specialTraitsSection.setEmptyVisibility(visibility);
  }

  editAllSections() {
    this.specialTraitsSection.edit();
  }

  saveAllSections() {
    this.specialTraitsSection.save();
  }
}