export default function toHaveElementsEnabledOrDisabledBasedOnCheckboxState(
  section,
  checkbox,
  namesOfElementsEnabledWhenChecked,
  namesOfElementsDisabledWhenChecked) {
  if (this.isNot) {
    throw new Error('The matcher toHaveElementsEnabledOrDisabledBasedOnCheckboxState cannot be used with the not modifier.');
  }

  let messages = [];

  for (const elementName of namesOfElementsEnabledWhenChecked) {
    if (section.editElements[elementName].hasAttribute('disabled') === checkbox.checked) {
      messages.push(`expected ${elementName} to be ${getEnabledDisabledText(checkbox.checked)}, but was ${getEnabledDisabledText(! checkbox.checked)}`);
    }
  }

  for (const elementName of namesOfElementsDisabledWhenChecked) {
    if (section.editElements[elementName].hasAttribute('disabled') !== checkbox.checked) {
      messages.push(`expected ${elementName} to be ${getEnabledDisabledText(! checkbox.checked)}, but was ${getEnabledDisabledText(checkbox.checked)}`);
    }
  }

  return {
    message: () => messages.join('\n'),
    pass: (messages.length === 0)
  };
}

function getEnabledDisabledText(boolean) {
  return (boolean ? 'enabled' : 'disabled');
}