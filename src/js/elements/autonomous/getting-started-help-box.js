import CustomAutonomousElement from './custom-autonomous-element.js';

export default class GettingStartedHelpBox extends CustomAutonomousElement {
  static get elementName() { return 'getting-started-help-box'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'getting-started-help-box',
      'src/html/elements/autonomous/getting-started-help-box.html');
  }

  constructor() {
    super(GettingStartedHelpBox.templatePaths);
  }
}