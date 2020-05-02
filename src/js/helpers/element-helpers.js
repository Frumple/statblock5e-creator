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

export function addOptionsToSelectElement(selectElement, optionValues) {
  for (const optionValue of optionValues) {
    const option = new Option(optionValue, optionValue);
    selectElement.add(option);
  }
}

export function addOptionsToDataListElement(dataListElement, optionValues) {
  for (const optionValue of optionValues) {
    const option = new Option('', optionValue);
    dataListElement.appendChild(option);
  }
}

export function addOptionsWithLabelsToDataListElement(dataListElement, objects, valuePropertyName, labelPropertyName) {
  for (const obj of objects) {
    const option = new Option(obj[labelPropertyName], obj[valuePropertyName]);
    dataListElement.appendChild(option);
  }
}

export function getCheckedRadioButton(parentElement, radioGroupName) {
  return parentElement.shadowRoot.querySelector(`input[name="${radioGroupName}"]:checked`);
}

// Traverses the properties of an object and its descendant objects for HTMLElements
// maxDepth is how many levels deep to search for elements
// Example: maxDepth = 3 will search the object, its children, and its grandchildren only
export function traverseElements(obj, maxDepth, callback) {
  if (obj !== null) {
    for (const propertyName of Object.keys(obj)) {
      const property = obj[propertyName];

      if (property instanceof HTMLElement) {
        callback(property);
      } else if (maxDepth > 1) {
        traverseElements(property, maxDepth - 1, callback);
      }
    }
  }
}