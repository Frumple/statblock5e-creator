import * as blockListSectionModule from './block-list-section.js';
import isRunningInNode from '../../../helpers/is-running-in-node.js';

export default class ActionsSection extends blockListSectionModule.BlockListSection {
  static get elementName() { return 'actions-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'actions-section',
      'src/html/elements/autonomous/sections/actions-section.html');
  }

  constructor() {
    super(ActionsSection.templatePaths,
          'Action');

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      if (! isRunningInNode) {
        this.addBlock('Club', '*Melee Weapon Attack:* +2 to hit, reach 5 ft., one target. *Hit:* 2 (1d4) bludgeoning damage.');
        this.save();
      }      

      this.isInitialized = true;
    }
  }

  exportToHtml() {
    const fragment = super.exportToHtml();

    const sectionHeading = document.createElement('h3');
    sectionHeading.textContent = 'Actions';
    fragment.insertBefore(sectionHeading, fragment.firstElementChild);

    return fragment;
  }
}