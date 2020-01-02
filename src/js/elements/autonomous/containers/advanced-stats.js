import DivisibleContainer from './divisible-container.js';

export default class AdvancedStats extends DivisibleContainer {
  static get elementName() { return 'advanced-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'advanced-stats',
      'src/html/elements/autonomous/containers/advanced-stats.html');
  }

  constructor() {
    super(AdvancedStats.templatePaths);

    this.sections.set('savingThrows', document.querySelector('saving-throws-section'));
    this.sections.set('skills', document.querySelector('skills-section'));
    this.sections.set('damageVulnerabilities', document.querySelector('damage-vulnerabilities-section'));
    this.sections.set('damageResistances', document.querySelector('damage-resistances-section'));
    this.sections.set('damageImmunities', document.querySelector('damage-immunities-section'));
    this.sections.set('conditionImmunities', document.querySelector('condition-immunities-section'));
    this.sections.set('senses', document.querySelector('senses-section'));
    this.sections.set('languages', document.querySelector('languages-section'));
    this.sections.set('challengeRating', document.querySelector('challenge-rating-section'));
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
