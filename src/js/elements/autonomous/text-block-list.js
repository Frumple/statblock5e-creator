import DragAndDropList from '/src/js/elements/autonomous/drag-and-drop-list.js';

export default class TextBlockList extends DragAndDropList {
  static get elementName() { return 'text-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'text-block-list',
      'src/html/elements/autonomous/text-block-list.html');
  }

  constructor() {
    super(TextBlockList.templatePaths);
  }
}