export function focusAndSelectElement(element) {
  let tagName = element.tagName;
  let type = element.getAttribute('type');

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
  let tagName = element.tagName;
  let type = element.getAttribute('type');

  if (tagName === 'INPUT' && type === 'checkbox') {
    element.checked = value;
  } else {
    element.value = value;
  }

  element.dispatchEvent(new Event('input'));
}

// maxDepth determines how many levels deep to search for element objects
// Example: maxDepth = 3 will search the parent, its children, and its grandchildren only
export function traverseElements(parent, maxDepth, callback) {
  for (const propertyName in parent) {
    let child = parent[propertyName];

    if (child instanceof HTMLElement) {
      callback(child);
    } else if (maxDepth > 1) {
      traverseElements(child, maxDepth - 1, callback);
    }
  }
}