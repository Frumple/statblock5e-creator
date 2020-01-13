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