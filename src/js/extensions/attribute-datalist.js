import CustomElementMixins from '/src/js/helpers/test/custom-element-mixins.js';
import isRunningInNode from '/src/js/helpers/is-running-in-node.js';
import { copyObjectProperties } from '/src/js/helpers/object-helpers.js';

export default class AttributeDataList extends HTMLDataListElement {
  static async define() {
    const elementName = 'attribute-datalist';
    CustomElementMixins.define(elementName, AttributeDataListMixin);

    if (! isRunningInNode) {
      customElements.define(elementName, this, { extends: 'datalist' });
    }    
  }

  constructor() {
    super();

    copyObjectProperties(this, AttributeDataListMixin);
    this.initializeMixin();
  }
}

const AttributeDataListMixin = {
  initializeMixin() {
    return;
  },

  setOptionEnabled(optionText, isEnabled) {
    let item = null;

    // JSDOM's implementation of HTMLDataListElement lacks the 'options'
    // property, so we have to find the matching option element manually.
    if (isRunningInNode) {      
      item = this.findOption(optionText);
    } else {
      item = this.options.namedItem(optionText);
    }    

    if (item !== null) {
      if (isEnabled) {
        item.removeAttribute('disabled');
      } else {
        item.setAttribute('disabled', '');
      }
    }
  },

  findOption(optionText) {
    for (const child of this.childNodes) {
      if (child.tagName === 'OPTION' && child.value === optionText) {
        return child;
      }
    }

    return null;
  }
};