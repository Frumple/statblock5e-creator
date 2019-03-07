import CustomAutonomousElement from './custom-autonomous-element.js';

export default class PropertyLine extends CustomAutonomousElement {
  static get elementName() { return 'property-line'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'property-line',
      'src/html/elements/autonomous/property-line.html');
  }

  constructor() {
    super(PropertyLine.templatePaths);
  }
}
