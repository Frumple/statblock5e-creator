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

    this.sections = new Map();

    this.sections.set('specialTraits', document.querySelector('special-traits-section'));
    this.sections.set('actions', document.querySelector('actions-section'));
    this.sections.set('reactions', document.querySelector('reactions-section'));
    this.sections.set('legendaryActions', document.querySelector('legendary-actions-section'));
  }

  setEmptySectionsVisibility(visibility) {
    for (const section of this.sections.values()) {
      section.setEmptyVisibility(visibility);
    }
  }

  editAllSections() {
    for (const section of this.sections.values()) {
      section.edit();
    }
  }

  saveAllSections() {
    for (const section of this.sections.values()) {
      section.save();
    }
  }

  reparseAllSections() {
    for (const section of this.sections.values()) {
      section.reparse();
    }
  }

  exportToJson() {
    const entries = Array.from(this.sections.entries());
    const transformedEntries = entries.map(([key, section]) => [key, section.exportToJson()]);
    return Object.fromEntries(transformedEntries);
  }

  exportToHtml() {
    const fragment = document.createDocumentFragment();
    for (const section of this.sections.values()) {
      if (! section.empty) {
        fragment.appendChild(section.exportToHtml());
      }
    }

    return fragment;
  }

  exportToHomebrewery() {
    const sections = Array.from(this.sections.values());
    return sections
      .filter(section => ! section.empty)
      .map(section => section.exportToHomebrewery())
      .join('\n');
  }
}