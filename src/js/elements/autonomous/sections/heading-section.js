import * as sectionModule from './section.js';
import { capitalizeFirstLetter } from '../../../helpers/string-formatter.js';

import Creature from '../../../stats/creature.js';

export default class HeadingSection extends sectionModule.Section {
  static get elementName() { return 'heading-section'; }
  static get templatePaths() {
    return super.templatePaths.set(
      'heading-section',
      'src/html/elements/autonomous/sections/heading-section.html');
  }

  constructor() {
    super(HeadingSection.templatePaths,
          HeadingShowElements,
          HeadingEditElements);
  }

  connectedCallback() {
    if (this.isConnected && ! this.isInitialized) {
      this.editElements.title.addEventListener('input', this.onInputCreatureName.bind(this));
      this.editElements.shortName.addEventListener('input', this.onInputShortName.bind(this));
      this.editElements.properNoun.addEventListener('input', this.onInputProperNoun.bind(this));
    }
  }

  onInputCreatureName() {
    Creature.name = this.editElements.title.value;
    this.dispatchCreatureNameChangedEvent();
  }

  onInputShortName() {
    Creature.shortName = this.editElements.shortName.value;
    this.dispatchCreatureNameChangedEvent();
  }

  onInputProperNoun() {
    Creature.isProperNoun = this.editElements.properNoun.checked;
    this.dispatchCreatureNameChangedEvent();
  }

  dispatchCreatureNameChangedEvent() {
    let changeEvent = new CustomEvent('creatureNameChanged', {
      bubbles: true,
      composed: true,
      detail: {
        creatureName: Creature.name,
        shortName: Creature.shortName,
        isProperNoun: Creature.isProperNoun
      }
    });
    this.dispatchEvent(changeEvent);
  }

  checkForErrors() {
    this.editElements.title.value = this.editElements.title.value.trim();
    this.editElements.type.value = this.editElements.type.value.trim();

    this.editElements.title.validate(this.errorMessages);
    this.editElements.type.validate(this.errorMessages);
  }

  updateShowSection() {
    let title = this.editElements.title.value;
    let size = this.editElements.size.value;
    let type = this.editElements.type.value;
    let alignment = this.editElements.alignment.value;

    title = capitalizeFirstLetter(title);
    let subtitle = `${size} ${type}, ${alignment}`;

    this.editElements.title.value = title;
    this.showElements.title.textContent = title;
    this.showElements.subtitle.textContent = subtitle;
  }
}

class HeadingShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.title = shadowRoot.getElementById('title-text');
    this.subtitle = shadowRoot.getElementById('subtitle-text');
  }
}

class HeadingEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.title = shadowRoot.getElementById('title-input');

    this.shortName = shadowRoot.getElementById('short-name-input');
    this.properNoun = shadowRoot.getElementById('proper-noun-input');

    this.size = shadowRoot.getElementById('size-input');
    this.type = shadowRoot.getElementById('type-input');
    this.alignment = shadowRoot.getElementById('alignment-input');
  }

  get initiallySelectedElement() {
    return this.title;
  }
}
