import CustomAutonomousElement from '../custom-autonomous-element.js';

export default class DropDownMenu extends CustomAutonomousElement {
  static get elementName() { return 'drop-down-menu'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'drop-down-menu',
      'src/html/elements/autonomous/menus/drop-down-menu.html');
  }

  constructor() {
    super(DropDownMenu.templatePaths);
  }
}