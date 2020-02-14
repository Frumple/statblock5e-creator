import Model from './model.js';

export default class Title extends Model {
  constructor() {
    super();

    this.reset();
  }

  reset() {
    this.fullName = 'Commoner';
    this.shortName = '';
    this.isProperNoun = false;
  }

  get jsonPropertyNames() {
    return [
      'fullName',
      'shortName',
      'isProperNoun'
    ];
  }

  get grammaticalFullName() {
    return this.grammaticize(this.fullName);
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
    const titleElement = document.createElement('h1');
    titleElement.textContent = this.fullName;
    return titleElement;
  }

  toMarkdown() {
    return `> ## ${this.fullName}`;
  }
}