import DragAndDropList from '/src/js/elements/autonomous/lists/drag-and-drop-list.js';

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
}