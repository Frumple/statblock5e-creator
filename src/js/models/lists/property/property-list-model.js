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

    if (inputText !== '') {
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

          // If the phrase 'understands <language>, <language> ... but' is
          // present across consecutive tokens, merge these tokens together
          const commaTokensWithMerge = PropertyListModel.mergeUnderstandsButTokens(commaTokens);

          Array.prototype.push.apply(this.items, commaTokensWithMerge);
        }
      }
    }
  }

  static mergeUnderstandsButTokens(commaTokens) {
    let firstIndex = null;
    for (const [index, token] of commaTokens.entries()) {
      if(firstIndex === null && token.startsWith('understands')) {
        firstIndex = index;
      } else if (firstIndex !== null && token.includes('but')) {
        const subsetTokens = commaTokens.slice(firstIndex, index + 1);
        const mergedTokens = subsetTokens.join(', ');
        commaTokens.splice(firstIndex, index - firstIndex + 1, mergedTokens);
      }
    }

    return commaTokens;
  }
}