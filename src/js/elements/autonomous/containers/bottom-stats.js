import StatsContainer from './stats-container.js';

export default class BottomStats extends StatsContainer {
  static get elementName() { return 'bottom-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'bottom-stats',
      'src/html/elements/autonomous/containers/bottom-stats.html');
  }

  constructor() {
    super(BottomStats.templatePaths);

    this.sections.set('specialTraits', document.querySelector('special-traits-section'));
    this.sections.set('actions', document.querySelector('actions-section'));
    this.sections.set('reactions', document.querySelector('reactions-section'));
    this.sections.set('legendaryActions', document.querySelector('legendary-actions-section'));
  }

  reparseAllSections() {
    for (const section of this.sections.values()) {
      section.reparse();
    }
  }
}