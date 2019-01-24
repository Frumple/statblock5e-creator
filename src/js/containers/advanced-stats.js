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
    this.toggleEmptyAttributesButton = this.shadowRoot.getElementById('toggle-empty-attributes-button');

    this.addEventListener('mouseenter', () => {
      this.toggleEmptyAttributesContainer.classList.remove('toggle-empty-attributes-container_hidden');
    });

    this.addEventListener('mouseleave', () => {
      this.toggleEmptyAttributesContainer.classList.add('toggle-empty-attributes-container_hidden');
    });

    this.toggleEmptyAttributesButton.addEventListener('click', () => {
      this.toggleEmptyAttributes();
    });
  }

  toggleEmptyAttributes() {
    let button = this.toggleEmptyAttributesButton;

    let hiddenSectionsWhenEmpty = [
      this.savingThrowsSection,
      this.skillsSection
    ];

    if('emptyAttributesVisible' in button.dataset) {
      hiddenSectionsWhenEmpty.forEach( (section) => {
        let showSection = section.showElements.section;
        if (showSection.classList.contains('section_empty')) {
          showSection.classList.add('section_empty-hidden');
        }
      });

      button.textContent = 'Show Empty Attributes';
      delete button.dataset.emptyAttributesVisible;
    } else {
      hiddenSectionsWhenEmpty.forEach( (section) => {
        section.showElements.section.classList.remove('section_empty-hidden');
      });

      button.textContent = 'Hide Empty Attributes';
      button.dataset.emptyAttributesVisible = '';
    }
  }
}
