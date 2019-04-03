import BlockListModel from './block-list-model.js';

class LegendaryActions extends BlockListModel {
  constructor() {
    super('Legendary Action');

    this.originalDescription = '';
    this.parsedDescription = '';
  }

  toHtml() {
    const fragment = super.toHtml();

    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = this.parsedDescription;
    fragment.insertBefore(descriptionElement, fragment.firstElementChild);

    const headingElement = document.createElement('h3');
    headingElement.textContent = 'Legendary Actions';
    fragment.insertBefore(headingElement, fragment.firstElementChild);

    return fragment;
  }
}

export default new LegendaryActions();