export default class BlockListModel {
  constructor(headingName, singleName) {
    this.headingName = headingName;
    this.singleName = singleName;

    this.reset();
  }

  reset() {
    this.blocks = [];
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