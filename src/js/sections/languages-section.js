import * as sectionModule from '/src/js/base/section.js';
import AbilityScoreNames from '/src/js/helpers/ability-score-names.js';

export default class LanguagesSection extends sectionModule.Section {
  static get elementName() { return 'languages-section'; }
  static get templatePath() { return 'src/html/sections/languages-section.html'; }

  constructor() {
    super(LanguagesSection.elementName,
          LanguagesShowElements,
          LanguagesEditElements);

    this.editElements.input.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key === 'Enter') {
        keyEvent.preventDefault();

        this.addItem();
      }
    });

    this.editElements.addButton.addEventListener('click', () => {
      this.addItem();
    });

    this.addEventListener('attributeListItemRemoved', (event) => {
      let itemText = event.detail.itemText;
      this.editElements.datalist.setOptionEnabled(itemText, true);
    });
  }

  addItem() {
    let text = this.editElements.input.value.trim();
    this.editElements.input.value = text;

    this.errorMessages.clear();
    if (text === '') {
      this.errorMessages.add(this.editElements.input, 'Cannot add a blank item.');
    } else if(this.editElements.list.contains(text)) {
      this.errorMessages.add(this.editElements.input, 'Cannot add a duplicate item.');
    }
    if (this.errorMessages.any()) {
      return;
    }

    this.editElements.list.addItem(text);
    this.editElements.datalist.setOptionEnabled(text, false);

    this.editElements.input.value = '';
    this.editElements.input.select();
  }

  get initialSelectedEditElement() {
    return this.editElements.input;
  }

  checkForErrors() {

  }

  update() {
    this.editElements.input.value = '';

    let text = '';
    let itemTextList = this.editElements.list.itemTextList;
    itemTextList.forEach( (itemText) => {
      if (text === '') {
        text += itemText;
      } else {
        text += `, ${itemText}`;
      }
    });
    if (text === '') {
      // This is an EM dash (U+2014).
      // This appears significantly wider than a normal dash.
      text = '—';
    }

    this.showElements.text.textContent = text;
  }
}

class LanguagesShowElements extends sectionModule.ShowElements {
  constructor(shadowRoot) {
    super(shadowRoot);
    this.text = shadowRoot.getElementById('languages-text');
  }
}

class LanguagesEditElements extends sectionModule.EditElements {
  constructor(shadowRoot) {
    super(shadowRoot);

    this.input = shadowRoot.getElementById('languages-input');
    this.addButton = shadowRoot.getElementById('languages-add-button');
    this.list = shadowRoot.getElementById('languages-list');
    this.datalist = shadowRoot.getElementById('languages-datalist');
  }
}
