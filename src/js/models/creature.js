import { capitalizeFirstLetter } from '../helpers/string-formatter.js';

class Creature {
  constructor() {
    this.reset();
  }

  reset() {
    this._fullName = 'Commoner';
    this.shortName = '';
    this.isProperNoun = false;
    
    this.size = 'Medium';
    this.type = 'humanoid';
    this.alignment = 'unaligned';
  }

  set fullName(fullName) {
    this._fullName = capitalizeFirstLetter(fullName);
  }

  get fullName() {
    return this._fullName;
  }

  get title() {
    return this._fullName;
  }

  get subtitle() {
    return `${this.size} ${this.type}, ${this.alignment}`;
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

  toHtml() {
    const creatureHeading = document.createElement('creature-heading');
    const titleElement = document.createElement('h1');
    const subtitleElement = document.createElement('h2');

    titleElement.textContent = this.title;
    subtitleElement.textContent = this.subtitle;

    creatureHeading.appendChild(titleElement);
    creatureHeading.appendChild(subtitleElement);

    return creatureHeading;
  }

  toHomebrewery() {
    return `> ## ${this.title}\n>*${this.subtitle}*`;
  }
}

export default new Creature();