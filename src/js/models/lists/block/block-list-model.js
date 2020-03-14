import Model from '../../model.js';
import BlockModel from './block-model.js';

export default class BlockListModel extends Model {
  constructor(headingName, singleName, open5eJsonKey) {
    super();

    this.headingName = headingName;
    this.singleName = singleName;
    this.open5eJsonKey = open5eJsonKey;

    this.blocks = [];

    this.reset();
  }

  reset() {
    this.clear();
  }

  clear() {
    this.blocks.length = 0;
  }

  fromOpen5e(json) {
    this.clear();

    const input = json[this.open5eJsonKey];

    if (input !== '') {
      for (const inputItem of input) {
        const name = inputItem.name;
        const desc = BlockListModel.parseOpen5eBlockDescription(inputItem.desc);

        const block = new BlockModel(name, desc);
        this.blocks.push(block);
      }
    }
  }

  static parseOpen5eBlockDescription(desc) {
    const newLineIndentRegex = /(?<=\S)(?!(\*|_))\n(?=\S)(?!(\*|_))/g;
    const bulletRemovalRegex = / *• */g;

    // For each single newline '\n' character surrounded by whitespace characters but not any markdown characters, add an indent of 2 spaces following it
    desc = desc.replace(newLineIndentRegex, '\n  ');

    // Remove all bullet character '•' and any space characters (not whitespace) surrounding it
    desc = desc.replace(bulletRemovalRegex, '');

    return desc;
  }

  fromJson(json) {
    this.reset();

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

  toMarkdown() {
    const heading = (this.headingName ? `> ### ${this.headingName}\n` : '');
    const markdownBlocks =
      this.blocks.map(block => block.toMarkdown());
    const markdownBlocksAsText =
      markdownBlocks.join('\n>\n');

    return `${heading}${markdownBlocksAsText}`;
  }
}