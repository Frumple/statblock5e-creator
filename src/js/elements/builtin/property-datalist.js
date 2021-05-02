export default class PropertyDataList extends HTMLDataListElement {
  static async define() {
    const elementName = 'property-datalist';
    customElements.define(elementName, this, { extends: 'datalist' });
  }

  constructor() {
    super();
  }

  setOptionEnabled(optionText, isEnabled) {
    const item = this.findOption(optionText);

    if (item !== null) {
      if (isEnabled) {
        item.removeAttribute('disabled');
      } else {
        item.setAttribute('disabled', '');
      }
    }
  }

  findOption(optionText) {
    for (const child of this.childNodes) {
      if (child.tagName === 'OPTION' && child.value === optionText) {
        return child;
      }
    }

    return null;
  }
}