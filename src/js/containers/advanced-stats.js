import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class AdvancedStats extends CustomAutonomousElement {
  static get elementName() { return 'advanced-stats'; }
  static get templatePath() { return 'src/html/containers/advanced-stats.html'; }

  constructor() {
    super(AdvancedStats.elementName);

    this.savingThrowsSection = document.querySelector('saving-throws-section');
    this.skillsSection = document.querySelector('skills-section');
    this.challengeSection = document.querySelector('challenge-section');

    let hiddenSectionsWhenEmpty = [
      this.savingThrowsSection,
      this.skillsSection
    ];

    this.addEventListener('mouseenter', () => {
      hiddenSectionsWhenEmpty.forEach( (section) => {
        section.showElements.section.classList.remove('section_empty-hidden');
      });
    });

    this.addEventListener('mouseleave', () => {
      hiddenSectionsWhenEmpty.forEach( (section) => {
        let showSection = section.showElements.section;
        if (showSection.classList.contains('section_empty')) {
          showSection.classList.add('section_empty-hidden');
        }
      });
    });
  }
}
