import EditableBlockList from './editable-block-list.js';

export default class LegendaryActionEditableBlockList extends EditableBlockList {
  static get elementName() { return 'legendary-action-editable-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'legendary-action-editable-block-list',
      'src/html/elements/autonomous/lists/legendary-action-editable-block-list.html');
  }

  constructor() {
    super(LegendaryActionEditableBlockList.templatePaths);
  }

  get blockElementTag() {
    return 'legendary-action-editable-block';
  }
}