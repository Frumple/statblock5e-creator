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

    this.sections.set('armorClass', document.querySelector('armor-class-section'));
    this.sections.set('hitPoints', document.querySelector('hit-points-section'));
    this.sections.set('speed', document.querySelector('speed-section'));
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
      fragment.appendChild(section.exportToHtml());
    }

    return fragment;
  }

  exportToHomebrewery() {
    const sections = Array.from(this.sections.values());
    return sections
      .map(section => section.exportToHomebrewery())
      .join('\n');
  }
}
