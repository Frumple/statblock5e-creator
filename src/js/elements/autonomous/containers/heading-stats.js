import DivisibleContainer from './divisible-container.js';

export default class HeadingStats extends DivisibleContainer {
  static get elementName() { return 'heading-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'heading-stats',
      'src/html/elements/autonomous/containers/heading-stats.html');
  }

  constructor() {
    super(HeadingStats.templatePaths);

    this.sections.set('title', document.querySelector('title-section'));
    this.sections.set('subtitle', document.querySelector('subtitle-section'));
  }

  exportToJson() {
    return {
      title: this.sections.get('title').exportToJson(),
      subtitle: this.sections.get('subtitle').exportToJson()
    };
  }

  exportToHtml() {
    const creatureHeading = document.createElement('creature-heading');
    const titleElement = this.sections.get('title').exportToHtml();
    const subtitleElement = this.sections.get('subtitle').exportToHtml();

    creatureHeading.appendChild(titleElement);
    creatureHeading.appendChild(subtitleElement);

    return creatureHeading;
  }

  exportToHomebrewery() {
    return `${this.sections.get('title').exportToHomebrewery()}\n${this.sections.get('subtitle').exportToHomebrewery()}`;
  }
}
