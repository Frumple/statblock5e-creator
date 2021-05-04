import DisplayBlockList from './display-block-list.js';

export default class LegendaryActionDisplayBlockList extends DisplayBlockList {
  static get elementName() { return 'legendary-action-display-block-list'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'legendary-action-display-block-list',
      'src/html/elements/autonomous/lists/legendary-action-display-block-list.html');
  }

  constructor() {
    super(LegendaryActionDisplayBlockList.templatePaths);
  }

  get blockElementTag() {
    return 'legendary-action-display-block';
  }
}