import * as sectionModule from './section.js';
import CurrentContext from '../../../models/current-context.js';

export default class SubtitleSection extends sectionModule.Section {
  static get elementName() { return 'subtitle-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'subtitle-section',
      'src/html/elements/autonomous/sections/subtitle-section.html');
  }

  constructor() {
    super(SubtitleSection.templatePaths,
          'subtitle',
          SubtitleShowElements,
          SubtitleEditElements);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      super.connectedCallback();

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
    const subtitleModel = CurrentContext.creature.subtitle;
    subtitleModel.size = this.editElements.size.value;
    subtitleModel.type = this.editElements.type.value;
    subtitleModel.tags = this.editElements.tags.value;
    subtitleModel.alignment = this.editElements.alignment.value;

    subtitleModel.useCustomText = this.editElements.useCustomText.checked;
    subtitleModel.customText = this.editElements.customText.value;
  }

  updateEditModeView() {
    const subtitleModel = CurrentContext.creature.subtitle;
    this.editElements.size.value = subtitleModel.size;
    this.editElements.type.value = subtitleModel.type;
    this.editElements.tags.value = subtitleModel.tags;
    this.editElements.alignment.value = subtitleModel.alignment;

    this.editElements.useCustomText.checked = subtitleModel.useCustomText;
    this.editElements.customText.value = subtitleModel.customText;
  }

  updateShowModeView() {
    this.showElements.text.textContent = CurrentContext.creature.subtitle.text;
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