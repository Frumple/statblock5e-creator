import CustomBuiltinElementMixins from '../../helpers/custom-builtin-element-mixins.js';
import { traverseElements } from '../../helpers/element-helpers.js';

import BlockTextArea from '../../elements/builtin/block-textarea.js';
import DynamicSelect from '../../elements/builtin/dynamic-select.js';
import EnableDisableElementsCheckbox from '../../elements/builtin/enable-disable-elements-checkbox.js';
import NumberInput from '../../elements/builtin/number-input.js';
import NumberSelect from '../../elements/builtin/number-select.js';
import PropertyDataList from '../../elements/builtin/property-datalist.js';
import SanitizedParagraph from '../../elements/builtin/sanitized-paragraph.js';
import TextInput from '../../elements/builtin/text-input.js';

import ErrorMessages from '../../elements/autonomous/error-messages.js';
import SpellCategoryBox from '../../elements/autonomous/spell-category-box.js';
import PropertyList from '../../elements/autonomous/lists/property-list.js';
import PropertyListItem from '../../elements/autonomous/lists/property-list-item.js';
import DisplayBlockList from '../../elements/autonomous/lists/display-block-list.js';
import DisplayBlock from '../../elements/autonomous/lists/display-block.js';
import EditableBlockList from '../../elements/autonomous/lists/editable-block-list.js';
import EditableBlock from '../../elements/autonomous/lists/editable-block.js';
import GenerateAttackDialog from '../../elements/autonomous/dialogs/generate-attack-dialog.js';
import GenerateSpellcastingDialog from '../../elements/autonomous/dialogs/generate-spellcasting-dialog.js';

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

// TODO: Eliminate use of fakes if possible, or find a way to generalize these instantiations.
function replaceWithFakes(section) {
  if (section.errorMessages &&
      section.errorMessages.tagName === 'ERROR-MESSAGES') {
    section.errorMessages = new ErrorMessages();
  }

  if (section.editElements.propertyList &&
      section.editElements.propertyList.tagName === 'PROPERTY-LIST') {
    section.editElements.propertyList = new PropertyList(section);
  }

  if (section.showElements.displayBlockList &&
      section.showElements.displayBlockList.tagName === 'DISPLAY-BLOCK-LIST') {
    section.showElements.displayBlockList = new DisplayBlockList();
  }

  if (section.editElements.editableBlockList &&
      section.editElements.editableBlockList.tagName === 'EDITABLE-BLOCK-LIST') {
    section.editElements.editableBlockList = new EditableBlockList();
  }

  if (section.editElements.generateAttackDialog &&
      section.editElements.generateAttackDialog.tagName === 'GENERATE-ATTACK-DIALOG') {
    section.editElements.generateAttackDialog = new GenerateAttackDialog(section);

    if (section.editElements.generateAttackDialog.errorMessages &&
        section.editElements.generateAttackDialog.errorMessages.tagName === 'ERROR-MESSAGES') {
      section.editElements.generateAttackDialog.errorMessages = new ErrorMessages();
    }
  }

  if (section.editElements.generateSpellcastingDialog &&
      section.editElements.generateSpellcastingDialog.tagName === 'GENERATE-SPELLCASTING-DIALOG') {
    section.editElements.generateSpellcastingDialog = new GenerateSpellcastingDialog(section);

    if (section.editElements.generateSpellcastingDialog.errorMessages &&
        section.editElements.generateSpellcastingDialog.errorMessages.tagName === 'ERROR-MESSAGES') {
      section.editElements.generateSpellcastingDialog.errorMessages = new ErrorMessages();
    }

    if (section.editElements.generateSpellcastingDialog.spellCategoryBoxes) {
      for (let i = 0; i <= 9; i++) {
        if (section.editElements.generateSpellcastingDialog.spellCategoryBoxes[i] &&
            section.editElements.generateSpellcastingDialog.spellCategoryBoxes[i].tagName === 'SPELL-CATEGORY-BOX') {
          section.editElements.generateSpellcastingDialog.spellCategoryBoxes[i] = new SpellCategoryBox();
        }

        const spellCategoryBox = section.editElements.generateSpellcastingDialog.spellCategoryBoxes[i];

        if (spellCategoryBox.propertyList &&
            spellCategoryBox.propertyList.tagName === 'PROPERTY-LIST') {
          spellCategoryBox.propertyList = new PropertyList(spellCategoryBox);
        }
      }
    }
  }
}