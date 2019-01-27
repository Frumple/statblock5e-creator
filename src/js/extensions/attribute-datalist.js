export default class AttributeDataList extends HTMLDataListElement {
  static async define() {
    customElements.define('attribute-datalist', this, { extends: 'datalist' });
  }

  constructor() {
    super();
  }

  setOptionEnabled(optionText, isEnabled) {
    let item = this.options.namedItem(optionText);

    if (item !== null) {
      if (isEnabled) {
        item.removeAttribute('disabled');
      } else {
        item.setAttribute('disabled', '');
      }
    }
  }
}
