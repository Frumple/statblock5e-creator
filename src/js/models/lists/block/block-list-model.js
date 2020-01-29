import Model from '../../model.js';
import BlockModel from './block-model.js';

export default class BlockListModel extends Model {
  constructor(headingName, singleName) {
    super();

    this.headingName = headingName;
    this.singleName = singleName;

    this.blocks = [];

    this.reset();
  }

  reset() {
    this.clear();
  }

  clear() {
    this.blocks.length = 0;
  }

  fromJson(json) {
    this.clear();
    for (const jsonBlock of json.blocks) {
      const block = new BlockModel(jsonBlock.name, jsonBlock.text);
      this.blocks.push(block);
    }
  }

  toJson() {
    return {
      blocks: this.blocks.map(block => block.toJson())
    };
  }

  toHtml() {
    const fragment = document.createDocumentFragment();

    if (this.headingName) {
      const sectionHeading = document.createElement('h3');
      sectionHeading.textContent = this.headingName;
      fragment.appendChild(sectionHeading);
    }

    for (const block of this.blocks) {
      fragment.appendChild(block.toHtml());
    }

    return fragment;
  }

  toHomebrewery() {
    const heading = (this.headingName ? `> ### ${this.headingName}\n` : '');
    const homebreweryBlocks =
      this.blocks.map(block => block.toHomebrewery());
    const homebreweryBlocksAsText =
      homebreweryBlocks.join('\n>\n');

    return `${heading}${homebreweryBlocksAsText}`;
  }
}