import EnableDisableElementsCheckbox from '/src/js/elements/builtin/enable-disable-elements-checkbox.js';
import IntegerInput from '/src/js/elements/builtin/integer-input.js';
import TextInput from '/src/js/elements/builtin/text-input.js';
import PropertyDataList from '/src/js/elements/builtin/property-datalist.js';

import ErrorMessages from '/src/js/elements/autonomous/error-messages.js';

export default async function defineCustomElements() {
  const customElements = [];

  customElements.push(PropertyDataList);
  customElements.push(EnableDisableElementsCheckbox);
  customElements.push(IntegerInput);
  customElements.push(TextInput);

  customElements.push(ErrorMessages);

  for (const element of customElements) {
    await element.define();
  }
}