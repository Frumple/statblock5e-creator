import BlockListModel from './block-list-model.js';

export default class Actions extends BlockListModel {
  constructor() {
    super('Actions', 'Action');
  }

  reset() {
    this.blocks = [{
      name: 'Club',
      text: '*Melee Weapon Attack:* mod[strmod + prof] to hit, reach 5 ft., one target. *Hit:* dmg[1d4 + strmod] bludgeoning damage.',
      homebreweryText: '*Melee Weapon Attack:* +2 to hit, reach 5 ft., one target. *Hit:* 2 (1d4) bludgeoning damage.',
      htmlText: '<em>Melee Weapon Attack:</em> +2 to hit, reach 5 ft., one target. <em>Hit:</em> 2 (1d4) bludgeoning damage.'
    }];
  }
}