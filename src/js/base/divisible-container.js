import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';
import GlobalOptions from '/src/js/helpers/global-options.js';

export default class DivisibleContainer extends CustomAutonomousElement {
  constructor(elementName) {
    super(elementName);

    this.allDividers = this.querySelectorAll('section-divider');
    this.allSections = [];

    this.addEventListener('sectionModeChanged', () => {
      this.updateSectionDividers();
    });
  }

  toggleEmptyAttributeVisibility() {
    GlobalOptions.showEmptyAttributes = this.showEmptyAttributesCheckbox.checked;

    this.allSections.forEach( (section) => {
      if (section.empty) {
        if (GlobalOptions.showEmptyAttributes) {
          if (section.mode === 'hidden') {
            section.mode = 'show';
          }
        } else {
          if (section.mode === 'show') {
            section.mode = 'hidden';
          }
        }
      }
    });

    this.updateSectionDividers();
  }

  updateSectionDividers() {
    this.allDividers.forEach( (divider) => {
      divider.hidden = true;
    });

    let previousSection = null;

    this.allSections.forEach( (currentSection) => {
      if (currentSection.mode !== 'hidden') {
        if (previousSection) {
          if (DivisibleContainer.shouldSectionDividerBeDisplayed(previousSection, currentSection)) {
            let previousDivider = currentSection.previousElementSibling;
            previousDivider.hidden = false;
          }
        }

        previousSection = currentSection;
      }
    });
  }

  static shouldSectionDividerBeDisplayed(sectionAbove, sectionBelow) {
    return (sectionAbove.mode === 'edit' && sectionBelow.mode !== 'hidden') ||
           (sectionBelow.mode === 'edit' && sectionAbove.mode !== 'hidden');
  }
}
