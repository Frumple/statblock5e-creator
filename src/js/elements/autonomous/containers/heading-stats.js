import DivisibleContainer from './divisible-container.js';
import Creature from '../../../models/creature.js';

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
      creature: Creature.toJson()
    };
  }

  exportToHtml() {
    return Creature.toHtml();
  }

  exportToHomebrewery() {
    return Creature.toHomebrewery();
  }
}
