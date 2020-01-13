import DivisibleContainer from './divisible-container.js';
import Title from '../../../models/title.js';
import Subtitle from '../../../models/subtitle.js';

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
      title: Title.toJson(),
      subtitle: Subtitle.toJson()
    };
  }

  exportToHtml() {
    const creatureHeading = document.createElement('creature-heading');
    const titleElement = Title.toHtml();
    const subtitleElement = Subtitle.toHtml();

    creatureHeading.appendChild(titleElement);
    creatureHeading.appendChild(subtitleElement);

    return creatureHeading;
  }

  exportToHomebrewery() {
    return `${Title.toHomebrewery()}\n${Subtitle.toHomebrewery()}`;
  }
}
