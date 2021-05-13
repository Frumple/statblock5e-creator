import CustomAutonomousElement from './custom-autonomous-element.js';

export default class ExpressionMenu extends CustomAutonomousElement {
  static get elementName() { return 'expression-menu'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'expression-menu',
      'src/html/elements/autonomous/expression-menu.html');
  }

  constructor() {
    super(ExpressionMenu.templatePaths);
  }
}