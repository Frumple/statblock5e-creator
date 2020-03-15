import BlockListModel from './block-list-model.js';

export default class LegendaryActions extends BlockListModel {
  constructor() {
    super('Legendary Actions',
          'Legendary Action',
          'legendary_actions');
  }

  reset() {
    super.reset();

    this.description = '[name] can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. [name] regains spent legendary actions at the start of its turn.';
    this.markdownDescription = '';
    this.htmlDescription = '';
  }

  fromOpen5e(json) {
    super.fromOpen5e(json);
    this.description = json['legendary_desc'];
  }

  fromJson(json) {
    super.fromJson(json);
    this.description = json.description;
  }

  toJson() {
    const json = super.toJson();
    json.description = this.description;
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

  toMarkdown() {
    const heading = `> ### ${this.headingName}\n`;
    const description = `> ${this.markdownDescription}\n`;
    const markdownBlocks =
      this.blocks.map(block => block.toMarkdown());
    const markdownBlocksAsText =
      markdownBlocks.join('\n>\n');

    return `${heading}${description}${markdownBlocksAsText}`;
  }
}