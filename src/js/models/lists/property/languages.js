import PropertyListModel from './property-list-model.js';

export default class Languages extends PropertyListModel {
  constructor() {
    super('Languages',
          'Language');
  }

  get text() {
    let text = super.text;

    if (text === '') {
      // This is an EM dash (U+2014).
      // This appears significantly wider than a normal dash.
      text = '—';
    }

    return text;
  }
}