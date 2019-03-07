import CustomAutonomousElement from '../custom-autonomous-element.js';

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
    this.actionsSection = document.querySelector('actions-section');
    this.reactionsSection = document.querySelector('reactions-section');
  }

  setEmptySectionsVisibility(visibility) {
    this.specialTraitsSection.setEmptyVisibility(visibility);
    this.actionsSection.setEmptyVisibility(visibility);
    this.reactionsSection.setEmptyVisibility(visibility);
  }

  editAllSections() {
    this.specialTraitsSection.edit();
    this.actionsSection.edit();
    this.reactionsSection.edit();
  }

  saveAllSections() {
    this.specialTraitsSection.save();
    this.actionsSection.save();
    this.reactionsSection.save();
  }
}