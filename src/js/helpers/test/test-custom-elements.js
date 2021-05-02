import BlockTextArea from '../../elements/builtin/block-textarea.js';
import DynamicSelect from '../../elements/builtin/dynamic-select.js';
import EnableDisableElementsCheckbox from '../../elements/builtin/enable-disable-elements-checkbox.js';
import NumberInput from '../../elements/builtin/number-input.js';
import NumberSelect from '../../elements/builtin/number-select.js';
import PropertyDataList from '../../elements/builtin/property-datalist.js';
import SanitizedParagraph from '../../elements/builtin/sanitized-paragraph.js';
import TextInput from '../../elements/builtin/text-input.js';

import ErrorMessages from '../../elements/autonomous/error-messages.js';
import PropertyList from '../../elements/autonomous/lists/property-list.js';
import PropertyListItem from '../../elements/autonomous/lists/property-list-item.js';
import DisplayBlockList from '../../elements/autonomous/lists/display-block-list.js';
import DisplayBlock from '../../elements/autonomous/lists/display-block.js';
import EditableBlockList from '../../elements/autonomous/lists/editable-block-list.js';
import EditableBlock from '../../elements/autonomous/lists/editable-block.js';

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