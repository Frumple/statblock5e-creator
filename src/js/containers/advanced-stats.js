import DivisibleContainer from '/src/js/base/divisible-container.js';
import GlobalOptions from '/src/js/helpers/global-options.js';

export default class AdvancedStats extends DivisibleContainer {
  static get elementName() { return 'advanced-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'advanced-stats',
      'src/html/containers/advanced-stats.html');
  }

  constructor() {
    super(AdvancedStats.templatePaths);

    this.savingThrowsSection = document.querySelector('saving-throws-section');
    this.skillsSection = document.querySelector('skills-section');
    this.sensesSection = document.querySelector('senses-section');
    this.languagesSection = document.querySelector('languages-section');
    this.challengeRatingSection = document.querySelector('challenge-rating-section');

    this.allSections = [
      this.savingThrowsSection,
      this.skillsSection,
      this.sensesSection,
      this.languagesSection,
      this.challengeRatingSection
    ];

    this.showEmptyAttributesContainer = this.shadowRoot.getElementById('show-empty-attributes-container');
    this.showEmptyAttributesCheckbox = this.shadowRoot.getElementById('show-empty-attributes-checkbox');

    this.showEmptyAttributesCheckbox.addEventListener('input', () => {
      this.toggleEmptyAttributeVisibility();
    });
  }
}
