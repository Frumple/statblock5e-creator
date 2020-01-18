import DivisibleContainer from './divisible-container.js';

export default class BasicStats extends DivisibleContainer {
  static get elementName() { return 'basic-stats'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'basic-stats',
      'src/html/elements/autonomous/containers/basic-stats.html');
  }

  constructor() {
    super(BasicStats.templatePaths);

    this.sections.set('armorClass', document.querySelector('armor-class-section'));
    this.sections.set('hitPoints', document.querySelector('hit-points-section'));
    this.sections.set('speed', document.querySelector('speed-section'));
  }

  updateHitPointsView() {
    this.sections.get('hitPoints').updateShowModeView();
  }
}
