import { Section, ShowElements, EditElements } from './section.js';
import CurrentContext from '../../../models/current-context.js';

import creatureSizesToHitDieSizes from '../../../data/creature-sizes-to-hit-die-sizes.js';
import creatureTypes from '../../../data/creature-types.js';
import creatureTags from '../../../data/creature-tags.js';
import creatureAlignments from '../../../data/creature-alignments.js';

import { addTextOnlyOptionsToElement, addValueOnlyOptionsToElement } from '../../../helpers/element-helpers.js';

export default class SubtitleSection extends Section {
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

    addTextOnlyOptionsToElement(this.editElements.size, Object.keys(creatureSizesToHitDieSizes));
    addTextOnlyOptionsToElement(this.editElements.type, creatureTypes);
    addValueOnlyOptionsToElement(this.editElements.tagsDataList, creatureTags);
    addTextOnlyOptionsToElement(this.editElements.alignment, creatureAlignments);
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

      this.editElements.size.addEventListener('input', this.onInputCreatureSize.bind(this));

      this.isInitialized = true;
    }
  }

  onInputCreatureSize() {
    const creatureSize = this.editElements.size.value;
    CurrentContext.creature.subtitle.size = creatureSize;
    CurrentContext.creature.hitPoints.hitDieSize = creatureSizesToHitDieSizes[creatureSize];
    this.dispatchCreatureSizeChangedEvent();
  }

  dispatchCreatureSizeChangedEvent() {
    const subtitleModel = CurrentContext.creature.subtitle;
    const changeEvent = new CustomEvent('creatureSizeChanged', {
      bubbles: true,
      composed: true,
      detail: {
        creatureSize: subtitleModel.size
      }
    });
    this.dispatchEvent(changeEvent);
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

    this.editElements.useCustomText.onInputCheckbox();
  }

  updateShowModeView() {
    this.showElements.text.textContent = CurrentContext.creature.subtitle.text;
  }
}

class SubtitleShowElements extends ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('subtitle-text');
  }
}

class SubtitleEditElements extends EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.size = shadowRoot.getElementById('size-input');
    this.type = shadowRoot.getElementById('type-input');
    this.tags = shadowRoot.getElementById('tags-input');
    this.tagsDataList = shadowRoot.getElementById('tags-list');
    this.alignment = shadowRoot.getElementById('alignment-input');
    this.useCustomText = shadowRoot.getElementById('use-custom-text-input');
    this.customText = shadowRoot.getElementById('custom-text-input');
  }

  get initiallySelectedElement() {
    return this.size;
  }
}