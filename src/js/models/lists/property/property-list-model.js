import PropertyLineModel from '../../property-line-model.js';

export default class PropertyListModel extends PropertyLineModel {
  constructor(headingName, singleName, open5eJsonKey) {
    super(headingName);

    this.singleName = singleName;
    this.open5eJsonKey = open5eJsonKey;

    this.reset();
  }

  reset() {
    this.clear();
  }

  clear() {
    this.items = [];
  }

  get jsonPropertyNames() {
    return ['items'];
  }

  get text() {
    let text = '';
    let isFirstItem = true;
    let previousItemHasCommas = false;

    for (const item of this.items) {
      const currentItemHasCommas = item.includes(',');

      if (isFirstItem) {
        text = item;
        isFirstItem = false;
      } else if (previousItemHasCommas || currentItemHasCommas) {
        text += `; ${item}`;
      } else {
        text += `, ${item}`;
      }

      previousItemHasCommas = currentItemHasCommas;
    }

    return text;
  }

  get htmlText() {
    return this.text;
  }

  fromOpen5e(json) {
    this.clear();

    const inputText = json[this.open5eJsonKey];

    // Begin by splitting the incoming text by semicolon delimiters
    const semicolonTokens = inputText.split(';').map(token => token.trim());
    for (const semicolonToken of semicolonTokens) {
      // If the token contains the phrase 'bludgeoning, piercing, and slashing',
      // treat it as one item and do not split it by commas.
      if (semicolonToken.includes('bludgeoning, piercing, and slashing')) {
        this.items.push(semicolonToken);

      // Otherwise, split the token further by commas
      // and add the resulting tokens as items.
      } else {
        const commaTokens = semicolonToken.split(',').map(token => token.trim());
        Array.prototype.push.apply(this.items, commaTokens);
      }
    }
  }
}