import CustomBuiltinElementMixins from '/src/js/helpers/custom-builtin-element-mixins.js';
import { traverseElements } from '/src/js/helpers/element-helpers.js';

import BlockTextArea from '/src/js/elements/builtin/block-textarea.js';
import DynamicSelect from '/src/js/elements/builtin/dynamic-select.js';
import EnableDisableElementsCheckbox from '/src/js/elements/builtin/enable-disable-elements-checkbox.js';
import NumberInput from '/src/js/elements/builtin/number-input.js';
import NumberSelect from '/src/js/elements/builtin/number-select.js';
import PropertyDataList from '/src/js/elements/builtin/property-datalist.js';
import SanitizedParagraph from '/src/js/elements/builtin/sanitized-paragraph.js';
import TextInput from '/src/js/elements/builtin/text-input.js';

import ErrorMessages from '/src/js/elements/autonomous/error-messages.js';
import PropertyList from '/src/js/elements/autonomous/lists/property-list.js';
import PropertyListItem from '/src/js/elements/autonomous/lists/property-list-item.js';
import DisplayBlockList from '/src/js/elements/autonomous/lists/display-block-list.js';
import DisplayBlock from '/src/js/elements/autonomous/lists/display-block.js';
import EditableBlockList from '/src/js/elements/autonomous/lists/editable-block-list.js';
import EditableBlock from '/src/js/elements/autonomous/lists/editable-block.js';
import GenerateAttackDialog from '../../elements/autonomous/dialogs/generate-attack-dialog.js';

export async function define() {
  const customElements = [
    BlockTextArea,
    DynamicSelect,
    EnableDisableElementsCheckbox,
    NumberInput,
    NumberSelect,
    PropertyDataList,
    SanitizedParagraph,
    TextInput,

    ErrorMessages,
    PropertyList,
    PropertyListItem,
    DisplayBlockList,
    DisplayBlock,
    EditableBlockList,
    EditableBlock
  ];

  for (const element of customElements) {
    await element.define();
  }
}

export function initializeSection(section) {
  replaceWithFakes(section);

  initializeContainer(section.showElements);
  initializeContainer(section.editElements);
}

export function initializeContainer(container, maxTraversalDepth = 5) {
  traverseElements(container, maxTraversalDepth, (element) => {
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

  if (section.showElements.displayBlockList && section.showElements.displayBlockList.tagName === 'DISPLAY-BLOCK-LIST') {
    section.showElements.displayBlockList = new DisplayBlockList();
  }

  if (section.editElements.editableBlockList && section.editElements.editableBlockList.tagName === 'EDITABLE-BLOCK-LIST') {
    section.editElements.editableBlockList = new EditableBlockList();
  }

  if (section.editElements.generateAttackDialog && section.editElements.generateAttackDialog.tagName === 'GENERATE-ATTACK-DIALOG') {
    section.editElements.generateAttackDialog = new GenerateAttackDialog(section);

    if (section.editElements.generateAttackDialog.errorMessages && section.editElements.generateAttackDialog.errorMessages.tagName === 'ERROR-MESSAGES') {
      section.editElements.generateAttackDialog.errorMessages = new ErrorMessages();
    }
  }
}