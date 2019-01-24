import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class AdvancedStats extends CustomAutonomousElement {
  static get elementName() { return 'advanced-stats'; }
  static get templatePath() { return 'src/html/containers/advanced-stats.html'; }

  constructor() {
    super(AdvancedStats.elementName);

    this.savingThrowsSection = document.querySelector('saving-throws-section');
    this.skillsSection = document.querySelector('skills-section');
    this.challengeSection = document.querySelector('challenge-section');

    this.toggleEmptyAttributesContainer = this.shadowRoot.getElementById('toggle-empty-attributes-container');
    this.toggleEmptyAttributesCheckbox = this.shadowRoot.getElementById('toggle-empty-attributes-checkbox');

    this.addEventListener('mouseenter', () => {
      this.toggleEmptyAttributesContainer.classList.remove('toggle-empty-attributes-container_hidden');
    });

    this.addEventListener('mouseleave', () => {
      this.toggleEmptyAttributesContainer.classList.add('toggle-empty-attributes-container_hidden');
    });

    this.toggleEmptyAttributesCheckbox.addEventListener('input', () => {
      this.toggleEmptyAttributes();
    });
  }

  toggleEmptyAttributes() {
    let button = this.toggleEmptyAttributesCheckbox;

    let sectionsHiddenWhenEmpty = [
      this.savingThrowsSection,
      this.skillsSection
    ];

    if(this.toggleEmptyAttributesCheckbox.checked) {
      sectionsHiddenWhenEmpty.forEach( (section) => {
        section.showElements.section.classList.remove('section_empty-hidden');
      });
    } else {
      sectionsHiddenWhenEmpty.forEach( (section) => {
        let showSection = section.showElements.section;
        if (showSection.classList.contains('section_empty')) {
          showSection.classList.add('section_empty-hidden');
        }
      });
    }
  }
}
