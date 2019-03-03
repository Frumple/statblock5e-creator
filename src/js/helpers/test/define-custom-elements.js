import CustomTextArea from '/src/js/elements/builtin/custom-textarea.js';
import EnableDisableElementsCheckbox from '/src/js/elements/builtin/enable-disable-elements-checkbox.js';
import IntegerInput from '/src/js/elements/builtin/integer-input.js';
import PropertyDataList from '/src/js/elements/builtin/property-datalist.js';
import TextInput from '/src/js/elements/builtin/text-input.js';

import ErrorMessages from '/src/js/elements/autonomous/error-messages.js';
import PropertyList from '/src/js/elements/autonomous/lists/property-list.js';
import PropertyListItem from '/src/js/elements/autonomous/lists/property-list-item.js';
import DisplayBlockList from '/src/js/elements/autonomous/lists/display-block-list.js';
import DisplayBlockListItem from '/src/js/elements/autonomous/lists/display-block-list-item.js';
import EditableBlockList from '/src/js/elements/autonomous/lists/editable-block-list.js';
import EditableBlockListItem from '/src/js/elements/autonomous/lists/editable-block-list-item.js';

export default async function defineCustomElements() {
  const customElements = [];

  customElements.push(CustomTextArea);
  customElements.push(EnableDisableElementsCheckbox);
  customElements.push(IntegerInput);
  customElements.push(PropertyDataList);
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