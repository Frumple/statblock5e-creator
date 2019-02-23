export default class DisplayBlockListItem {
  constructor() {
    this.nameElement = document.createElement('h4');
    this.textElement = document.createElement('p');
  }

  get name() {
    return this.nameElement.textContent;
  }

  set name(name) {
    this.nameElement.textContent = name;
  }

  get text() {
    return this.textElement.textContent;
  }

  set text(text) {
    this.textElement.textContent = text;
  }
}