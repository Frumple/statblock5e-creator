import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class AdvancedStats extends CustomAutonomousElement {
  static get elementName() { return 'advanced-stats'; }
  static get templatePath() { return 'src/html/containers/advanced-stats.html'; }

  constructor() {
    super(AdvancedStats.elementName);
  }
}
