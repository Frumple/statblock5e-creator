import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class AdvancedStats extends CustomAutonomousElement {
  static get elementName() { return 'advanced-stats'; }
  static get templatePath() { return 'src/html/containers/advanced-stats.html'; }

  constructor() {
    super(AdvancedStats.elementName);

    this.savingThrowsSection = document.querySelector('saving-throws-section');
    this.challengeSection = document.querySelector('challenge-section');

    this.addEventListener('mouseenter', () => {
      this.savingThrowsSection.showElements.section.classList.remove('section_empty-hidden');
    });

    this.addEventListener('mouseleave', () => {
      let section = this.savingThrowsSection.showElements.section;
      if (section.classList.contains('section_empty')) {
        section.classList.add('section_empty-hidden');
      }      
    });
  }
}
