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

    const savingThrowsSection = document.querySelector('saving-throws-section');
    const skillsSection = document.querySelector('skills-section');
    const damageVulnerabilitiesSection = document.querySelector('damage-vulnerabilities-section');
    const damageResistancesSection = document.querySelector('damage-resistances-section');
    const damageImmunitiesSection = document.querySelector('damage-immunities-section');
    const conditionImmunitiesSection = document.querySelector('condition-immunities-section');
    const sensesSection = document.querySelector('senses-section');
    const languagesSection = document.querySelector('languages-section');
    const challengeRatingSection =  document.querySelector('challenge-rating-section');

    this.sections.set('savingThrows', savingThrowsSection);
    this.sections.set('skills', skillsSection);
    this.sections.set('damageVulnerabilities', damageVulnerabilitiesSection);
    this.sections.set('damageResistances', damageResistancesSection);
    this.sections.set('damageImmunities', damageImmunitiesSection);
    this.sections.set('conditionImmunities', conditionImmunitiesSection);
    this.sections.set('senses', sensesSection);
    this.sections.set('languages', languagesSection);
    this.sections.set('challengeRating', challengeRatingSection);

    // Proficiency bonus from the challenge rating section must be imported before saving throws and skills.
    // Skills must be imported before senses in order to calculate passive perception.
    this.importOrder = [
      challengeRatingSection,
      savingThrowsSection,
      skillsSection,
      damageVulnerabilitiesSection,
      damageResistancesSection,
      damageImmunitiesSection,
      conditionImmunitiesSection,
      sensesSection,
      languagesSection
    ];
  }

  updateSavingThrowsView(abilityName) {
    this.sections.get('savingThrows').updateViewOnAttributeChange(abilityName);
  }

  updateSkillsView(abilityName) {
    this.sections.get('skills').updateViewOnAttributeChange(abilityName);
  }

  updateSensesView() {
    this.sections.get('senses').updateViewOnAttributeChange();
  }

  importFromOpen5e(json) {
    for (const section of this.importOrder) {
      section.importFromOpen5e(json);
    }
  }

  importFromJson(json) {
    for (const section of this.importOrder) {
      section.importFromJson(json[section.modelPropertyName]);
    }
  }
}
