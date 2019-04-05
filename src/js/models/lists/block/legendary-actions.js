import BlockListModel from './block-list-model.js';

class LegendaryActions extends BlockListModel {
  constructor() {
    super('Legendary Actions', 'Legendary Action');

    this.originalDescription = '';
    this.homebreweryDescription = '';
    this.htmlDescription = '';
  }

  toHtml() {
    const fragment = super.toHtml();

    const firstBlockElement = fragment.querySelector('property-block');

    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = this.htmlDescription;
    fragment.insertBefore(descriptionElement, firstBlockElement);

    return fragment;
  }

  toHomebrewery() {
    const heading = `> ### ${this.headingName}\n`;
    const description = `> ${this.homebreweryDescription}\n`;
    const homebreweryBlocks = 
      this.blocks.map(block => block.toHomebrewery());
    const homebreweryBlocksAsText =
      homebreweryBlocks.join('\n>\n');      

    return `${heading}${description}${homebreweryBlocksAsText}`;
  }
}

export default new LegendaryActions();