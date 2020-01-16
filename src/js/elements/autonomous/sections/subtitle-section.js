import * as sectionModule from './section.js';
import CurrentContext from '../../../models/current-context.js';

const subtitle = CurrentContext.creature.subtitle;

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
    subtitle.size = this.editElements.size.value;
    subtitle.type = this.editElements.type.value;
    subtitle.tags = this.editElements.tags.value;
    subtitle.alignment = this.editElements.alignment.value;

    subtitle.useCustomSubtitleText = this.editElements.useCustomText.checked;
    subtitle.customSubtitleText = this.editElements.customText.value;
  }

  updateView() {
    this.showElements.text.textContent = subtitle.subtitle;
  }

  exportToJson() {
    return subtitle.toJson();
  }

  exportToHtml() {
    return subtitle.toHtml();
  }

  exportToHomebrewery() {
    return subtitle.toHomebrewery();
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