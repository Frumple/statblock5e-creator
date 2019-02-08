global.document.clear = function() {
  document.body.innerHTML = '';
}

global.inputValue = function(element, value) {
  element.value = value;
  element.dispatchEvent(new Event('input'));
}