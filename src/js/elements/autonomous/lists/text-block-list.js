import DragAndDropList from '/src/js/elements/autonomous/lists/drag-and-drop-list.js';
import { trimTrailingPeriods } from '/src/js/helpers/string-formatter.js'

export default class TextBlockList extends DragAndDropList {
  static get elementName() { return 'text-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'text-block-list',
      'src/html/elements/autonomous/lists/text-block-list.html');
  }

  constructor() {
    super(TextBlockList.templatePaths);
  }

  get textBlocks() {
    let textBlocks = Array.from(this.querySelectorAll('text-block-list-item'));
    return textBlocks;
  }

  addTextBlock() {
    let listItemElement = document.createElement('text-block-list-item');
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