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

    this.savingThrowsSection = document.querySelector('saving-throws-section');
    this.skillsSection = document.querySelector('skills-section');
    this.damageVulnerabilitiesSection = document.querySelector('damage-vulnerabilities-section');
    this.damageResistancesSection = document.querySelector('damage-resistances-section');
    this.damageImmunitiesSection = document.querySelector('damage-immunities-section');
    this.conditionImmunitiesSection = document.querySelector('condition-immunities-section');
    this.sensesSection = document.querySelector('senses-section');
    this.languagesSection = document.querySelector('languages-section');
    this.challengeRatingSection = document.querySelector('challenge-rating-section');

    this.allSections = [
      this.savingThrowsSection,
      this.skillsSection,
      this.damageVulnerabilitiesSection,
      this.damageResistancesSection,
      this.damageImmunitiesSection,
      this.conditionImmunitiesSection,
      this.sensesSection,
      this.languagesSection,
      this.challengeRatingSection
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

  exportToHtml() {
    const fragment = document.createDocumentFragment();
    for (const section of this.allSections) {
      if (! section.empty) {
        fragment.appendChild(section.exportToHtml());
      }     
    }

    return fragment;
  }
}
