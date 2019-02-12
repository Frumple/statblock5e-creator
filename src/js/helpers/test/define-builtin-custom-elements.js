import EnableDisableElementsCheckbox from '/src/js/extensions/enable-disable-elements-checkbox.js';
import IntegerInput from '/src/js/extensions/integer-input.js';
import TextInput from '/src/js/extensions/text-input.js';
import AttributeDataList from '/src/js/extensions/attribute-datalist';

export default function defineBuiltinCustomElements() {
  const builtinCustomElements = [];

  builtinCustomElements.push(AttributeDataList);
  builtinCustomElements.push(EnableDisableElementsCheckbox);
  builtinCustomElements.push(IntegerInput);
  builtinCustomElements.push(TextInput);

  for (const element of builtinCustomElements) {
    element.define();
  }
}