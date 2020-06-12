export default function toBeSelected(element) {
  const pass = isTextSelected(element);
  let message = null;

  if (pass) {
    message = 'expected element not to be selected, but was selected';
  } else {
    message = 'expected element to be selected';
  }

  return {
    pass: pass,
    message: () => message
  };
}

function isTextSelected(element) {
  if (typeof element.selectionStart === 'number') {
    return element.selectionStart === 0 && element.selectionEnd === element.value.length;
  } else if (typeof document.selection !== 'undefined') {
    return document.selection.createRange().text === element.value;
  } else {
    throw 'Unable to determine the selected text for the element using JSDOM.';
  }
}