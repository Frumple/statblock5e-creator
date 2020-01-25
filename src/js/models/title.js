export default class Title {
  constructor() {
    this.reset();
  }

  reset() {
    this.fullName = 'Commoner';
    this.shortName = '';
    this.isProperNoun = false;
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

  fromJson(json) {
    this.fullName = json.fullName;
    this.shortName = json.shortName;
    this.isProperNoun = json.isProperNoun;
  }

  toJson() {
    return {
      fullName: this.fullName,
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