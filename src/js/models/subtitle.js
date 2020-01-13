class Subtitle {
  constructor() {
    this.reset();
  }

  reset() {
    this.size = 'Medium';
    this.type = 'humanoid';
    this.tags = '';
    this.alignment = 'unaligned';

    this.useCustomSubtitleText = false;
    this.customSubtitleText = '';
  }

  get subtitle() {
    if (this.useCustomSubtitleText) {
      return this.customSubtitleText;
    }

    if (this.tags === '') {
      return `${this.size} ${this.type}, ${this.alignment}`;
    }

    return `${this.size} ${this.type} (${this.tags}), ${this.alignment}`;
  }

  toJson() {
    return {
      size: this.size,
      type: this.type,
      tags: this.tags,
      alignment: this.alignment,
      useCustomSubtitleText: this.useCustomSubtitleText,
      customSubtitleText: this.customSubtitleText
    };
  }

  toHtml() {
    const subtitleElement = document.createElement('h2');
    subtitleElement.textContent = this.subtitle;
    return subtitleElement;
  }

  toHomebrewery() {
    return `>*${this.subtitle}*`;
  }
}

export default new Subtitle();