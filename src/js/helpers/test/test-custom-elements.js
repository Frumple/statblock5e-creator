import CustomBuiltinElementMixins from '/src/js/helpers/custom-builtin-element-mixins.js';
import { traverseElements } from '/src/js/helpers/element-helpers.js';

import BlockTextArea from '/src/js/elements/builtin/block-textarea.js';
import EnableDisableElementsCheckbox from '/src/js/elements/builtin/enable-disable-elements-checkbox.js';
import IntegerInput from '/src/js/elements/builtin/number-input.js';
import PropertyDataList from '/src/js/elements/builtin/property-datalist.js';
import SanitizedParagraph from '/src/js/elements/builtin/sanitized-paragraph.js';
import TextInput from '/src/js/elements/builtin/text-input.js';

import ErrorMessages from '/src/js/elements/autonomous/error-messages.js';
import PropertyList from '/src/js/elements/autonomous/lists/property-list.js';
import PropertyListItem from '/src/js/elements/autonomous/lists/property-list-item.js';
import DisplayBlockList from '/src/js/elements/autonomous/lists/display-block-list.js';
import DisplayBlockListItem from '/src/js/elements/autonomous/lists/display-block-list-item.js';
import EditableBlockList from '/src/js/elements/autonomous/lists/editable-block-list.js';
import EditableBlockListItem from '/src/js/elements/autonomous/lists/editable-block-list-item.js';
import GenerateAttackDialog from '../../elements/autonomous/dialogs/generate-attack-dialog';

export async function define() {
  const customElements = [];

  customElements.push(BlockTextArea);
  customElements.push(EnableDisableElementsCheckbox);
  customElements.push(IntegerInput);
  customElements.push(PropertyDataList);
  customElements.push(SanitizedParagraph);
  customElements.push(TextInput);

  customElements.push(ErrorMessages);
  customElements.push(PropertyList);
  customElements.push(PropertyListItem);
  customElements.push(DisplayBlockList);
  customElements.push(DisplayBlockListItem);
  customElements.push(EditableBlockList);
  customElements.push(EditableBlockListItem);

  for (const element of customElements) {
    await element.define();
  }
}

export function initializeSection(section) {
  replaceWithFakes(section);

  const maxTraversalDepth = 5;

  traverseElements(section.showElements, maxTraversalDepth, (element) => {
    CustomBuiltinElementMixins.applyToElement(element);
  });

  traverseElements(section.editElements, maxTraversalDepth, (element) => {
    CustomBuiltinElementMixins.applyToElement(element);
  });
}

function replaceWithFakes(section) {
  if (section.errorMessages && section.errorMessages.tagName === 'ERROR-MESSAGES') {
    section.errorMessages = new ErrorMessages();
  }

  if (section.editElements.propertyList && section.editElements.propertyList.tagName === 'PROPERTY-LIST') {
    section.editElements.propertyList = new PropertyList(section);
  }

  if (section.showElements.displayList && section.showElements.displayList.tagName === 'DISPLAY-BLOCK-LIST') {
    section.showElements.displayList = new DisplayBlockList();
  }

  if (section.editElements.editableList && section.editElements.editableList.tagName === 'EDITABLE-BLOCK-LIST') {
    section.editElements.editableList = new EditableBlockList();
  }

  if (section.editElements.generateAttackDialog && section.editElements.generateAttackDialog.tagName === 'GENERATE-ATTACK-DIALOG') {
    section.editElements.generateAttackDialog = new GenerateAttackDialog(section);

    if (section.editElements.generateAttackDialog.errorMessages && section.editElements.generateAttackDialog.errorMessages.tagName === 'ERROR-MESSAGES') {
      section.editElements.generateAttackDialog.errorMessages = new ErrorMessages();
    }
  }
}