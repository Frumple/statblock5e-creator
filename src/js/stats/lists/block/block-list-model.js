import { createPropertyBlock } from '../../../helpers/export-helpers.js';

export default class BlockListModel {
  constructor(singleName) {
    this.singleName = singleName;

    this.reset();
  }

  reset() {
    this.blocks = [];
  }

  toHtml() {
    const fragment = document.createDocumentFragment();

    for (const block of this.blocks) {
      const propertyBlock = createPropertyBlock(block.name, block.parsedText);
      fragment.appendChild(propertyBlock);
    }

    return fragment;
  }
}