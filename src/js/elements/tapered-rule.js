import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class TaperedRule extends CustomAutonomousElement {
  static get elementName() { return 'tapered-rule'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'tapered-rule',
      'src/html/elements/tapered-rule.html');
  }

  constructor() {
    super(TaperedRule.templatePaths);
  }
}
