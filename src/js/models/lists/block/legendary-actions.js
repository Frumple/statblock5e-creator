import BlockListModel from './block-list-model.js';

class LegendaryActions extends BlockListModel {
  constructor() {
    super('Legendary Actions', 'Legendary Action');

    this.originalDescription = '';
    this.parsedDescription = '';
  }

  toHtml() {
    const fragment = super.toHtml();

    const firstBlockElement = fragment.querySelector('property-block');

    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = this.parsedDescription;
    fragment.insertBefore(descriptionElement, firstBlockElement);

    return fragment;
  }

  toHomebrewery() {
    const heading = `> ### ${this.headingName}\n`;
    // TODO: Get description with expressions parsed, but not markdown
    const description = `> ${this.originalDescription}\n`;
    const homebreweryBlocks = 
      this.blocks.map(block => block.toHomebrewery());
    const homebreweryBlocksAsText =
      homebreweryBlocks.join('\n\n');      

    return `${heading}${description}${homebreweryBlocksAsText}`;
  }
}

export default new LegendaryActions();