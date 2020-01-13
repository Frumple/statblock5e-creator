import * as sectionModule from './section.js';
import Subtitle from '../../../models/subtitle.js';

export default class SubtitleSection extends sectionModule.Section {
  static get elementName() { return 'subtitle-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'subtitle-section',
      'src/html/elements/autonomous/sections/subtitle-section.html');
  }

  constructor() {
    super(SubtitleSection.templatePaths,
          SubtitleShowElements,
          SubtitleEditElements);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.editElements.useCustomText.disableElementsWhenChecked(
        this.editElements.size,
        this.editElements.type,
        this.editElements.tags,
        this.editElements.alignment);

      this.editElements.useCustomText.enableElementsWhenChecked(
        this.editElements.customText);

      this.isInitialized = true;
    }
  }

  checkForErrors() {
    this.editElements.tags.value = this.editElements.tags.value.trim();

    if (this.editElements.useCustomText.checked) {
      this.editElements.customText.validate(this.errorMessages);
    }
  }

  updateModel() {
    Subtitle.size = this.editElements.size.value;
    Subtitle.type = this.editElements.type.value;
    Subtitle.tags = this.editElements.tags.value;
    Subtitle.alignment = this.editElements.alignment.value;

    Subtitle.useCustomSubtitleText = this.editElements.useCustomText.checked;
    Subtitle.customSubtitleText = this.editElements.customText.value;
  }

  updateView() {
    this.showElements.text.textContent = Subtitle.subtitle;
  }

  exportToJson() {
    return Subtitle.toJson();
  }

  exportToHtml() {
    return Subtitle.toHtml();
  }

  exportToHomebrewery() {
    return Subtitle.toHomebrewery();
  }
}

class SubtitleShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('subtitle-text');
  }
}

class SubtitleEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.size = shadowRoot.getElementById('size-input');
    this.type = shadowRoot.getElementById('type-input');
    this.tags = shadowRoot.getElementById('tags-input');
    this.alignment = shadowRoot.getElementById('alignment-input');
    this.useCustomText = shadowRoot.getElementById('use-custom-text-input');
    this.customText = shadowRoot.getElementById('custom-text-input');
  }

  get initiallySelectedElement() {
    return this.size;
  }
}