import CustomAutonomousElement from '/src/js/base/custom-autonomous-element.js';

export default class PropertyBlock extends CustomAutonomousElement {
  static get elementName() { return 'property-block'; }
  static get templatePath() { return 'src/html/elements/property-block.html'; }

  constructor() {
    super(PropertyBlock.elementName);
  }
}
