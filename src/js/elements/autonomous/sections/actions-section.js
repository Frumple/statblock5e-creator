import * as blockListSectionModule from './block-list-section.js';
import Actions from '../../../models/lists/block/actions.js';
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
          Actions);

    this.empty = true;
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

      if (! isRunningInNode) {
        this.addBlock('Club', '*Melee Weapon Attack:* mod{strmod + prof} to hit, reach 5 ft., one target. *Hit:* dmg{1d4 + strmod} bludgeoning damage.');
        this.save();
      }

      this.isInitialized = true;
    }
  }
}