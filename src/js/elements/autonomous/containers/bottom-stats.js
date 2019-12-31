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
    this.legendaryActionsSection = document.querySelector('legendary-actions-section');

    this.allSections = [
      this.specialTraitsSection,
      this.actionsSection,
      this.reactionsSection,
      this.legendaryActionsSection
    ];
  }

  setEmptySectionsVisibility(visibility) {
    for (const section of this.allSections) {
      section.setEmptyVisibility(visibility);
    }
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

  reparseAllSections() {
    for (const section of this.allSections) {
      section.reparse();
    }
  }

  exportToJson() {
    const jsObject = {};

    jsObject.specialTraits = this.specialTraitsSection.exportToJson();
    jsObject.actions = this.actionsSection.exportToJson();
    jsObject.reactions = this.reactionsSection.exportToJson();
    jsObject.legendaryActions = this.legendaryActionsSection.exportToJson();

    return jsObject;
  }

  exportToHtml() {
    const fragment = document.createDocumentFragment();
    for (const section of this.allSections) {
      if (! section.empty) {
        fragment.appendChild(section.exportToHtml());
      }
    }

    return fragment;
  }

  exportToHomebrewery() {
    const exports = this.allSections
      .filter(section => ! section.empty)
      .map(section => section.exportToHomebrewery());
    return exports.join('\n');
  }
}