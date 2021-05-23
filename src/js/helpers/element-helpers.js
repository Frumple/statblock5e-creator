export function focusAndSelectElement(element) {
  const tagName = element.tagName;
  const type = element.getAttribute('type');

  if (isTextOrNumberInputElement(tagName, type) ||
      isTextAreaElement(tagName)) {
    element.focus();
    element.select();
  } else {
    element.focus();
  }
}

function isTextOrNumberInputElement(tagName, type) {
  return tagName === 'INPUT' && (type === 'text' || type === 'number');
}

function isTextAreaElement(tagName) {
  return tagName === 'TEXTAREA';
}

export function inputValueAndTriggerEvent(element, value) {
  const tagName = element.tagName;
  const type = element.getAttribute('type');

  if (tagName === 'INPUT' && type === 'checkbox') {
    element.checked = value;
  } else {
    element.value = value;
  }

  element.dispatchEvent(new Event('input'));
}

export function addOptionsToElement(element, objects, textPropertyName = 'text', valuePropertyName = 'value') {
  for (const obj of objects) {
    const option = new Option(obj[textPropertyName], obj[valuePropertyName]);
    element.appendChild(option);
  }
}

export function addTextOnlyOptionsToElement(element, optionTexts) {
  addOptionsToElement(element, optionTexts.map(text => ({ text: text }) ));
}

export function addValueOnlyOptionsToElement(element, optionValues) {
  addOptionsToElement(element, optionValues.map(value => ({ value: value }) ));
}

export function removeAllChildElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function getCheckedRadioButton(parentElement, radioGroupName) {
  return parentElement.shadowRoot.querySelector(`input[name="${radioGroupName}"]:checked`);
}