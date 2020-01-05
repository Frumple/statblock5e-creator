import StatsContainer from './stats-container.js';

export default class DivisibleContainer extends StatsContainer {
  constructor(templatePaths) {
    super(templatePaths);

    this.dividers = this.querySelectorAll('section-divider');
    this.sections = new Map();

    this.addEventListener('sectionModeChanged', () => {
      this.updateSectionDividers();
    });
  }

  setEmptySectionsVisibility(visibility) {
    super.setEmptySectionsVisibility(visibility);

    this.updateSectionDividers();
  }

  updateSectionDividers() {
    for (const divider of this.dividers) {
      divider.hidden = true;
    }

    let previousSection = null;

    for (const currentSection of this.sections.values()) {
      if (currentSection.mode !== 'hidden') {
        if (previousSection) {
          if (DivisibleContainer.shouldSectionDividerBeDisplayed(previousSection, currentSection)) {
            const previousDivider = currentSection.previousElementSibling;
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
