import PropertyLineModel from './property-line-model.js';

export default class ArmorClass extends PropertyLineModel {
  constructor() {
    super('Armor Class');

    this.reset();
  }

  reset() {
    this.armorClass = 10;
    this.armorType = '';
    this.hasShield = false;

    this.useCustomText = false;
    this.customText = '';
    this.htmlCustomText = '';
  }

  get jsonPropertyNames() {
    return [
      'armorClass',
      'armorType',
      'hasShield',
      'useCustomText',
      'customText'
    ];
  }

  get text() {
    if (this.useCustomText) {
      return this.customText;
    }

    return this.normalText;
  }

  get htmlText() {
    if (this.useCustomText) {
      return this.htmlCustomText;
    }

    return this.normalText;
  }

  get normalText() {
    if (this.armorType) {
      if (this.hasShield) {
        return `${this.armorClass} (${this.armorType}, shield)`;
      } else {
        return `${this.armorClass} (${this.armorType})`;
      }
    } else {
      if (this.hasShield) {
        return `${this.armorClass} (shield)`;
      } else {
        return this.armorClass;
      }
    }
  }

  fromOpen5e(json) {
    this.reset();

    const armorClass = json['armor_class'];
    const armorDesc = json['armor_desc'] === null ? '' : json['armor_desc'];

    // If the armor_desc includes markdown emphasis characters, use custom text
    if (armorDesc.includes('*') || armorDesc.includes('_')) {
      this.useCustomText = true;
      this.customText = `${armorClass} (${armorDesc})`;

    // Otherwise, set armor class as normal. Armor type and shield are determined by parsing the armor_desc.
    } else {
      const shieldRegex = /,*\s*[and]*\s*shield/;
      const matches = armorDesc.match(shieldRegex);

      if (matches !== null) {
        const matchIndex = matches['index'];

        this.armorType = armorDesc.slice(0, matchIndex);
        this.hasShield = true;
      } else {
        this.armorType = armorDesc;
        this.hasShield = false;
      }

      this.armorClass = armorClass;
    }
  }
}