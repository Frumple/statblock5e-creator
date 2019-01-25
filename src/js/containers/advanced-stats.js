import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';
import GlobalOptions from '/src/js/helpers/global-options.js';

export default class AdvancedStats extends CustomAutonomousElement {
  static get elementName() { return 'advanced-stats'; }
  static get templatePath() { return 'src/html/containers/advanced-stats.html'; }

  constructor() {
    super(AdvancedStats.elementName);

    this.savingThrowsSection = document.querySelector('saving-throws-section');
    this.skillsSection = document.querySelector('skills-section');
    this.challengeRatingSection = document.querySelector('challenge-rating-section');

    this.sectionsHiddenWhenEmpty = [
      this.savingThrowsSection,
      this.skillsSection
    ];

    this.showEmptyAttributesContainer = this.shadowRoot.getElementById('show-empty-attributes-container');
    this.showEmptyAttributesCheckbox = this.shadowRoot.getElementById('show-empty-attributes-checkbox');

    this.showEmptyAttributesCheckbox.addEventListener('input', () => {
      this.toggleEmptyAttributeVisibility();
    });
  }

  toggleEmptyAttributeVisibility() {
    if(this.showEmptyAttributesCheckbox.checked) {
      this.sectionsHiddenWhenEmpty.forEach( (section) => {
        GlobalOptions.showEmptyAttributes = true;
        if (section.empty && section.mode === 'hidden') {
          section.mode = 'show';
        }
      });
    } else {
      this.sectionsHiddenWhenEmpty.forEach( (section) => {
        GlobalOptions.showEmptyAttributes = false;
        if (section.empty && section.mode === 'show') {
          section.mode = 'hidden';
        }
      });
    }
  }
}
