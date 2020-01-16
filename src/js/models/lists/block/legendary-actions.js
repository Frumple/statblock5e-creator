import BlockListModel from './block-list-model.js';

export default class LegendaryActions extends BlockListModel {
  constructor() {
    super('Legendary Actions', 'Legendary Action');

    this.originalDescription = '[name] can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. [name] regains spent legendary actions at the start of its turn.';
    this.homebreweryDescription = '';
    this.htmlDescription = '';
  }

  toJson() {
    const json = super.toJson();
    json.description = this.originalDescription;
    return json;
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