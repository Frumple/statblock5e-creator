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

    this.sections.set('title', this.shadowRoot.querySelector('title-section'));
    this.sections.set('subtitle', this.shadowRoot.querySelector('subtitle-section'));
  }

  edit() {
    // Make sure title section gets the last focus
    this.sections.get('subtitle').edit();
    this.sections.get('title').edit();
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

  exportToMarkdown() {
    return `${this.sections.get('title').exportToMarkdown()}\n${this.sections.get('subtitle').exportToMarkdown()}`;
  }
}
