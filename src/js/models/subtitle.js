import Model from './model.js';

export default class Subtitle extends Model{
  constructor() {
    super();

    this.reset();
  }

  reset() {
    this.size = 'Medium';
    this.type = 'humanoid';
    this.tags = '';
    this.alignment = 'unaligned';

    this.useCustomText = false;
    this.customText = '';
  }

  get jsonPropertyNames() {
    return [
      'size',
      'type',
      'tags',
      'alignment',
      'useCustomText',
      'customText'
    ];
  }

  get text() {
    if (this.useCustomText) {
      return this.customText;
    }

    if (this.tags === '') {
      return `${this.size} ${this.type}, ${this.alignment}`;
    }

    return `${this.size} ${this.type} (${this.tags}), ${this.alignment}`;
  }

  toHtml() {
    const subtitleElement = document.createElement('h2');
    subtitleElement.textContent = this.text;
    return subtitleElement;
  }

  toMarkdown() {
    return `>*${this.text}*`;
  }
}