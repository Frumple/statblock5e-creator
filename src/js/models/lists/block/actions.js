import BlockListModel from './block-list-model.js';
import BlockModel from './block-model.js';
import isRunningInJsdom from '../../../helpers/is-running-in-jsdom.js';

export default class Actions extends BlockListModel {
  constructor() {
    super('Actions',
          'Action',
          'actions');
  }

  reset() {
    if (isRunningInJsdom) {
      this.blocks = [];
    } else {
      const club = new BlockModel(
        'Club',
        '*Melee Weapon Attack:* atk[str] to hit, reach 5 ft., one target. *Hit:* dmg[1d4 + str] bludgeoning damage.',
        '*Melee Weapon Attack:* +2 to hit, reach 5 ft., one target. *Hit:* 2 (1d4) bludgeoning damage.',
        '<em>Melee Weapon Attack:</em> +2 to hit, reach 5 ft., one target. <em>Hit:</em> 2 (1d4) bludgeoning damage.'
      );
      this.blocks = [club];
    }
  }
}