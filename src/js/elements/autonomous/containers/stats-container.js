import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class StatsContainer extends CustomAutonomousElement {
  constructor(templatePaths) {
    super(templatePaths);

    this.sections = new Map();
  }

  setEmptyVisibility(visibility) {
    for (const section of this.sections.values()) {
      section.setEmptyVisibility(visibility);
    }
  }

  edit() {
    // Edit in reverse order so that the title section is the last to gain focus
    for (const section of Array.from(this.sections.values()).reverse()) {
      section.edit();
    }
  }

  save() {
    for (const section of Array.from(this.sections.values()).reverse()) {
      section.save();
    }
  }

  updateView() {
    for (const section of Array.from(this.sections.values())) {
      section.updateView();
    }
  }

  importFromOpen5e(json) {
    for (const section of this.sections.values()) {
      section.importFromOpen5e(json);
    }
  }

  importFromJson(json) {
    for (const section of this.sections.values()) {
      section.importFromJson(json[section.modelPropertyName]);
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

  exportToMarkdown() {
    const sections = Array.from(this.sections.values());
    return sections
      .filter(section => ! section.empty)
      .map(section => section.exportToMarkdown())
      .join('\n');
  }
}