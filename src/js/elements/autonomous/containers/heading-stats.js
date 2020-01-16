import DivisibleContainer from './divisible-container.js';
import CurrentContext from '../../../models/current-context.js';

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
      title: CurrentContext.creature.title.toJson(),
      subtitle: CurrentContext.creature.subtitle.toJson()
    };
  }

  exportToHtml() {
    const creatureHeading = document.createElement('creature-heading');
    const titleElement = CurrentContext.creature.title.toHtml();
    const subtitleElement = CurrentContext.creature.subtitle.toHtml();

    creatureHeading.appendChild(titleElement);
    creatureHeading.appendChild(subtitleElement);

    return creatureHeading;
  }

  exportToHomebrewery() {
    return `${CurrentContext.creature.title.toHomebrewery()}\n${CurrentContext.creature.subtitle.toHomebrewery()}`;
  }
}
