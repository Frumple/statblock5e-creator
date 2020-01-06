import * as sectionModule from './section.js';
import Creature from '../../../models/creature.js';

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
    Creature.size = this.editElements.size.value;
    Creature.type = this.editElements.type.value;
    Creature.tags = this.editElements.tags.value;
    Creature.alignment = this.editElements.alignment.value;

    Creature.useCustomSubtitleText = this.editElements.useCustomText.checked;
    Creature.customSubtitleText = this.editElements.customText.value;
  }

  updateView() {
    this.showElements.text.textContent = Creature.subtitle;
  }

  exportToJson() {
    return Creature.toJson();
  }

  exportToHtml() {
    return Creature.toHtml();
  }

  exportToHomebrewery() {
    return Creature.toHomebrewery();
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