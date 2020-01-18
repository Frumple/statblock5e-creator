import { capitalizeFirstLetter } from '../helpers/string-formatter.js';

export default class Title {
  constructor() {
    this.reset();
  }

  reset() {
    this._fullName = 'Commoner';
    this.shortName = '';
    this.isProperNoun = false;
  }

  set fullName(fullName) {
    this._fullName = capitalizeFirstLetter(fullName);
  }

  get fullName() {
    return this._fullName;
  }

  get grammaticalFullName() {
    return this.grammaticize(this._fullName);
  }

  get grammaticalShortName() {
    return this.grammaticize(this.shortName);
  }

  get grammaticalName() {
    return (this.shortName !== '') ?
      this.grammaticalShortName :
      this.grammaticalFullName;
  }

  grammaticize(name) {
    return (this.isProperNoun ? name : `the ${name.toLowerCase()}`);
  }

  toParserOptions() {
    return {
      name: this.grammaticalName,
      fullName: this.grammaticalFullName
    };
  }

  toJson() {
    return {
      fullName: this._fullName,
      shortName: this.shortName,
      isProperNoun: this.isProperNoun
    };
  }

  toHtml() {
    const titleElement = document.createElement('h1');
    titleElement.textContent = this.fullName;
    return titleElement;
  }

  toHomebrewery() {
    return `> ## ${this.fullName}`;
  }
}