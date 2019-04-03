import BlockListModel from './block-list-model.js';

class Reactions extends BlockListModel {
  constructor() {
    super('Reaction');
  }

  toHtml() {
    const fragment = super.toHtml();

    const sectionHeading = document.createElement('h3');
    sectionHeading.textContent = 'Reactions';
    fragment.insertBefore(sectionHeading, fragment.firstElementChild);

    return fragment;
  }
}

export default new Reactions();