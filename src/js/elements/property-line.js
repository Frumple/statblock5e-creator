import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class PropertyLine extends CustomAutonomousElement {
  static get elementName() { return 'property-line'; }
  static get templatePath() { return 'src/html/elements/property-line.html'; }

  constructor() {
    super(PropertyLine.elementName);
  }
}
