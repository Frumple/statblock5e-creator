import CustomAutonomousElement from '/src/js/elements/autonomous/custom-autonomous-element.js';

export default class SectionDivider extends CustomAutonomousElement {
  static get elementName() { return 'section-divider'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'section-divider',
      'src/html/elements/autonomous/section-divider.html');
  }

  static get hiddenClassName() { return 'section-divider_hidden'; }

  constructor() {
    super(SectionDivider.templatePaths);
    this.divider = this.shadowRoot.querySelector('.section-divider');
    this.hidden = true;
  }

  get hidden() {
    return this.divider.classList.contains(SectionDivider.hiddenClassName);
  }

  set hidden(isHidden) {
    if (isHidden) {
      this.divider.classList.add(SectionDivider.hiddenClassName);
    } else {
      this.divider.classList.remove(SectionDivider.hiddenClassName);
    }
  }
}
