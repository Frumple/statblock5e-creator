export function focusAndSelectElement(element) {
  let tagName = element.tagName;
  let type = element.getAttribute('type');

  if (tagName === 'INPUT' && (type === 'text' || type === 'number')) {
    element.focus();
    element.select();
  } else {
    element.focus();
  }
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