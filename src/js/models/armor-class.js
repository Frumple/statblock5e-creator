import { createPropertyLine } from '../helpers/export-helpers.js';

class ArmorClass {
  constructor() {
    this.headingName = 'Armor Class';

    this.reset();
  }

  reset() {
    this.armorClass = 10;
    this.armorType = '';
    this.hasShield = false;

    this.useCustomText = false;
    this.originalCustomText = '';
    this.parsedCustomText = '';
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

  get htmlText() {
    if (this.useCustomText) {
      return this.parsedCustomText;
    }

    return this.normalText;
  }

  toHtml() {    
    return createPropertyLine(this.headingName, this.htmlText);
  }
}

export default new ArmorClass();