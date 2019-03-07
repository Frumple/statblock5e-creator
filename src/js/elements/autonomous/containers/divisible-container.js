import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class DivisibleContainer extends CustomAutonomousElement {
  constructor(templatePaths) {
    super(templatePaths);

    this.allDividers = this.querySelectorAll('section-divider');
    this.allSections = [];

    this.addEventListener('sectionModeChanged', () => {
      this.updateSectionDividers();
    });
  }

  setEmptySectionsVisibility(visibility) {
    for (const section of this.allSections) {
      section.setEmptyVisibility(visibility);
    }

    this.updateSectionDividers();
  }

  updateSectionDividers() {
    for (const divider of this.allDividers) {
      divider.hidden = true;
    }

    let previousSection = null;

    for (const currentSection of this.allSections) {
      if (currentSection.mode !== 'hidden') {
        if (previousSection) {
          if (DivisibleContainer.shouldSectionDividerBeDisplayed(previousSection, currentSection)) {
            let previousDivider = currentSection.previousElementSibling;
            previousDivider.hidden = false;
          }
        }

        previousSection = currentSection;
      }
    }
  }

  static shouldSectionDividerBeDisplayed(sectionAbove, sectionBelow) {
    return (sectionAbove.mode === 'edit' && sectionBelow.mode !== 'hidden') ||
           (sectionBelow.mode === 'edit' && sectionAbove.mode !== 'hidden');
  }
}
