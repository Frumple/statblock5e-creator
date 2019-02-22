import DragAndDropList from '/src/js/elements/autonomous/lists/drag-and-drop-list.js';
import { trimTrailingPeriods } from '/src/js/helpers/string-formatter.js';

export default class EditableBlockList extends DragAndDropList {
  static get elementName() { return 'editable-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'editable-block-list',
      'src/html/elements/autonomous/lists/editable-block-list.html');
  }

  constructor() {
    super(EditableBlockList.templatePaths);
  }

  get textBlocks() {
    let textBlocks = Array.from(this.querySelectorAll('editable-block-list-item'));
    return textBlocks;
  }

  addTextBlock() {
    let listItemElement = document.createElement('editable-block-list-item');
    this.appendChild(listItemElement);
  }

  trimTrailingPeriodsInNames() {
    let textBlocks = this.textBlocks;
    for (const textBlock of textBlocks) {
      textBlock.name = trimTrailingPeriods(textBlock.name);
    }
  }

  validate(errorMessages) {
    let textBlocks = this.textBlocks;
    for (const textBlock of textBlocks) {
      textBlock.validate(errorMessages);
    }
  }
}