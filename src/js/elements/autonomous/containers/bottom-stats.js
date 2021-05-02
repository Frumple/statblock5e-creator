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

    this.sections.set('specialTraits', this.shadowRoot.querySelector('special-traits-section'));
    this.sections.set('actions', this.shadowRoot.querySelector('actions-section'));
    this.sections.set('reactions', this.shadowRoot.querySelector('reactions-section'));
    this.sections.set('legendaryActions', this.shadowRoot.querySelector('legendary-actions-section'));

    // console.log(this.sections);
  }

  reparseAllSections() {
    for (const section of this.sections.values()) {
      section.reparse();
    }
  }
}