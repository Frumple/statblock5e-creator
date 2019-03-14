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
      this.editElements.fullName.addEventListener('input', this.onInputCreatureName.bind(this));
      this.editElements.shortName.addEventListener('input', this.onInputShortName.bind(this));
      this.editElements.properNoun.addEventListener('input', this.onInputProperNoun.bind(this));
    }
  }

  onInputCreatureName() {
    const fullName = this.editElements.fullName.value;

    if (fullName !== '') {
      Creature.fullName = fullName;
      this.dispatchCreatureNameChangedEvent();
    }    
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
    const changeEvent = new CustomEvent('creatureNameChanged', {
      bubbles: true,
      composed: true,
      detail: {
        creatureName: Creature.fullName,
        shortName: Creature.shortName,
        isProperNoun: Creature.isProperNoun
      }
    });
    this.dispatchEvent(changeEvent);
  }

  checkForErrors() {
    this.editElements.fullName.value = this.editElements.fullName.value.trim();
    this.editElements.type.value = this.editElements.type.value.trim();

    this.editElements.fullName.validate(this.errorMessages);
    this.editElements.type.validate(this.errorMessages);
  }

  updateShowSection() {
    let fullName = this.editElements.fullName.value;
    const size = this.editElements.size.value;
    const type = this.editElements.type.value;
    const alignment = this.editElements.alignment.value;

    fullName = capitalizeFirstLetter(fullName);
    const subtitle = `${size} ${type}, ${alignment}`;

    this.editElements.fullName.value = fullName;
    this.showElements.fullName.textContent = fullName;
    this.showElements.subtitle.textContent = subtitle;
  }
}

class HeadingShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.fullName = shadowRoot.getElementById('full-name-text');
    this.subtitle = shadowRoot.getElementById('subtitle-text');
  }
}

class HeadingEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.fullName = shadowRoot.getElementById('full-name-input');

    this.shortName = shadowRoot.getElementById('short-name-input');
    this.properNoun = shadowRoot.getElementById('proper-noun-input');

    this.size = shadowRoot.getElementById('size-input');
    this.type = shadowRoot.getElementById('type-input');
    this.alignment = shadowRoot.getElementById('alignment-input');
  }

  get initiallySelectedElement() {
    return this.fullName;
  }
}
