import BlockListModel from './block-list-model.js';

class Reactions extends BlockListModel {
  constructor() {
    super('Reactions', 'Reaction');
  }
}

export default new Reactions();