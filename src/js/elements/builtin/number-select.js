import { convertToInteger } from '../../helpers/number-helpers.js';

export default class NumberSelect extends HTMLSelectElement {
  static async define() {
    const elementName = 'number-select';
    customElements.define(elementName, this, { extends: 'select' });
  }

  constructor() {
    super();
  }

  get valueAsInt() {
    return convertToInteger(this.value);
  }
}