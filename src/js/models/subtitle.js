export default class Subtitle {
  constructor() {
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

  get text() {
    if (this.useCustomText) {
      return this.customText;
    }

    if (this.tags === '') {
      return `${this.size} ${this.type}, ${this.alignment}`;
    }

    return `${this.size} ${this.type} (${this.tags}), ${this.alignment}`;
  }

  fromJson(json) {
    this.size = json.size;
    this.type = json.type;
    this.tags = json.tags;
    this.alignment = json.alignment;
    this.useCustomText = json.useCustomText;
    this.customText = json.customText;
  }

  toJson() {
    return {
      size: this.size,
      type: this.type,
      tags: this.tags,
      alignment: this.alignment,
      useCustomText: this.useCustomText,
      customText: this.customText
    };
  }

  toHtml() {
    const subtitleElement = document.createElement('h2');
    subtitleElement.textContent = this.text;
    return subtitleElement;
  }

  toHomebrewery() {
    return `>*${this.text}*`;
  }
}