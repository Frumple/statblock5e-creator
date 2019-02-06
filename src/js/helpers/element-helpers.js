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