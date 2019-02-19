import EnableDisableElementsCheckbox from '/src/js/elements/builtin/enable-disable-elements-checkbox.js';
import IntegerInput from '/src/js/elements/builtin/integer-input.js';
import TextInput from '/src/js/elements/builtin/text-input.js';
import PropertyDataList from '/src/js/elements/builtin/property-datalist';

export default function defineBuiltinCustomElements() {
  const builtinCustomElements = [];

  builtinCustomElements.push(PropertyDataList);
  builtinCustomElements.push(EnableDisableElementsCheckbox);
  builtinCustomElements.push(IntegerInput);
  builtinCustomElements.push(TextInput);

  for (const element of builtinCustomElements) {
    element.define();
  }
}