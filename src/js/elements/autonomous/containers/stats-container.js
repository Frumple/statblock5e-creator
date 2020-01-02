import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class StatsContainer extends CustomAutonomousElement {
  constructor(templatePaths) {
    super(templatePaths);
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