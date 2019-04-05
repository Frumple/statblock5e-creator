import * as ExportHelpers from '../helpers/export-helpers.js';

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
    this.htmlCustomText = '';
  }

  get originalText() {
    if (this.useCustomText) {
      return this.originalCustomText;
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

  toHtml() {    
    return ExportHelpers.createHtmlPropertyLine(this.headingName, this.htmlText);
  }

  toHomebrewery() {
    return ExportHelpers.createHomebreweryPropertyLine(this.headingName, this.originalText);
  }
}

export default new ArmorClass();