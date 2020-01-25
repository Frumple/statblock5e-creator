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

    return this.nonCustomText;
  }

  get htmlText() {
    if (this.useCustomText) {
      return this.htmlCustomText;
    }

    return this.nonCustomText;
  }

  get nonCustomText() {
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
}