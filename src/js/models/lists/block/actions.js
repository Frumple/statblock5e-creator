import BlockListModel from './block-list-model.js';
import isRunningInNode from '../../../helpers/is-running-in-node.js';

export default class Actions extends BlockListModel {
  constructor() {
    super('Actions', 'Action');
  }

  reset() {
    if (isRunningInNode) {
      this.blocks = [];
    } else {
      this.blocks = [{
        name: 'Club',
        text: '*Melee Weapon Attack:* mod[str + prof] to hit, reach 5 ft., one target. *Hit:* dmg[1d4 + str] bludgeoning damage.',
        homebreweryText: '*Melee Weapon Attack:* +2 to hit, reach 5 ft., one target. *Hit:* 2 (1d4) bludgeoning damage.',
        htmlText: '<em>Melee Weapon Attack:</em> +2 to hit, reach 5 ft., one target. <em>Hit:</em> 2 (1d4) bludgeoning damage.'
      }];
    }
  }
}