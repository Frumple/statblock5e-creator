import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class SectionDivider extends CustomAutonomousElement {
  static get elementName() { return 'section-divider'; }
  static get templatePath() { return 'src/html/elements/section-divider.html'; }

  constructor() {
    super(SectionDivider.elementName);
  }
}
