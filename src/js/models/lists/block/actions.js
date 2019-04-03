import BlockListModel from './block-list-model.js';

class Actions extends BlockListModel {
  constructor() {
    super('Action');
  }

  toHtml() {
    const fragment = super.toHtml();

    const sectionHeading = document.createElement('h3');
    sectionHeading.textContent = 'Actions';
    fragment.insertBefore(sectionHeading, fragment.firstElementChild);

    return fragment;
  }
}

export default new Actions();