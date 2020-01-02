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
}
